import MoodJournal from '../model/MoodJournal.js';
import { analyzeMoodInsights } from '../llm_processor/LlmProcessor.js';
import { PassThrough } from 'stream';
import { Request, Response } from 'express';

interface MoodEntry {
  _id: string;
  userId: string;
  // Add other mood entry properties here
}

interface DateRange {
  startDate: string;
  endDate: string;
}

export async function createMood(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user._id;
    const entry = await MoodJournal.createMood(userId, req.body);
    res.status(201).json(entry);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function getAllMoods(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user._id;
    const entries = await MoodJournal.getMoods(userId);
    res.json(entries);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function getMood(req: Request, res: Response): Promise<void> {
  try {
    const entry = await MoodJournal.getMood(req.params.id);
    if (!entry) {
      res.status(404).json({ error: 'Entry not found' });
      return;
    }
    res.json(entry);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function updateMood(req: Request, res: Response): Promise<void> {
  try {
    const entry = await MoodJournal.updateMood(req.params.id, req.body);
    if (!entry) {
      res.status(404).json({ error: 'Entry not found' });
      return;
    }
    res.json(entry);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function deleteMood(req: Request, res: Response): Promise<void> {
  try {
    const entry = await MoodJournal.deleteMood(req.params.id);
    if (!entry) {
      res.status(404).json({ error: 'Entry not found' });
      return;
    }
    res.json({ message: 'Entry deleted successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function generateMoodInsights(req: Request, res: Response): Promise<void> {
  const user_id = req.params?.user_id;
  const { startDate, endDate } = req.body as DateRange;

  if (!user_id || !startDate || !endDate) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    res.status(400).json({ error: "Start date is later than end date" });
    return;
  }

  try {
    const moods = await MoodJournal.getMoodsByDate(user_id, start, end);
    
    if (moods.length < 1) {
      res.status(400).json({ error: "Entry not found for this date" });
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    const stream = new PassThrough();
    stream.pipe(res);

    try {
      const llmResponse = await analyzeMoodInsights(moods);

      for await (const chunk of llmResponse) {
        stream.write(JSON.stringify(chunk));
      }
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
      stream.write(JSON.stringify({ 
        error: err instanceof Error ? err.message : 'Unknown error' 
      }));
    } finally {
      stream.end();
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}