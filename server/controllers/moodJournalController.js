import MoodJournal from '../model/MoodJournal.js';
import { analyzeMoodInsights } from '../llm_processor/LlmProcessor.js';
import { PassThrough } from 'stream';

export async function createMood(req, res) {
  try {
    const userId = req.user._id;
    const entry = await MoodJournal.createMood(userId, req.body);
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllMoods(req, res) {
  try {
    const userId = req.user._id;
    const entries = await MoodJournal.getMoods(userId);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMood(req, res) {
  try {
    const entry = await MoodJournal.getMood(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateMood(req, res) {
  try {
    const entry = await MoodJournal.updateMood(req.params.id, req.body);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteMood(req, res) {
  try {
    const entry = await MoodJournal.deleteMood(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function generateMoodInsights(req, res) {
  const user_id = req.params?.user_id;
  const { startDate, endDate } = req.body;

  if (!user_id || !startDate || !endDate) {
    return res.status(400).json({ error: "Missing required fields" })
  }
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    return res.status(400).json({ error: "Start date is later than end date" });
  }

  const moods = await MoodJournal.getMoodsByDate(user_id, start, end);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');
  const stream = new PassThrough();
  stream.pipe(res);

  try {
    const llmResponse = await analyzeMoodInsights(moods);

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
