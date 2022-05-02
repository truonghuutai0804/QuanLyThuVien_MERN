const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const Author = new Schema({
    nameAuthor: { type: String, require: true },
    slug: { type: String, slug: 'nameAuthor', unique: true },
    owner: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('Author', Author);
