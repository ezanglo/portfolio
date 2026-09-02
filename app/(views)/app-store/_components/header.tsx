export default function AppStoreHeader({ name }: { name: string }) {
  return (
    <header className="mx-auto flex max-w-[1000px] items-center gap-3 px-6 pt-14 sm:px-8">
      <span
        aria-hidden
        className="h-9 w-9 rounded-lg"
        style={{ background: "linear-gradient(135deg, #A170EB, #42A3FD)" }}
      />
      <div>
        <h1 className="text-[30px] font-extrabold text-view-fg">{name}: App Store</h1>
        <p className="text-[15px] text-view-fg-muted">10+ years shipping full-stack apps. Now featuring React Native + AI.</p>
      </div>
    </header>
  );
}
