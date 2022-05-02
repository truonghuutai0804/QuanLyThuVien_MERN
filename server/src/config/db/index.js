const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/quan_ly_thu_vien');
        console.log('Ket Noi Thanh Cong');
    } catch (error) {
        console.log('Ket Noi That Bai');
    }
}

module.exports = { connect };
