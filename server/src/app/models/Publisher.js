const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const Publisher = new Schema({
    namePublisher: { type: String, require: true },
    slug: { type: String, slug: 'namePublisher', unique: true },
    bookPublisher: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('Publisher', Publisher);
