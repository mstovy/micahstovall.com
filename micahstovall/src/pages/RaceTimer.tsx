import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as XLSX from 'xlsx' // <-- IMPORT SHEETJS
import '/src/styles/racetimer.css'

type RowData = {
  id: number
  name: string
  col6: string
  col7: string
  col8: string
  col9: string
  col10: string
}

const columnHelper = createColumnHelper<RowData>()

// Helper function to format milliseconds to MM:SS:cs
const formatTime = (milliseconds: number): string => {
  const totalCentiseconds = Math.floor(milliseconds / 10)
  const minutes = Math.floor(totalCentiseconds / 6000)
  const seconds = Math.floor((totalCentiseconds % 6000) / 100)
  const centis = totalCentiseconds % 100
  return `${String(minutes).padStart(2, '0')}:
    ${String(seconds).padStart(2, '0')}:
    ${String(centis).padStart(2, '0')}`.replace(/\s+/g, '')
}

// Parse a time string like MM:SS:cs to total milliseconds
const parseTimeToMs = (time?: string): number => {
  if (!time) return 0
  const parts = time.split(':').map((p) => Number(p))
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return 0
  const [m, s, cs] = parts
  return m * 60000 + s * 1000 + cs * 10
}

function InlineEditPopup({
  initialValue,
  onCancel,
  onSave,
}: {
  initialValue: string
  onCancel: () => void
  onSave: (updatedValue: string) => void
}) {
  const [editedValue, setEditedValue] = useState(initialValue)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Edit Rider Name</h2>
        <input
          type="text"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          className="w-full rounded border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          autoFocus
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(editedValue)}
            className="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

// --- ISOLATED STOPWATCH COMPONENT ---
function TimerAndControlsCell({
  onSaveTime,
}: {
  onSaveTime: (formattedTime: string) => void
}) {
  const [milliseconds, setMilliseconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (isRunning) return
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setMilliseconds((prev) => prev + 10)
    }, 10)
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }

  const handleSave = () => {
    const timeToSend = formatTime(milliseconds)
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
    setMilliseconds(0)

    onSaveTime(timeToSend)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={startTimer}
        disabled={isRunning}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Start
      </button>
      <button
        onClick={stopTimer}
        disabled={!isRunning}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Stop
      </button>
      <span className="font-mono font-semibold text-lg min-w-[85px] text-center tabular-nums">
        {formatTime(milliseconds)}
      </span>
      <button
        onClick={handleSave}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Save
      </button>
    </div>
  )
}

// Generate 12 rows of sample data
const initialData: RowData[] = Array.from({ length: 12 }, (_, rowIndex) => ({
  id: rowIndex,
  name: `Rider ${rowIndex + 1}`,
  col6: '',
  col7: '',
  col8: '',
  col9: '',
  col10: '',
}))

