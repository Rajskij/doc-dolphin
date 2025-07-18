import { combineImageVertically } from '../utils/dataOptimization.js';
import { PassThrough } from 'stream';
import { processMedicalImages } from '../llm_processor/LlmProcessor.js';
import ResultModel from '../model/ResultModel.js';

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
        const llmResponse = await processMedicalImages(combinedImg);

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

async function getResults(req, res) {
    try {
        const id = req.params.user_id;
        const result = await ResultModel.getResults(id);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function createResult(req, res) {
    try {
        const id = req.params.user_id;
        const data = req.body.data;

        const result = await ResultModel.createResult(id, data);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export { parseMedicalTest, getResults, createResult };
