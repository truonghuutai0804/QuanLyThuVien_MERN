const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const Category = new Schema({
    nameCategory: { type: String },
    slug: { type: String, slug: 'nameCategory', unique: true },
    bookCategory: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('Category', Category);
