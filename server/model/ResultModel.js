import mongoose from 'mongoose';
import { type } from 'os';
import { title } from 'process';

const schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'Summery Report'
    },
    report: {
        type: String,
        required: true
    }
}, { timestamps: true });

schema.statics.deleteDoc = async function (_id) {
    const result = await this.findOneAndDelete({ _id });

    if (!result) {
        throw Error("Result does not exist!");
    }

    return result;
}

schema.statics.createDoc = async function (user_id, report, title) {
    const result = await this.create({ user_id, report, title });
    return result;
}

schema.statics.getResult = async function (_id) {
    const result = await this.findOne({ _id });

    if (!result) {
        throw Error("Result does not exist!");
    }

    return result;
}

schema.statics.getResults = async function (user_id, page, limit) {
    const result = await this.aggregate([
        { $match: { user_id } },
        {
            $facet: {
                // Count total documents
                metadata: [{ $count: "total" }],
                // Fetch paginated data
                data: [
                    { $sort: { createdAt: -1 } },
                    { $skip: (page - 1) * limit },
                    { $limit: limit },
                ],
            },
        },
    ]);

    return result;
}

schema.statics.updateDoc = async function (_id, title) {
    if (typeof title !== 'string') {
        throw new Error("Title must be a string");
    }

    const result = await this.findOneAndUpdate(
        { _id },
        { title: title },
        { new: true }
    )

    if (!result) {
        throw Error("Result does not exist!");
    }

    return result;
}

export default mongoose.model('result', schema);
