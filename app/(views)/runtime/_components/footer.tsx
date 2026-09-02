export default function RuntimeFooter({ copyrightText }: { copyrightText: string }) {
  return (
    <footer className="border-t border-view-border px-6 py-8 text-center font-mono text-xs text-view-fg-subtle sm:px-14">
      {copyrightText}
    </footer>
  );
}
