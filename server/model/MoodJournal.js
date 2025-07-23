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

moodJournalSchema.statics.createMood = async function (user_id, data) {
    const entry = new this({ user_id, ...data });
    return await entry.save();
};

moodJournalSchema.statics.getMoods = async function (user_id) {
    return await this.find({ user_id }).sort({ date: -1 });
};

moodJournalSchema.statics.getMood = async function (_id) {
    return await this.findOne({ _id });
};

moodJournalSchema.statics.updateMood = async function (_id, data) {
    return await this.findOneAndUpdate(
        { _id },
        data,
        { new: true, runValidators: true }
    );
};

moodJournalSchema.statics.deleteMood = async function (_id) {
    return await this.findOneAndDelete({ _id });
};

moodJournalSchema.statics.getMoodsByDate = async function (user_id, startDate, endDate) {
    return await this.find({
        user_id, 
        date: {
            $gte: startDate,
            $lte: endDate
        }
    });    
};

export default mongoose.model('MoodJournal', moodJournalSchema);
