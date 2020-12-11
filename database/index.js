const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const db = mongoose.connect(process.env.DATABASE_URL, options)
            .then(() => console.log('connected to db'))
            .catch(err => console.error('error connecting to the database:', err))

module.exports = db;