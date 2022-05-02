const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const Staff = new Schema(
    {
        nameStaff: { type: String, require: true },
        phoneStaff: { type: String },
        addressStaff: { type: String },
        emailStaff: { type: String },
        accountStaff: { type: Schema.Types.ObjectId, ref: 'Account' },
        slug: { type: String, slug: 'nameBook', unique: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Staff', Staff);
