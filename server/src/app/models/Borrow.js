const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const Borrow = new Schema(
    {
        userBorrow: { type: Schema.Types.ObjectId, ref: 'User' },
        staffBorrow: { type: Schema.Types.ObjectId, ref: 'Staff' },
        bookBorrow: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
        appointmentDate: { type: Date, require: true },
        returnDate: { type: Date },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Borrow', Borrow);
