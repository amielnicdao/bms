var orm = require("../config/orm");
var admin = {
    allAttedance: function (cb) {
        orm.allAttendance("checkInTable", function (res) {
            cb(res);
        });
    },

    allMembers: function (cb) {
        orm.allMembers("membersTable", function (res) {
            cb(res);
        });
    },
    addToSessions: function (cols, vals, cb) {
        console.log("add to sessions");
        orm.addToSessions("checkInTable", cols, vals, function (res) {
            cb(res);
        });
    },
    // MANAGEMENT SIDE
    deleteMember: function (condition, cb) {
        console.log("delete member");
        orm.deleteMember("membersTable", condition, function (res) {
            cb(res);
        });
    },
    allClasses: function (cb) {
        orm.allClasses("classesTable", function (res) {
            cb(res);
        });
    },
    createNewClass: function (cols, vals, cb) {
        console.log("add new class admin");
        orm.createNewClass("classesTable", cols, vals, function (res) {
            cb(res);
        });
    },
    updateClasses: function (cols, condition, cb) {
        console.log("admin update");
        orm.update("classesTable", cols, condition, function (res) {
            cb(res);
        });
    },
    allTrainers: function(cb) {
        orm.allTrainers("membersTable", function(res) {
            cb(res);
        });
    },
    deleteClasses: function(condition, cb) {
        console.log("delete class");
        orm.deleteClasses("classesTable", condition, function(res){
            cb(res);
        });
    }
};
module.exports = admin;