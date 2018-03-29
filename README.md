# Zeplin Escape Emoji Extension

Escapes the emoji characters inside text layers as Unicode code point escapes.

Sample layer output of a text layer that incldues an emoji:
```js
const text = "The quick brown \u{1F98A} jumps over the lazy \u{1F436}.";
```

## Development

Escape Emoji extension is developed using [zem](https://github.com/zeplin/zem), Zeplin Extension Manager. zem is a command line tool that lets you quickly create and test extensions.

To learn more about zem, [see documentation](https://github.com/zeplin/zem).
