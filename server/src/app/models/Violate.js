const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const Violate = new Schema(
    {
        nameViolate: { type: String },
        expirationDate: { type: Date },
        contentViolate: { type: String },
        penalizeViolate: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Violate', Violate);
