import emojiRegex from "emoji-regex";

const HIGH_SURROGATE_MIN = 0xD800;
const HIGH_SURROGATE_MAX = 0xDBFF;
const LOW_SURROGATE_MIN = 0xDC00;
const CODE_POINT_MAX = 0xFFFF;

const SURROGATE_RANGE = HIGH_SURROGATE_MAX - HIGH_SURROGATE_MIN + 1;
const HEX = 16;

function escape(codePoint) {
    return codePoint.toString(HEX).toUpperCase();
}

function layer(_, selectedLayer) {
    if (selectedLayer.type !== "text") {
        return;
    }

    if (!emojiRegex().test(selectedLayer.content)) {
        return;
    }

    const escapedString = selectedLayer.content.replace(emojiRegex(), emoji =>
        [...emoji].map(part => {
            const highSurrogate = part.charCodeAt(0);

            if (part.length === 1) {
                return `\\u{${escape(highSurrogate)}}`;
            }

            const lowSurrogate = part.charCodeAt(1);
            const codePoint = (highSurrogate - HIGH_SURROGATE_MIN) * SURROGATE_RANGE +
                lowSurrogate - LOW_SURROGATE_MIN + CODE_POINT_MAX + 1;

            return `\\u{${escape(codePoint)}}`;
        }).join("")
    );

    return {
        code: `const text = "${escapedString}";`,
        language: "javascript"
    };
}

export default {
    layer
};
