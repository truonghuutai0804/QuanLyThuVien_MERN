const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const User = new Schema(
    {
        nameUser: { type: String, require: true },
        phoneUser: { type: String },
        emailUser: { type: String },
        majorUser: { type: String },
        addressUser: { type: String },
        accountUser: { type: Schema.Types.ObjectId, ref: 'Account' },
        violateUser: [{ type: Schema.Types.ObjectId, ref: 'Violate' }],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
