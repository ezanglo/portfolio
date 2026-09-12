import "./views.css";

/**
 * Scopes views.css to the seven alternate views and the gallery.
 *
 * It must not reach /legacy/classic: views.css rebinds Tailwind's `dark:` variant to
 * `[data-view-theme="dark"]`, while classic's stylesheet binds it to `.dark` (set by
 * next-themes). Loading both on one route makes classic's dark mode unpredictable.
 */
export default function LegacyViewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
