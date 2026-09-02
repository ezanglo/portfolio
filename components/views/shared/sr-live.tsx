export default function SrLive({
  children,
  atomic = true,
}: {
  children: React.ReactNode;
  atomic?: boolean;
}) {
  return (
    <div className="sr-only" role="status" aria-live="polite" aria-atomic={atomic}>
      {children}
    </div>
  );
}
