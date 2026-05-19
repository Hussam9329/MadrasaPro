import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckSquare,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  Landmark,
  Plus,
  Receipt,
  School,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { NavigationIcon } from "@/lib/navigation";

type PageHeaderProps = {
  title: string;
  description?: string;
  icon?: NavigationIcon;
  badge?: string;
  actionLabel?: string;
  actionHref?: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
};

const iconMap: Record<NavigationIcon, React.ElementType> = {
  dashboard: School,
  book: BookOpen,
  classes: Landmark,
  teachers: GraduationCap,
  students: Users,
  schedule: CalendarDays,
  attendance: CheckSquare,
  grades: ClipboardList,
  fees: Receipt,
  payments: CreditCard,
  reports: FileText,
  settings: Settings,
  permissions: ShieldCheck,
};

export function PageHeader({
  title,
  description,
  icon = "dashboard",
  badge,
  actionLabel,
  actionHref,
  backHref,
  backLabel = "رجوع",
  children,
}: PageHeaderProps) {
  const Icon = iconMap[icon];

  return (
    <section className="app-card overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.10),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(20,184,166,0.08),transparent_28%),radial-gradient(circle_at_35%_105%,rgba(217,119,6,0.10),transparent_32%)]" />

      <div className="flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-[26px] bg-gradient-to-br from-blue-600 via-indigo-500 to-amber-400 text-white shadow-xl shadow-blue-500/20 sm:flex">
            <Icon size={28} />
          </div>

          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {backHref ? (
                <Link
                  href={backHref}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--app-border)] bg-white/80 px-3 py-1.5 text-xs font-black text-[var(--app-text-muted)] shadow-sm backdrop-blur-xl transition hover:border-blue-200 hover:text-[var(--primary)] hover:shadow-blue-100/50"
                >
                  <ArrowRight size={14} />
                  {backLabel}
                </Link>
              ) : null}

              {badge ? (
                <span className="badge badge-info">{badge}</span>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <h2 className="app-title">{title}</h2>
              <Sparkles className="hidden text-blue-500 sm:block" size={19} />
            </div>

            {description ? (
              <p className="app-subtitle mt-2 max-w-3xl">{description}</p>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          {children}

          {actionLabel && actionHref ? (
            <Link href={actionHref} className="btn btn-primary">
              <Plus size={18} />
              {actionLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type SimplePageHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function SimplePageHeader({
  title,
  description,
  action,
}: SimplePageHeaderProps) {
  return (
    <div className="app-card flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-[var(--app-text)]">
          {title}
        </h2>

        {description ? (
          <p className="mt-2 text-sm leading-7 text-[var(--app-text-muted)]">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
