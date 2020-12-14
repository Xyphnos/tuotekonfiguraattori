'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const confSchema = new Schema({
    one: {type: String, required: true},
    two: {type: String, required: true},
    three: {type: String, required: true},
    four: {type: String, required: true},
    five: {type: String, required: true},
    six: {type: String, required: true},
    seven: {type: String, required: true},
    eight: {type: String, required: true},
    nine: {type: String, required: true},
    ten: {type: String, required: true},
    eleven: {type: String, required: true},
    twelve: {type: String, required: true},
    thirteen: {type: String, required: true},
});

module.exports = mongoose.model('Conf', confSchema);