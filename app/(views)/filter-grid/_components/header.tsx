export default function FilterGridHeader({ name }: { name: string }) {
  return (
    <header className="mx-auto max-w-[1080px] px-6 pt-14 pb-6 sm:px-12">
      <h1 className="text-[34px] font-extrabold tracking-tight text-view-fg">{name}</h1>
      <p className="mt-2 text-base text-view-fg-muted">
        Full-stack developer, 10+ years. Filter the work by what you&apos;re hiring for.
      </p>
    </header>
  );
}
