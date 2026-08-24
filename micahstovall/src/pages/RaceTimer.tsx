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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#120914]/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[1.5rem] border border-violet-300/15 bg-[#1c0d2a] p-6 shadow-[0_30px_100px_-40px_rgba(168,85,247,0.4)]">
        <h2 className="mb-4 text-lg font-semibold text-white">Edit Rider Name</h2>
        <input
          type="text"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          className="w-full rounded-xl border border-violet-300/20 bg-[#120914]/70 px-3 py-2 text-base text-white placeholder:text-violet-200/40 focus:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/40"
          autoFocus
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-violet-300/20 bg-[#2a163c] px-3 py-2 text-sm font-medium text-violet-50 hover:bg-[#341b4a]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(editedValue)}
            className="rounded-full bg-yellow-300 px-3 py-2 text-sm font-medium text-violet-950 hover:bg-yellow-200"
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
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={startTimer}
        disabled={isRunning}
        className="rounded-full bg-violet-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:bg-violet-300/40"
      >
        Start
      </button>
      <button
        onClick={stopTimer}
        disabled={!isRunning}
        className="rounded-full border border-violet-300/20 bg-[#2a163c] px-3 py-1.5 text-sm font-medium text-violet-50 transition hover:bg-[#341b4a] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Stop
      </button>
      <span className="min-w-[85px] text-center font-mono text-lg font-semibold tabular-nums text-yellow-100">
        {formatTime(milliseconds)}
      </span>
      <button
        onClick={handleSave}
        className="rounded-full bg-yellow-300 px-3 py-1.5 text-sm font-medium text-violet-950 transition hover:bg-yellow-200"
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
            className="w-full cursor-pointer rounded-xl border border-violet-300/20 bg-[#120914]/70 px-2 py-1 text-left text-violet-50 focus:outline-none focus:ring-2 focus:ring-yellow-300/50"
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.12),_transparent_32%),linear-gradient(135deg,_#14091f_0%,_#2b163b_52%,_#160d21_100%)] p-4 text-violet-50 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-violet-300/15 bg-[#1c0d2a]/80 p-6 shadow-[0_35px_120px_-30px_rgba(168,85,247,0.35)] sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-white">Race Timer</h1>
          <button
            onClick={handleExportExcel}
            className="rounded-full bg-yellow-300 px-4 py-2 font-semibold text-violet-950 shadow transition hover:bg-yellow-200"
          >
            Export to Excel
          </button>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-violet-300/15 bg-[#120914]/60 shadow-[0_20px_100px_-40px_rgba(168,85,247,0.35)]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-violet-300/10 bg-[#2a163c] text-left text-violet-50">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="border-r border-violet-300/10 px-4 py-3 text-left font-semibold last:border-r-0"
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
                  <tr key={row.id} className="border-b border-violet-300/10 hover:bg-[#2a163c]/40">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border-r border-violet-300/10 px-4 py-3 text-violet-50 last:border-r-0"
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
        </div>
        {activeEditRow ? (
          <InlineEditPopup
            initialValue={activeEditRow.value}
            onCancel={closeNameEditor}
            onSave={(updatedValue) => handleSaveName(activeEditRow.rowId, updatedValue)}
          />
        ) : null}
      </div>
    </div>
  )
}

export default App