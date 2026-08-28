# Caption Cues demo

- Primary URL: `https://caption-cues.sociobot.in/?demo=1`
- The query entry redirects to `/demo/?demo=1`, where the demo banner and reset control remain visible.
- Direct route: `https://caption-cues.sociobot.in/demo/`
- Local URL after `npm run dev:site`: `http://localhost:5173/demo/`

The sample is a three-line station scene. It includes speaker labels, names,
sound cues, and the saved word “Gate.” Visitors can change all rules, text size,
caption background, and the saved-word list. They can move between lines,
replay with the button or `Alt+R`, and check the unsupported-player state.

Demo state uses only the `demo:caption-cues:settings` localStorage key. Reset
demo removes every key beginning with `demo:` and restores the seed. Start for
real removes those keys before downloading the extension ZIP. Demo code never
reads or writes the extension’s `chrome.storage` data or ordinary site keys.
