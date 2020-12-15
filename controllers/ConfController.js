'use strict';

const confModel = require('../models/ConfModel');

const confGet = async (req, res) => {
    try {
        const conf = await confModel.find({one: {$eq: req.query.one}});
        res.json(conf);
    } catch (e) {
        console.error('confGet', e);
    }
};

const initGet = async (req, res) => {
  try {
      const init = await confModel.distinct('one');
      res.json(init);
  } catch (e) {
      console.error('innitGet', e);
  }
};

const confAdd = async (req, res) => {
    try {
        const post = await confModel.create({
            one: req.body.one,
            two: req.body.two,
            three: req.body.three,
            four: req.body.four,
            five: req.body.five,
            six: req.body.six,
            seven: req.body.seven,
            eight: req.body.eight,
            nine: req.body.nine,
            ten: req.body.ten,
            eleven: req.body.eleven,
            twelve: req.body.twelve,
            thirteen: req.body.thirteen,
        });
        res.send(`conf created with id: ${post._id}.`);
    } catch(e){
        console.error('conf_post', req);
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
