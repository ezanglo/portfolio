export default function AppIcon({
  initials,
  bg,
  size,
  radius,
}: {
  initials: string;
  bg: string;
  size: number;
  radius: number;
}) {
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center font-bold text-white"
      style={{ width: size, height: size, borderRadius: radius, background: bg, fontSize: size * 0.32 }}
    >
      {initials}
    </span>
  );
}
