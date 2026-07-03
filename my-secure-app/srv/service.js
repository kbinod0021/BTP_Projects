const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {

    this.on('getUserInfo', (req) => {

        return {
            username: req.user.id,
            email: req.user.attr?.email,
            roles: req.user.roles
        };

    });

});
