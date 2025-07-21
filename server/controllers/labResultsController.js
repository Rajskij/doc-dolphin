import { combineImageVertically } from '../utils/dataOptimization.js';
import { PassThrough } from 'stream';
import { createTitle, processMedicalImages } from '../llm_processor/LlmProcessor.js';
import ResultModel from '../model/ResultModel.js';
import ollama from 'ollama'

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

async function getResult(req, res) {
    try {
        const id = req.params.result_id;
        const results = await ResultModel.getResult(id);
        res.status(201).json({ results });
    } catch (err) {
        res.status(400).json({ error: err.message });
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
        const title = await createTitle(report);

        console.log(title)

        const result = await ResultModel.createDoc(id, report, title);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteResult(req, res) {
    try {
        console.log(req.params);
        await ResultModel.deleteDoc(req.params.result_id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function updateResult(req, res) {
     try {
        const id = req.params.result_id;
        const title = req.body.title;

        const result = await ResultModel.updateDoc(id, title);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export { parseMedicalTest, getResults, getResult, createReport, deleteResult, updateResult };
