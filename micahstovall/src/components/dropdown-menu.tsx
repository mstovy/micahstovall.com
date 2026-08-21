import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

interface DropdownMenuContextValue {
  open: boolean
  toggle: () => void
  close: () => void
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenuContext() {
  const context = useContext(DropdownMenuContext)
  if (!context) {
    throw new Error('DropdownMenu components must be wrapped in DropdownMenu')
  }
  return context
}

interface SubMenuContextValue {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const SubMenuContext = createContext<SubMenuContextValue | null>(null);

function useSubMenuContext() {
  const context = useContext(SubMenuContext);
  if (!context) {
    throw new Error("SubMenu components must be inside DropdownMenuSub");
  }
  return context;
}

interface DropdownMenuProps {
  children: ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (open && ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <DropdownMenuContext.Provider value={{ open, toggle, close }}>
      <div ref={ref} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

/* -------------------- TRIGGER -------------------- */

interface DropdownMenuTriggerProps {
  children: ReactNode;
}

export function DropdownMenuTrigger({
  children,
}: DropdownMenuTriggerProps) {
  const { open, toggle } = useDropdownMenuContext();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={open}
      className="inline-flex items-center gap-2 rounded-xl border border-violet-300/30 bg-[#2a163c] px-4 py-2 text-sm font-medium text-violet-50 shadow-sm transition hover:bg-[#341b4a] focus:outline-none focus:ring-2 focus:ring-yellow-300/60"
    >
      {children}
      <span className="text-yellow-200">▾</span>
    </button>
  );
}

/* -------------------- CONTENT -------------------- */

interface DropdownMenuContentProps {
  children: ReactNode;
}

export function DropdownMenuContent({
  children,
}: DropdownMenuContentProps) {
  const { open } = useDropdownMenuContext();

  if (!open) return null;

  return (
    <div className="absolute right-0 z-50 mt-2 w-56 overflow-visible rounded-3xl border border-violet-300/20 bg-[#1d102a] shadow-lg ring-1 ring-yellow-300/10">
      <div className="flex flex-col p-2">{children}</div>
    </div>
  );
}

/* -------------------- ITEM -------------------- */

interface DropdownMenuItemProps {
  children: ReactNode;
  onSelect?: () => void;
}

export function DropdownMenuItem({
  children,
  onSelect,
}: DropdownMenuItemProps) {
  const { close } = useDropdownMenuContext();

  const handleSelect = () => {
    onSelect?.();
    close();
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="w-full rounded-xl px-3 py-2 text-left text-sm text-violet-50 transition hover:bg-violet-500/15 hover:text-yellow-100"
    >
      {children}
    </button>
  );
}

/* -------------------- SUB MENU -------------------- */

interface DropdownMenuSubProps {
  children: ReactNode;
}

export function DropdownMenuSub({ children }: DropdownMenuSubProps) {
  const [open, setOpen] = useState(false);

  return (
    <SubMenuContext.Provider value={{ open, setOpen }}>
      <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>
    </SubMenuContext.Provider>
  );
}

/* -------------------- SUB TRIGGER -------------------- */

interface DropdownMenuSubTriggerProps {
  children: ReactNode;
}

export function DropdownMenuSubTrigger({
  children,
}: DropdownMenuSubTriggerProps) {
  const { open, setOpen } = useSubMenuContext();

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-violet-50 transition hover:bg-violet-500/15 hover:text-yellow-100"
    >
      {children}
      <span className="text-yellow-200">›</span>
    </button>
  );
}

/* -------------------- SUB CONTENT -------------------- */

interface DropdownMenuSubContentProps {
  children: ReactNode;
}

export function DropdownMenuSubContent({
  children,
}: DropdownMenuSubContentProps) {
  const { open } = useSubMenuContext();

  if (!open) return null;

  return (
    <div className="absolute left-full top-0 ml-0 w-56 rounded-2xl border border-violet-300/20 bg-[#1d102a] p-2 shadow-lg z-50">
      {children}
    </div>
  );
}