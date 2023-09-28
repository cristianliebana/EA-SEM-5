import { number } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IBook {
    title: string;
    author: string;
    category: string;
    pages: number;
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
        pages: { type: Number, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IBookModel>('Book', BookSchema);
