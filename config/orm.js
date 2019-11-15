const connection = require('./connection.js');

function representativeQuestionMarks(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push('?');
  }
  return arr.toString();
}

function objectToSql(obj) {
  let arr = [];
  for (let key in obj) {
    let value = obj[key];
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = '\'' + value + '\'';
      }
      arr.push(key + '=' + value);
    }
  }
  return arr.toString();
}

const orm = {
  selectAll: function (tableName, callback) {
    let queryString = `SELECT * FROM ${tableName};`;
    connection.query(queryString, function (err, data) {
      if (err) {
        throw err;
      }
      callback(data);
    });
  },
  insertOne: function (tableName, columns, values, callback) {
    let columnNames = columns.toString();
    let valueMarks = representativeQuestionMarks(values.length);
    let queryString = `INSERT INTO ${tableName} (${columnNames}) VALUES(${valueMarks});`;
    connection.query(queryString, values, function (err, data) {
      if (err) {
        throw err;
      }
      callback(data);
    });
  },
  updateOne: function (tableName, columnValueObject, condition, callback) {
    let updateValues = objectToSql(columnValueObject);
    let queryString = `UPDATE ${tableName} SET ${updateValues} WHERE ${condition};`;
    connection.query(queryString, function (err, data) {
      if (err) {
        throw err;
      }
      callback(data);
    });
  }
};

module.exports = orm;