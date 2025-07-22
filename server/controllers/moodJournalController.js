import MoodJournal from '../model/MoodJournal.js';

export async function createEntry(req, res) {
  try {
    const userId = req.user._id;
    const entry = await MoodJournal.createEntry(userId, req.body);
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllEntries(req, res) {
  try {
    const userId = req.user._id;
    const entries = await MoodJournal.getUserEntries(userId);
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getEntry(req, res) {
  try {
    const entry = await MoodJournal.getUserEntry(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateEntry(req, res) {
  try {
    const entry = await MoodJournal.updateUserEntry(req.params.id, req.body);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteEntry(req, res) {
  try {
    const entry = await MoodJournal.deleteUserEntry(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
