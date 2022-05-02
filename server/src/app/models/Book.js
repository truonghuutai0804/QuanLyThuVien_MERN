const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const Book = new Schema(
    {
        nameBook: { type: String, require: true },
        slug: { type: String, slug: 'nameBook', unique: true },
        descriptionBook: { type: String },
        imageBook: { type: String },
        yearPublisherBook: { type: Date },
        categoryBook: { type: Schema.Types.ObjectId, ref: 'Category' },
        authorBook: { type: Schema.Types.ObjectId, ref: 'Author' },
        publisherBook: { type: Schema.Types.ObjectId, ref: 'Publisher' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Book', Book);
