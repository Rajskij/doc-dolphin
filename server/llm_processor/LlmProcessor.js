import ollama from 'ollama'
import { MEDICAL_PROMPT, MEDICAL_PROMPT_GENERAL, EXTRACT_DATA_PROMPT } from '../utils/prompt.js'

async function processMedicalImages(combinedImg) {
    const base64Image = combinedImg.toString('base64');

    console.log('Processing data...');
    return await ollama.chat({
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
}

export { processMedicalImages };
