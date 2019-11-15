
const orm = require('../config/orm.js');

const burger = {
  selectAll: function (callback) {
    orm.selectAll('burgers', function (res) {
      callback(res);
    });
  },
  insertOne: function (valuesArr, callback) {
    orm.insertOne('burgers', ['burger_name'], valuesArr, function (res) {
      callback(res);
    });
  },
  updateOne: function (columnValueObject, condition, callback) {
    orm.updateOne('burgers', columnValueObject, condition, function (res) {
      callback(res);
    });
  }
};


module.exports = burger;