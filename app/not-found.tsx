import Link from "next/link";
import { PageShell } from "@/components/experience/ui";

export default function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-28 sm:px-8">
        <p className="tag-label mb-5">404</p>
        <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">Страница не найдена</h1>
        <p className="mt-5 text-mist">Возможно, адрес устарел после обновления сайта.</p>
        <Link
          href="/"
          className="focus-ring mt-8 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
        >
          На главную
        </Link>
      </div>
    </PageShell>
  );
}
