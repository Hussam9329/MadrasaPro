"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckSquare,
  ClipboardList,
  GraduationCap,
  Home,
  Landmark,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Receipt,
  School,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  navigationGroups,
  orderedNavigationItems,
  type NavigationGroup,
  type NavigationIcon,
} from "@/lib/navigation";
import { useTheme } from "@/components/layout/theme-provider";

type AppShellProps = {
  children: React.ReactNode;
};

const iconMap: Record<NavigationIcon, React.ElementType> = {
  dashboard: LayoutDashboard,
  book: BookOpen,
  classes: Landmark,
  teachers: GraduationCap,
  students: Users,
  schedule: CalendarDays,
  attendance: CheckSquare,
  grades: ClipboardList,
  fees: Receipt,
  payments: Receipt,
  reports: BarChart3,
  settings: ShieldCheck,
  permissions: ShieldCheck,
};

const groupOrder: NavigationGroup[] = [
  "overview",
  "foundation",
  "people",
  "operations",
  "results",
  "system",
];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const currentPage = useMemo(() => {
    return (
      orderedNavigationItems.find((item) => {
        if (item.href === "/") {
          return pathname === "/";
        }

        return pathname.startsWith(item.href);
      }) ?? orderedNavigationItems[0]
    );
  }, [pathname]);

  function closeMobileSidebar() {
    setIsMobileSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-transparent">
      <MobileSidebarBackdrop
        isOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
      />

      <aside
        className={[
          "fixed right-0 top-0 z-50 h-screen w-[286px] border-l border-[var(--app-border)] text-[var(--color-sidebar-text)] shadow-[var(--shadow-sidebar)] transition-transform duration-300",
          "bg-[var(--color-sidebar-bg)]/88 backdrop-blur-2xl",
          isMobileSidebarOpen ? "translate-x-0" : "translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-blue-100/70 via-cyan-50/30 to-transparent dark:from-blue-500/10 dark:via-cyan-500/5" />

        <SidebarContent
          pathname={pathname}
          onNavigate={closeMobileSidebar}
        />
      </aside>

      <div className="min-h-screen lg:pr-[286px]">
        <header className="sticky top-0 z-40 border-b border-[var(--app-border)]/80 glass">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-blue-200/70 to-transparent dark:via-blue-400/20" />

          <div className="flex min-h-[82px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="btn btn-secondary h-11 w-11 p-0 lg:hidden"
                aria-label="فتح القائمة"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <Menu size={20} />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-amber-400 text-white shadow-lg shadow-blue-500/20">
                    <Home size={18} />
                  </span>
                  <h1 className="truncate text-lg font-black tracking-tight text-[var(--app-text)] sm:text-xl">
                    {currentPage.title}
                  </h1>
                </div>

                <p className="mt-1 hidden max-w-[720px] truncate text-sm leading-6 text-[var(--app-text-muted)] md:block">
                  {currentPage.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TopbarSearch />

              <ThemeToggle />

              <a
                href="/logout"
                className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-[var(--app-border)] bg-white/80 text-[var(--app-text-muted)] shadow-sm transition hover:border-red-300 hover:bg-white hover:text-red-500 hover:shadow-lg hover:shadow-red-200/30 md:inline-flex dark:bg-[var(--app-card)] dark:hover:border-red-500/50 dark:hover:shadow-red-500/20"
                aria-label="تسجيل الخروج"
                title="تسجيل الخروج"
              >
                <LogOut size={18} />
              </a>

              <div className="hidden items-center gap-3 rounded-[22px] border border-[var(--app-border)] bg-white/75 px-3 py-2 shadow-sm backdrop-blur-xl lg:flex dark:bg-[var(--app-card)]/80">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-amber-400 text-white shadow-lg shadow-blue-500/20">
                  <School size={18} />
                </div>

                <div className="leading-none">
                  <p className="text-sm font-black text-[var(--app-text)]">
                    مارينا
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[var(--app-text-muted)]">
                    ثانوية مارينا الأهلية
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="animate-soft-in px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

type SidebarContentProps = {
  pathname: string;
  onNavigate: () => void;
};

function SidebarContent({ pathname, onNavigate }: SidebarContentProps) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="relative border-b border-[var(--app-border)]/80 px-5 py-5">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-[24px] outline-none"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-[22px] bg-gradient-to-br from-blue-600 via-indigo-500 to-amber-400 text-white shadow-xl shadow-blue-500/20">
            <School size={24} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xl font-black tracking-tight text-[var(--color-sidebar-text)]">
              مارينا
            </p>
            <p className="mt-1 truncate text-xs font-bold text-[var(--color-sidebar-muted)]">
              ثانوية مارينا الأهلية
            </p>
          </div>
        </Link>
      </div>

      <nav className="no-scrollbar flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-5">
          {groupOrder.map((group) => {
            const items = orderedNavigationItems.filter(
              (item) => item.group === group,
            );

            if (items.length === 0) {
              return null;
            }

            return (
              <div key={group}>
                <div className="mb-2 px-3">
                  <p className="text-[11px] font-black uppercase tracking-wide text-[var(--color-sidebar-muted)]">
                    {navigationGroups[group].title}
                  </p>
                </div>

                <div className="space-y-1.5">
                  {items.map((item) => {
                    const Icon = iconMap[item.icon];
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={[
                          "group flex items-center gap-3 rounded-[22px] px-3 py-3 text-sm font-extrabold transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-l from-blue-600 via-indigo-500 to-blue-500 text-white shadow-xl shadow-blue-500/20"
                            : "text-[var(--color-sidebar-text)] hover:bg-[var(--color-sidebar-bg-soft)] hover:text-[var(--color-primary)]",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all duration-200",
                            isActive
                              ? "bg-white/20 text-white shadow-sm"
                              : "bg-[var(--color-sidebar-bg-soft)] text-[var(--color-sidebar-muted)] group-hover:bg-white group-hover:text-[var(--color-primary)] group-hover:shadow-sm dark:group-hover:bg-[var(--app-card-soft)]",
                          ].join(" ")}
                        >
                          <Icon size={18} />
                        </span>

                        <span className="min-w-0 flex-1 truncate">
                          {item.title}
                        </span>

                        {item.isPrimary ? (
                          <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-black text-white">
                            رئيسية
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="relative border-t border-[var(--app-border)]/80 p-4">
        <div className="relative overflow-hidden rounded-[28px] border border-blue-100 bg-gradient-to-br from-white via-blue-50/60 to-amber-50/50 p-4 shadow-sm dark:border-blue-400/10 dark:from-[var(--app-card)] dark:via-blue-950/20 dark:to-amber-950/10">
          <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-blue-400/10 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl" />

          <div className="relative">
            <div className="mb-3 flex items-center gap-2 text-[var(--app-text)]">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm dark:bg-[var(--app-card-soft)]">
                <Sparkles size={16} />
              </span>
              <p className="text-sm font-black">تلميحة ذكية</p>
            </div>

            <p className="relative text-xs font-semibold leading-6 text-[var(--app-text-muted)]">
              اتبع الترتيب من الأعلى للأسفل: المواد، الصفوف، المدرسين، ثم الطلاب.
              هكذا يبقى النظام مرتبًا من أول يوم.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type GlobalSearchResult = {
  type: string;
  title: string;
  subtitle?: string;
  href: string;
};

function TopbarSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal });
        const payload = await response.json();
        setResults(payload.ok ? payload.data ?? [] : []);
        setOpen(true);
      } catch {
        if (!controller.signal.aborted) setResults([]);
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query]);

  return (
    <div className="relative hidden min-w-[420px] items-center gap-3 rounded-[24px] border border-blue-200/70 bg-white/82 px-3 py-2 shadow-sm shadow-blue-100/50 backdrop-blur-xl xl:flex dark:border-blue-400/15 dark:bg-[var(--app-card)]/82 dark:shadow-none">
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 dark:from-blue-500/10 dark:to-indigo-500/10">
        <Sparkles size={17} />
      </span>

      <input
        id="global-search"
        name="global-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        placeholder="ابحث عن طالب، صف، مدرس..."
        className="h-9 min-w-0 flex-1 border-0 bg-transparent text-sm font-bold text-[var(--app-text)] outline-none placeholder:text-[var(--app-text-soft)]"
        autoComplete="off"
      />

      <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-[var(--app-border)] bg-[var(--app-card-soft)] text-[var(--app-text-soft)]">
        <Search size={17} />
      </span>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-[24px] border border-[var(--app-border-soft)] bg-white shadow-2xl shadow-blue-950/10 dark:bg-[var(--app-card)]">
          {results.length === 0 ? (
            <div className="p-4 text-sm font-bold text-[var(--app-text-muted)]">لا توجد نتائج سريعة.</div>
          ) : (
            results.map((result, index) => (
              <Link
                key={`${result.href}-${index}`}
                href={result.href}
                className="block border-b border-[var(--app-border-soft)] px-4 py-3 text-sm transition last:border-0 hover:bg-blue-50 dark:hover:bg-blue-500/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-black text-[var(--app-text)]">{result.title}</span>
                  <span className="rounded-full bg-[var(--app-card-soft)] px-2 py-1 text-[10px] font-bold text-[var(--app-text-muted)]">{result.type}</span>
                </div>
                {result.subtitle ? <p className="mt-1 text-xs text-[var(--app-text-muted)]">{result.subtitle}</p> : null}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

type MobileSidebarBackdropProps = {
  isOpen: boolean;
  onClose: () => void;
};

function MobileSidebarBackdrop({
  isOpen,
  onClose,
}: MobileSidebarBackdropProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm lg:hidden">
      <button
        type="button"
        className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-xl dark:bg-slate-800 dark:text-slate-200"
        aria-label="إغلاق القائمة"
        onClick={onClose}
      >
        <X size={20} />
      </button>
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-[var(--app-border)] bg-white/80 text-[var(--app-text-muted)] shadow-sm transition hover:border-blue-300 hover:bg-white hover:text-[var(--color-primary)] hover:shadow-lg hover:shadow-blue-200/40 md:inline-flex dark:bg-[var(--app-card)] dark:hover:border-blue-700/50 dark:hover:shadow-blue-700/20"
      aria-label={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
      title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
      onClick={toggleTheme}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
