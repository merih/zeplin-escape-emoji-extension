import emojiRegex from "emoji-regex";

function escape(codePoint) {
    return codePoint.toString(16).toUpperCase();
}

function layer(context, selectedLayer) {
    if (selectedLayer.type !== "text") {
        return;
    }

    if (!emojiRegex().test(selectedLayer.content)) {
        return;
    }

    var escapedString = selectedLayer.content.replace(emojiRegex(), function (emoji) {
        return Array.from(emoji, function (part) {
            var first = part.charCodeAt(0);

            if (part.length === 1) {
                return `\\u{${escape(first)}}`;
            }

            var second = part.charCodeAt(1);
            var codePoint = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;

            return `\\u{${escape(codePoint)}}`;
        }).join("");
    });

    return {
        code: `const text = "${escapedString}";`,
        language: "javascript"
    }
};

export default {
    layer
};
