import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export async function optimizeImage(buffer) {
    try {
        return await sharp(buffer)
            .rotate(90)
            .resize({
                width: 1800,
            })
            // .grayscale()
            // .modulate({ brightness: 1.2 })  // Lighten image
            // .linear(1.1, -50)  // Increase contrast (slope, intercept)
            .toBuffer();
    } catch (err) {
        console.error('Image optimization failed:', err);
        throw err;
    }
}

async function rotate(imageBuffers, width) {
    return await Promise.all(
        imageBuffers.map(async (buffer) => {
            return await sharp(buffer)
                .rotate(90)
                .resize({ width })
                .toBuffer();
        })
    );
}

export async function combineImageVertically(imageBuffers) {
    try {
        const width = 1500;
        const rotatedImages = await rotate(imageBuffers, width);

        const metadataList = await Promise.all(
            rotatedImages.map(buf => sharp(buf).metadata())
        );
        // const width = Math.max(...metadataList.map(meta => meta.width)); // optional: set fixed width
        const totalHeight = metadataList.reduce((sum, meta) => sum + meta.height, 0);

        let yOffset = 0;
        const compositeInputs = rotatedImages.map((buf, i) => {
            const input = {
                input: buf,
                top: yOffset,
                left: 0,
            };
            yOffset += metadataList[i].height;
            return input;
        });

        const mergedImg = await sharp({
            create: {
                width,
                height: totalHeight,
                channels: 3,
                background: 'white',
            },
        })
            .composite(compositeInputs)
            .grayscale()
            .jpeg({ quality: 70 })
            .toBuffer();

        const outputPath = path.join(process.cwd(), 'merged_output.jpg');
        fs.writeFile(outputPath, mergedImg, (err) => err && console.error(err));

        return mergedImg;
    } catch (error) {
        console.error('Error merging images:', error);
        throw error;
    }
}
