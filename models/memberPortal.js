var orm = require("../config/orm");
var member = {

    createMember: function(cols,vals, cb) {
        console.log("memberportal")
        orm.create("membersTable", cols, vals, function(res) {
            cb(res);
        });
    },

    viewMember: function(condition, cb) {
        console.log("memberportal")
        orm.selectOne("membersTable", condition, function(res) {
            cb(res);
        });
    },

    updateMember: function(colVals, condition, cb) {
        console.log("UpdateSTEP2");
        console.log(colVals);
        orm.update("membersTable", colVals, condition, function(res) {
            cb(res);
        });
    }
    
};
module.exports = member;