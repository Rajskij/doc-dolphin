import mongoose from 'mongoose';

const moodJournalSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: ["Happy", "Neutral", "Sad", "Excited", "Tired", "Angry"],
        required: true
    },
    weather: {
        type: String,
        enum: ["Sunny", "Cloudy", "Rainy", "Snowy", "Stormy"]
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    activities: [{
        type: String,
        enum: ["Work", "Study", "Exercise", "Art", "Music", "Reading", "Writing", "Coding", "Cooking", "Social", "Relaxation", "Travel",
            "Gaming", "Meditation", "Shopping", "Gardening", "Photography", "DIY", "Learning", "Netflix", "Outdoors"]
    }],
    note: {
        type: String,
        maxLength: 500
    },
}, { timestamps: true });

moodJournalSchema.statics.createEntry = async function (user_id, data) {
    const entry = new this({ user_id, ...data });
    return await entry.save();
};

moodJournalSchema.statics.getUserEntries = async function (user_id) {
    return await this.find({ user_id }).sort({ date: -1 });
};

moodJournalSchema.statics.getUserEntry = async function (_id) {
    return await this.findOne({ _id });
};

moodJournalSchema.statics.updateUserEntry = async function (_id, data) {
    return await this.findOneAndUpdate(
        { _id },
        data,
        { new: true, runValidators: true }
    );
};

moodJournalSchema.statics.deleteUserEntry = async function (_id) {
    return await this.findOneAndDelete({ _id });
};

export default mongoose.model('MoodJournal', moodJournalSchema);
