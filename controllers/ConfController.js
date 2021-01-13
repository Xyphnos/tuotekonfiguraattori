'use strict';

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

const linksGet = async (req, res) => {
    const pool = await poolPromise;
    const result = await pool.request();
    try {
        const conf = await result.query('SELECT * FROM product_info WHERE id='+"'"+req.query.id+"'");
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

const confGetId = async (req, res) => {
    const pool = await poolPromise;
    const result = await pool.request();
    try {
        const conf = await result.query('SELECT id, productName FROM product_data WHERE one='+"'"+req.query.one+"'" + ' AND two='+"'"+req.query.two+"'" + ' AND three='+"'"+req.query.three+"'" + ' AND four='+"'"+req.query.four+"'" + ' AND five='+"'"+req.query.five+"'" + ' AND six='+"'"+req.query.six+"'" + ' AND seven='+"'"+req.query.seven+"'" + ' AND eight='+"'"+req.query.eight+"'" + ' AND nine='+"'"+req.query.nine+"'" + ' AND ten='+"'"+req.query.ten+"'" + ' AND eleven='+"'"+req.query.eleven+"'" + ' AND twelve='+"'"+req.query.twelve+"'" + ' AND thirteen='+"'"+req.query.thirteen+"'");
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
    const dataE = Object.keys(req.body.data).length;
    const values = '('+
        "'"+ req.body.productName + "'," +
        "'"+ req.body.one + "'," +
        "'"+ req.body.two + "'," +
        "'"+ req.body.three + "'," +
        "'"+ req.body.four + "'," +
        "'"+ req.body.five + "'," +
        "'"+ req.body.six + "'," +
        "'"+ req.body.seven + "'," +
        "'"+ req.body.eight + "'," +
        "'"+ req.body.nine + "'," +
        "'"+ req.body.ten + "'," +
        "'"+ req.body.eleven + "'," +
        "'"+ req.body.twelve  + "'," +
        "'"+ req.body.thirteen + "'"
        +')';

    try {
        const conf = await result.query
        ('INSERT INTO product_data (productName, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen) VALUES' + values + '; SELECT SCOPE_IDENTITY() AS id;');
        res.send(conf.recordset);

        for(let i = 0; i < dataE; i++){
            console.log(req.body.data[i]);
            const Dvalues = '('+
                "'"+ req.body.data[i] + "',"
                + conf.recordset[0].id
                +')';
            try {
                const conffi = await result.query
                ('INSERT INTO product_info (link, id) VALUES' + Dvalues);
                res.send(conffi.recordset);
            } catch (e) {
                console.error('confGet', e);
            }
        }

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
    linksGet,
    confGetId,
    initGet,
};
