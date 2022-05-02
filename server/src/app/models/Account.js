const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Account = new Schema(
    {
        username: { type: String },
        password: { type: String, require: true },
        slug: { type: String, slug: 'username', unique: true },
        role: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Account', Account);
