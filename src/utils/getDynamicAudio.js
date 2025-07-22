// src/utils/getDynamicAudio.js

const audioContext = require.context(
    '../assests/link',
    false,
    /\.mp3$/
);

/**
 * Trả về URL của file audio tương ứng hoặc null nếu không tìm thấy.
 * @param {string} fileName
 * @returns {string|null}
 */
export function getDynamicAudio(fileName) {
    if (!fileName) return null;
    try {
        const module = audioContext(`./${fileName}`);
        return module.default || module;
    } catch (err) {
        console.warn(`Audio file "${fileName}" not found.`, err);
        return null;
    }
}
