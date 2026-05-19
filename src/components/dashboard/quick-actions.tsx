import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  Landmark,
  Receipt,
  Users,
} from "lucide-react";
import {
  primaryQuickActions,
  type NavigationIcon,
} from "@/lib/navigation";

const quickActionIcons: Partial<Record<NavigationIcon, React.ElementType>> = {
  book: BookOpen,
  classes: Landmark,
  teachers: GraduationCap,
  students: Users,
  attendance: CalendarCheck,
  grades: ClipboardList,
  fees: Receipt,
  reports: BarChart3,
};

export function QuickActions() {
  return (
    <div className="app-card p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-black tracking-tight text-[var(--app-text)]">
            الانتقال السريع
          </h3>

          <p className="mt-1 text-sm leading-6 text-[var(--app-text-muted)]">
            أهم الأعمال اليومية في مكان واحد حتى لا يضيع المستخدم بين الصفحات.
          </p>
        </div>

        <span className="badge badge-success w-fit">اختصارات</span>
      </div>

      <div className="quick-grid">
        {primaryQuickActions.map((action, index) => {
          const Icon = quickActionIcons[action.icon] ?? BookOpen;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group relative overflow-hidden rounded-[28px] border border-[var(--app-border-soft)] bg-white/76 p-4 shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_18px_45px_rgba(37,99,235,0.10),0_6px_16px_rgba(16,24,40,0.06)] dark:bg-[var(--app-card-soft)]/70 dark:hover:bg-[var(--app-card-soft)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-blue-400 via-indigo-400 to-amber-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-blue-400/10 blur-2xl transition group-hover:bg-blue-400/20" />

              <div className="relative mb-4 flex items-center justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 shadow-sm transition-all duration-200 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:via-indigo-500 group-hover:to-amber-400 group-hover:text-white group-hover:shadow-xl group-hover:shadow-blue-500/20">
                  <Icon size={22} />
                </div>

                <span className="rounded-full bg-[var(--app-card-soft)] px-2.5 py-1 text-[11px] font-black text-[var(--app-text-soft)] transition group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-500/10">
                  فتح
                </span>
              </div>

              <h4 className="relative font-black text-[var(--app-text)]">
                {action.title}
              </h4>

              <p className="relative mt-2 text-sm font-medium leading-7 text-[var(--app-text-muted)]">
                {action.hint}
              </p>

              {index === 0 ? (
                <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-500/10">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-l from-blue-500 to-indigo-500" />
                </div>
              ) : null}
            </Link>
          );
        })}
      </div>

      <div className="mt-5 rounded-[28px] border border-blue-100 bg-gradient-to-l from-white via-blue-50/80 to-amber-50/70 p-4 shadow-sm dark:border-blue-400/10 dark:from-[var(--app-card-soft)] dark:via-blue-950/20 dark:to-amber-950/10">
        <p className="text-sm font-black text-blue-800 dark:text-blue-200">
          نصيحة لتجربة أفضل
        </p>

        <p className="mt-2 text-sm font-medium leading-7 text-blue-700 dark:text-blue-200/80">
          استخدم الاختصارات حسب الترتيب: مادة، صف، مدرس، طالب. بعدها يصبح
          تسجيل الحضور والدرجات أسهل بكثير.
        </p>
      </div>
    </div>
  );
}
