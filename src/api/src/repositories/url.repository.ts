import { config } from '../config';
import { Schema, model, connect } from 'mongoose';
import { Url } from '../models/ulr';

const urlSchema = new Schema({
    id: Number,
    original: String,
    shortened: String,
});

const UrlModel = model<Url>('Url', urlSchema);

export class UrlRepository {
    async addUrl(newUrl: Url): Promise<void> {
        await connect(config.db.connectionUrl);
        const {original, shortened, id} = newUrl;
        const newUrlModel = new UrlModel({ original, shortened, id });
        await newUrlModel.save();
    }

    async getAll(): Promise<Url[]> {
        await connect(config.db.connectionUrl);
        return (await UrlModel.find() as Url[])
            .map(u => ({original: u.original, shortened: u.shortened, id: u.id}));
    }
}