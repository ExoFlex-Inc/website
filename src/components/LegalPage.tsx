import Link from "next/link";

type Props = {
  title: string;
  updated: string;
  altHref: string;
  altLabel: string;
  children: React.ReactNode;
};

export default function LegalPage({
  title,
  updated,
  altHref,
  altLabel,
  children,
}: Props) {
  return (
    <main className="mx-auto z-10 max-w-3xl px-4 py-6 pt-30">
      <h1 className="mb-4 text-4xl font-extrabold text-ink sm:text-5xl">
        {title}
      </h1>
      <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/20 pb-4 text-sm text-ink/60">
        <span>{updated}</span>
        <Link href={altHref} className="underline hover:text-ink">
          {altLabel}
        </Link>
      </div>
      <div className="space-y-8 text-base leading-relaxed text-ink/80 [&_a]:underline [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_li]:mb-2 [&_p]:mb-3 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </div>
    </main>
  );
}
