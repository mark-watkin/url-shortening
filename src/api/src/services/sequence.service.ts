import mongoose, { Schema, model } from 'mongoose';
import { config } from '../config';

interface Sequence {
    _id: string;
    seq: number;
}

const CounterSchema = new Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
const counter = model('counter', CounterSchema);

export class SequenceService {
    async getNext(sequenceName: string): Promise<number> {
        await mongoose.connect(config.db.connectionUrl);
        const ret = await counter.findByIdAndUpdate<Sequence>(
            { _id: sequenceName },
            { $inc: { seq: 1} },
            { upsert: true, new: true }
        );
    
        return ret!.seq;
    }
}