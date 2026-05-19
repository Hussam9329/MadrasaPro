import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "تسجيل الدخول",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--app-bg)] p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/20" />
        <div className="absolute -bottom-36 -right-32 h-[30rem] w-[30rem] rounded-full bg-amber-200/35 blur-3xl dark:bg-amber-900/15" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/40 blur-3xl dark:bg-cyan-900/10" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-600 via-indigo-500 to-amber-400 shadow-2xl shadow-blue-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 6 3 6 3s3 0 6-3v-5" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--app-text)]">
            مارينا
          </h1>
          <p className="mt-2 text-sm font-bold text-[var(--app-text-muted)]">
            ثانوية مارينا الأهلية
          </p>
        </div>

        <div className="app-card p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-blue-500 via-indigo-500 to-amber-400" />

          <LoginForm />

          <div className="mt-6 border-t border-[var(--app-border)] pt-5 text-center">
            <p className="text-xs font-medium text-[var(--app-text-soft)]">
              نظام إدارة ثانوية مارينا الأهلية © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
