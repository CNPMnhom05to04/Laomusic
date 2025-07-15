import { useState, useEffect } from 'react';

// Tạo context cho toàn bộ ảnh trong thư mục src/assets/picture
const imagesContext = require.context(
    '../assets/picture',   // thư mục
    false,
    /.(png|jpe?g|svg)$/
);

function useDynamicImage(imageName) {
    const [src, setSrc] = useState('');

    useEffect(() => {
        if (!imageName) {
            setSrc('');
            return;
        }

        try {
            // require context lấy file ./[imageName]
            const imageSrc = imagesContext(`./${imageName}`);
            setSrc(imageSrc);
        } catch (err) {
            console.error('Error loading image:', err);
            setSrc(''); // hoặc đường dẫn placeholder
        }
    }, [imageName]);

    return src;
}

export default useDynamicImage;
