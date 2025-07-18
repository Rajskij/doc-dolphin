import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
}, { timestamps: true });

schema.statics.createResult = async function (user_id, data) {
    const result = await this.create({ user_id, data });

    return result;
}

schema.statics.getResults = async function (user_id) {
    const result = await this.find({ user_id });
    
    return result;
}

export default mongoose.model('result', schema);
