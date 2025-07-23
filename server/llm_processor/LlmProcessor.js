import ollama from 'ollama'
import { MEDICAL_PROMPT, MEDICAL_PROMPT_GENERAL, EXTRACT_DATA_PROMPT } from '../utils/prompt.js'

// llama3.2-vision:11b-instruct-q4_K_M
// gemma3:12b-it-qat - fast but not accurate
// llava-llama3:8b-v1.1-q4_0 - very fast but not accurate
// llava-llama3:8b-v1.1-fp16 - better then prev ..q4_0 but still not perfect 22.191 seconds
// llava:13b - ?
// qwen2.5vl:7b-q4_K_M - should be best in OCR but time 56.022 sec.
const MODEL = 'llava-llama3:8b-v1.1-fp16'

async function processMedicalImages(combinedImg) {
    const base64Image = combinedImg.toString('base64');

    console.log('Processing data...');
    return await ollama.chat({
        model: MODEL,
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

async function createTitle(report) {
    const prompt = `
Based on this medical report, generate a concise, meaningful title NO MORE THEN 5 WORDS!
that captures the main health concern:

${report.substring(0, 2000)}...
`;
    const result = await ollama.chat({
        model: MODEL,
        messages: [
            {
                role: 'user',
                content: prompt
            }]
    });

    return result.message.content
}

async function analyzeMoodInsights(moodRecords) {
    const moodText = moodRecords.map((entry) => {
        return `
        Date: ${new Date(entry.date).toDateString()}
        Mood: ${entry.mood}
        Weather: ${entry.weather}
        Activities: ${entry.activities.join(", ")}
        Note: ${entry.note || "None"}`.trim()
    }).join("\n\n")

    const prompt = `
You are an expert in emotional well-being. Analyze the following mood journal entries and provide a brief insight report.
Give a short summary of mood trends, recurring activities, and any recommendations for emotional improvement. Avoid repeating dates.
Mood Journal Entries:
${moodText.substring(0, 4000)}`.trim()

    return await ollama.chat({
        model: MODEL,
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ],
        stream: true 
    });
}

export { processMedicalImages, createTitle, analyzeMoodInsights };
