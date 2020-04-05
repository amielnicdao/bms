var connection = require("../config/connection");
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}
function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string") {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}
var orm = {
  create: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    console.log(queryString);
    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  selectOne: function (table, condition, cb) {
    console.log("ORM");
    var queryString = "SELECT * FROM " + table;
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  allMembers: function (tableInput, cb) { //members
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  addToSessions: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ");";

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },


  update: function (table, objColVals, condition, cb) {
    console.log("UPDATE STEP 3");
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  allAttendance: function (tableInput, cb) { //class attendance
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  //MANAGEMENT SIDE

  deleteMember: function (table, condition, cb) {// delete members
    var deleteString = "DELETE FROM " + table;
    deleteString += " WHERE ";
    deleteString += condition;
    console.log(deleteString);
    connection.query(deleteString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  allClasses: function (tableInput, cb) { //trainers
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  createNewClass: function (table, cols, vals, cb) { //class
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ");";
    console.log(queryString)
    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  updateClasses: function (table, cols, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(cols);
    queryString += " WHERE " + condition;
    console.log(queryString)
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  allTrainers: function (tableInput, cb) { //trainers
    var queryString = "SELECT * FROM " + tableInput + " WHERE isTrainer = '1';";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  deleteClasses: function (table, condition, cb) {// delete classes
    var deleteString = "DELETE FROM " + table;
    deleteString += " WHERE ";
    deleteString += condition;
    console.log(deleteString);
    connection.query(deleteString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
}
module.exports = orm;