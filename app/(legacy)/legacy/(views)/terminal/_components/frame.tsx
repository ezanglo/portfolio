export default function TerminalFrame({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full flex-col text-[15px] leading-[1.7]">{children}</div>;
}
