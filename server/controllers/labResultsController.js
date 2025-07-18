import ollama from 'ollama'
import { combineImageVertically } from '../utils/dataOptimization.js';
import { PassThrough } from 'stream';
import { MEDICAL_PROMPT, MEDICAL_PROMPT_GENERAL, EXTRACT_DATA_PROMPT } from '../utils/prompt.js'

async function parseMedicalTest(req, res) {
    if (!req.files) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const files = req.files;

    // Create a stream for progressive output
    const stream = new PassThrough();
    res.setHeader('Content-Type', 'text/event-stream');
    // res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    stream.pipe(res);

    try {
        const combinedImg = await combineImageVertically(files.map(file => file.buffer));
        const base64Image = combinedImg.toString('base64');

        console.log('Processing data: ', combinedImg);
        const llmResponse = await ollama.chat({
            // llama3.2-vision:11b-instruct-q4_K_M
            // gemma3:12b-it-qat - fast but not accurate
            // llava-llama3:8b-v1.1-q4_0 - very fast but not accurate
            // llava-llama3:8b-v1.1-fp16 - better then prev ..q4_0 but still not perfect 22.191 seconds
            // llava:13b - ?
            // qwen2.5vl:7b-q4_K_M - should be best in OCR but time 56.022 sec.
            model: 'llava-llama3:8b-v1.1-fp16',
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
        console.error(err.message)
        stream.write(JSON.stringify({ error: err.message }));
    } finally {
        stream.end();
    }
}

export { parseMedicalTest };
