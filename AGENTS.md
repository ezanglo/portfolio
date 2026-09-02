# Agent notes

- Do not run end-to-end / browser-driven testing (Playwright, chromium-cli, screenshots, starting the dev server to click through the UI, etc.). The user verifies UI changes themselves. Type-checking (`npx tsc --noEmit`), `npm run lint`, and `npm run test` are fine and expected.
