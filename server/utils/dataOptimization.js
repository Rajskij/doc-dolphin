import sharp from 'sharp';

export async function optimizeImage(buffer) {
    try {
        return await sharp(buffer)
            .rotate(90)
            .resize({
                width: 1800,  // Higher resolution for small text
            })
            .grayscale()
            .modulate({ brightness: 1.2 })  // Lighten image
            .linear(1.1, -50)  // Increase contrast (slope, intercept)
            .toBuffer();
    } catch (err) {
        console.error('Image optimization failed:', err);
        throw err;
    }
}
