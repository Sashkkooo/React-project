// src/utils/imageUtils.js
export async function getCroppedImg(imageSrc, crop, zoom, aspect) {
    return new Promise((resolve) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const size = Math.min(image.width, image.height);
            canvas.width = size;
            canvas.height = size;

            ctx.drawImage(
                image,
                crop.x, crop.y, size, size,
                0, 0, size, size
            );

            resolve(canvas.toDataURL("image/jpeg"));
        };
    });
}
