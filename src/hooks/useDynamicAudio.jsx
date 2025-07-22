// src/hooks/useDynamicAudio.js
import { useState, useEffect } from 'react';

// Tạo context cho toàn bộ file mp3 trong thư mục src/assets/link
const audioContext = require.context(
    '../assests/link',
    false,
    /\.mp3$/
);

export default function useDynamicAudio(audioName) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (!audioName) {
            setUrl('');
            return;
        }

        try {

            const audioModule = audioContext(`./${audioName}`);

            const resolvedUrl = audioModule.default || audioModule;
            setUrl(resolvedUrl);
        } catch (err) {
            console.error('Error loading audio:', err);
            setUrl('');
        }
    }, [audioName]);

    return url;
}