function App() {
  const [tableData, setTableData] = useState<RowData[]>(initialData)
  const [activeEditRow, setActiveEditRow] = useState<{ rowId: number; value: string } | null>(null)

  const openNameEditor = useCallback((rowId: number, currentValue: string) => {
    setActiveEditRow({ rowId, value: currentValue })
  }, [])

  const closeNameEditor = useCallback(() => {
    setActiveEditRow(null)
  }, [])

  const handleSaveName = useCallback((rowId: number, newName: string) => {
    setTableData((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, name: newName } : row))
    )
    setActiveEditRow(null)
  }, [])

  const handleSaveTimerData = useCallback((rowId: number, formattedTime: string) => {
    setTableData((prev) => {
      return prev.map((row) => {
        if (row.id !== rowId) return row

        const saveFields = ['col6', 'col7', 'col8', 'col9'] as const
        type SaveField = typeof saveFields[number]
        const updated = { ...row }
        const target = saveFields.find((f) => !updated[f] || updated[f] === '') as SaveField | undefined

        if (target) {
          updated[target] = formattedTime
        } else {
          alert('All save slots (Columns 6–9) are full for this row.')
        }

        return updated
      })
    })
  }, [])

  // --- NEW: Handle Excel Export ---
  const handleExportExcel = useCallback(() => {
    // 1. Format the raw tableData into a clean array of objects for Excel
    const exportData = tableData.map((row) => {
      // Re-calculate the overall time just like the table does
      const totalMs = [row.col6, row.col7, row.col8, row.col9].reduce(
        (acc, t) => acc + parseTimeToMs(t),
        0
      )
      const overallTime = totalMs > 0 ? formatTime(totalMs) : '--:--:--'

      return {
        'Rider Name': row.name,
        'Stage 1': row.col6 || '--:--:--',
        'Stage 2': row.col7 || '--:--:--',
        'Stage 3': row.col8 || '--:--:--',
        'Stage 4': row.col9 || '--:--:--',
        'Overall': overallTime,
      }
    })

    // 2. Create an Excel worksheet from the data
    const worksheet = XLSX.utils.json_to_sheet(exportData)

    // 3. Create an Excel workbook and append the worksheet
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Race Results')

    // 4. Trigger the download to the user's computer
    XLSX.writeFile(workbook, 'Race_Results.xlsx')
  }, [tableData])

  // --- CRITICAL FIX: Memoize the columns ---
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Rider Name',
        cell: (info) => (
          <input
            type="text"
            value={info.getValue()}
            readOnly
            onClick={() => openNameEditor(info.row.original.id, info.getValue() as string)}
            className="w-full cursor-pointer rounded border border-gray-300 bg-white px-2 py-1 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ),
      }),
      columnHelper.display({
        id: 'stopwatch-controls',
        header: 'Stopwatch Controls (Start / Stop / Time / Save)',
        cell: (info) => (
          <TimerAndControlsCell 
            onSaveTime={(formattedTime) => handleSaveTimerData(info.row.original.id, formattedTime)} 
          />
        ),
      }),
      columnHelper.display({
        header: 'Stage 1',
        cell: (info) => (
          <span className="font-mono">
            {info.row.original.col6 || '--:--:--'}
          </span>
        ),
      }),
      columnHelper.accessor('col7', {
        header: 'Stage 2',
        cell: (info) => (
          <span className="font-mono">
            {info.row.original.col7 || '--:--:--'}
          </span>
        ),
      }),
      columnHelper.accessor('col8', {
        header: 'Stage 3',
        cell: (info) => (
          <span className="font-mono">
            {info.row.original.col8 || '--:--:--'}
          </span>
        ),
      }),
      columnHelper.accessor('col9', {
        header: 'Stage 4',
        cell: (info) => (
          <span className="font-mono">
            {info.row.original.col9 || '--:--:--'}
          </span>
        ),
      }),
      columnHelper.display({
        header: 'Overall',
        cell: (info) => {
          const r = info.row.original
          const totalMs = [r.col6, r.col7, r.col8, r.col9].reduce(
            (acc, t) => acc + parseTimeToMs(t),
            0
          )

          return (
            <span className="font-mono">
              {totalMs > 0 ? formatTime(totalMs) : '--:--:--'}
            </span>
          )
        },
      }),
    ],
    [handleSaveTimerData, openNameEditor] 
  )

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
  })

  return (
    <div className="p-8">
      {/* Added flexbox to position title and export button inline */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Race Timer</h1>
        <button
          onClick={handleExportExcel}
          className="rounded bg-green-600 px-4 py-2 font-semibold text-white shadow hover:bg-green-700 transition-colors"
        >
          Export to Excel
        </button>
      </div>
      
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-semibold border-r last:border-r-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border-r last:border-r-0"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {activeEditRow ? (
        <InlineEditPopup
          initialValue={activeEditRow.value}
          onCancel={closeNameEditor}
          onSave={(updatedValue) => handleSaveName(activeEditRow.rowId, updatedValue)}
        />
      ) : null}
    </div>
  )
}

export default App