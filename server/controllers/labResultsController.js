import ollama from 'ollama'
import { optimizeImage } from '../utils/dataOptimization.js';
import { PassThrough } from 'stream';
import { MEDICAL_PROMPT, MEDICAL_PROMPT_GENERAL } from '../utils/prompt.js'

async function parseMedicalTest(req, res) {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file;
    console.log(file)

    // Create a stream for progressive output
    const stream = new PassThrough();
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    stream.pipe(res);

    try {
        const optimizedImg = await optimizeImage(file.buffer);
        const base64Image = optimizedImg.toString('base64');

        const llmResponse = await ollama.chat({
            // llama3.2-vision:11b-instruct-q4_K_M
            model: 'llama3.2-vision:latest',
            messages: [
                {
                    role: 'system',
                    content: 'You are an Medical assistant expert expert.'
                },
                {
                    role: 'user',
                    content: MEDICAL_PROMPT_GENERAL,
                    images: [base64Image]
                }],
            stream: true  // Enable streaming
        });

        for await (const chunk of llmResponse) {
            stream.write(JSON.stringify(chunk));
        }
    } catch (err) {
        stream.write(JSON.stringify({ error: err.message }));
    } finally {
        stream.end();
    }
}

export { parseMedicalTest };
