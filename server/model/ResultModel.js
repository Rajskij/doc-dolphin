import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    report: {
        type: String,
        required: true
    }
}, { timestamps: true });

schema.statics.deleteDoc = async function (result_id) {
    const result = await this.findOneAndDelete({ _id: result_id });

    if (!result) {
        throw Error("Result does not exist!");
    }
    
    return result;
}

schema.statics.createDoc = async function (user_id, report) {
    const result = await this.create({ user_id, report });
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
                    { $skip: (page - 1) * limit },
                    { $limit: limit },
                    { $sort: { createdAt: -1 } },
                ],
            },
        },
    ]);

    return result;
}

export default mongoose.model('result', schema);
