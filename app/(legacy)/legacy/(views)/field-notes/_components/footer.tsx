export default function FieldNotesFooter({ copyrightText }: { copyrightText: string }) {
  return (
    <footer className="border-t border-view-border px-6 py-8 text-center text-[13px] text-view-fg-subtle sm:px-14">
      {copyrightText}
    </footer>
  );
}
