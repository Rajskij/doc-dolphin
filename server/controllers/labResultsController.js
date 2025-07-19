import { combineImageVertically } from '../utils/dataOptimization.js';
import { PassThrough } from 'stream';
import { processMedicalImages } from '../llm_processor/LlmProcessor.js';
import ResultModel from '../model/ResultModel.js';
import { totalmem } from 'os';

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
        const page = parseInt(req.query?.page) || 1;
        const limit = parseInt(req.query?.limit) || 10;


        const results = await ResultModel.getResults(id, page, limit);

        const total = results[0]?.metadata[0]?.total || 0;
        const totalPages = Math.ceil(total / limit);
        res.status(201).json({ results: results[0]?.data || [], total, page, totalPages });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function createReport(req, res) {
    try {
        const id = req.params.user_id;
        const report = req.body.report;

        const result = await ResultModel.createDoc(id, report);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteResult(req, res) {
    try {
        const result = await ResultModel.deleteDoc(req.params.result_id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export { parseMedicalTest, getResults, createReport, deleteResult };
