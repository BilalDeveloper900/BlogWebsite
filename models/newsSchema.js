const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    detail: { type: String, required: true },
    writer: { type: String, },
    tags: { type: String, },
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
