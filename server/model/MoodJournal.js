import mongoose from 'mongoose';

const schema = new mongoose.Schema({
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

schema.index({ user_id: 1 }); 

schema.statics.createMood = async function (user_id, data) {
    const entry = new this({ user_id, ...data });
    return await entry.save();
};

schema.statics.getMoods = async function (user_id) {
    return await this.find({ user_id }).sort({ date: -1 });
};

schema.statics.getMood = async function (_id) {
    return await this.findOne({ _id });
};

schema.statics.updateMood = async function (_id, data) {
    return await this.findOneAndUpdate(
        { _id },
        data,
        { new: true, runValidators: true }
    );
};

schema.statics.deleteMood = async function (_id) {
    return await this.findOneAndDelete({ _id });
};

schema.statics.getMoodsByDate = async function (user_id, startDate, endDate) {
    return await this.find({
        user_id, 
        date: {
            $gte: startDate,
            $lte: endDate
        }
    });    
};

export default mongoose.model('MoodJournal', schema);
