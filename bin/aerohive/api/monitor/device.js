var api = require("./../req");

/**
 * Returns a list of devices
 * @param {Object} xapi - API credentials
 * @param {String} xapi.vpcUrl - ACS server to request
 * @param {String} xapi.ownerId - ACS ownerId
 * @param {String} xapi.accessToken - ACS accessToken
 * @param {Object} devAccount - information about the Aerohive developper account to user
 * @param {String} devAccount.clientID - Aerohive Developper Account ClientID
 * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
 * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
 *  */
module.exports.GET = function (xapi, devAccount, callback) {

    var path = '/xapi/v1/monitor/devices?ownerId=' + xapi.ownerId;

    // send the API request
    api.GET(xapi, devAccount, path,  callback);
};