'use strict';

const confModel = require('../models/ConfModel');
const {poolPromise} = require('../database/db');
const mssql = require('mssql');

const confGet = async (req, res) => {
    const pool = await poolPromise;
    const result = await pool.request();
    try {
        const conf = await result.query('SELECT * FROM product_data WHERE one='+"'"+req.query.one+"'");
        res.send(conf.recordset);
    } catch (e) {
        console.error('confGet', e);
    }
    /*try {
        const conf = await confModel.find({one: {$eq: req.query.one}});
        res.json(conf);
    } catch (e) {
        console.error('confGet', e);
    }*/
};

const initGet = async (req, res) => {
    const pool = await poolPromise;
    const result = await pool.request();
    try {
        const conf = await result.query('SELECT DISTINCT one FROM product_data');
        res.send(conf.recordset);
    } catch (e) {
        console.error('confGet', e);
    }
};

const confAdd = async (req, res) => {

    const pool = await poolPromise;
    const result = await pool.request();
    let data;
    if(req.query.data !== undefined){
        data = req.query.data;
    }
    else{
        data = null;
    }
    const values = '('+
        "'"+ req.body.one + "'," +
        "'"+ req.body.two + "'," +
        "'"+ req.body.three+ "'," +
        "'"+ req.body.four+ "'," +
        "'"+ req.body.five+ "'," +
        "'"+ req.body.six+ "'," +
        "'"+ req.body.seven+ "'," +
        "'"+ req.body.eight+ "'," +
        "'"+ req.body.nine+ "'," +
        "'"+ req.body.ten+ "'," +
        "'"+ req.body.eleven+ "'," +
        "'"+ req.body.twelve+ "'," +
        "'"+ req.body.thirteen+ "'," +
        data
        +')';
    try {
        const conf = await result.query
        ('INSERT INTO product_data (one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, data) VALUES' + values);
        res.send(conf.recordset);
    } catch (e) {
        console.error('confGet', e);
    }
};

const confDelete = async (req, res) => {

};
const confModify = async (req, res) => {

};

module.exports = {
    confAdd,
    confDelete,
    confModify,
    confGet,
    initGet,
};
