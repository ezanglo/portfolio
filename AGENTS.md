# Agent notes

- Do not run end-to-end / browser-driven testing (Playwright, chromium-cli, screenshots, starting the dev server to click through the UI, curling pages/routes to eyeball output, etc.). The user tests these themselves. Instead, once a change is implemented, return a concise list of specific things for the user to test (what to do, what to expect). Type-checking (`npx tsc --noEmit`), `npm run lint`, and `npm run test` are fine and expected.
