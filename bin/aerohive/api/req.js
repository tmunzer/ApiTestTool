var https = require('https');

/**
 * HTTP GET Request
 * @param {Object} xapi - API credentials
 * @param {String} xapi.vpcUrl - ACS server to request
 * @param {String} xapi.ownerId - ACS ownerId
 * @param {String} xapi.accessToken - ACS accessToken
 * @param {String} path - path to request the ACS endpoint
 * @param {Object} devAccount - information about the Aerohive developper account to user
 * @param {String} devAccount.clientId - Aerohive Developper Account clientId
 * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
 * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
 *  */
module.exports.GET = function (xapi, devAccount, path, callback) {
    var rejectUnauthorized = true;
    if (xapi.hasOwnProperty('rejectUnauthorized')) rejectUnauthorized = xapi.rejectUnauthorized;

    var options = {
        rejectUnauthorized: rejectUnauthorized,
        host: xapi.vpcUrl,
        port: 443,
        path: path,
        method: "GET",
        headers: {
            'X-AH-API-CLIENT-SECRET': devAccount.clientSecret,
            'X-AH-API-CLIENT-ID': devAccount.clientId,
            'X-AH-API-CLIENT-REDIRECT-URI': devAccount.redirectUrl,
            'Authorization': "Bearer " + xapi.accessToken
        }
    };
    httpRequest(options, callback);
};
/**
 * HTTP POST Request
 * @param {Object} xapi - API credentials
 * @param {String} xapi.vpcUrl - ACS server to request
 * @param {String} xapi.ownerId - ACS ownerId
 * @param {String} xapi.accessToken - ACS accessToken
 * @param {String} path - path to request the ACS endpoint
 * @param {Object} data - data to include to the POST Request
 * @param {Object} devAccount - information about the Aerohive developper account to user
 * @param {String} devAccount.clientId - Aerohive Developper Account clientId
 * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
 * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
 *  */
module.exports.POST = function (xapi, devAccount, path, data, callback) {
    var rejectUnauthorized = true;
    if (xapi.hasOwnProperty('rejectUnauthorized')) rejectUnauthorized = xapi.rejectUnauthorized;
    var options = {
        rejectUnauthorized: rejectUnauthorized,
        host: xapi.vpcUrl,
        port: 443,
        path: path,
        method: "POST",
        headers: {
            'X-AH-API-CLIENT-SECRET': devAccount.clientSecret,
            'X-AH-API-CLIENT-ID': devAccount.clientId,
            'X-AH-API-CLIENT-REDIRECT-URI': devAccount.redirectUrl,
            'Authorization': "Bearer " + xapi.accessToken,
            'Content-Type': 'application/json'
        }
    };
    var body = JSON.stringify(data);
    httpRequest(options, callback, body);
};

/**
 * HTTP PUT Request
 * @param {Object} xapi - API credentials
 * @param {String} xapi.vpcUrl - ACS server to request
 * @param {String} xapi.ownerId - ACS ownerId
 * @param {String} xapi.accessToken - ACS accessToken
 * @param {String} path - path to request the ACS endpoint
 * @param {Object} devAccount - information about the Aerohive developper account to user
 * @param {String} devAccount.clientId - Aerohive Developper Account clientId
 * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
 * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
 *  */
module.exports.PUT = function (xapi, devAccount, path, callback) {
    var rejectUnauthorized = true;
    if (xapi.hasOwnProperty('rejectUnauthorized')) rejectUnauthorized = xapi.rejectUnauthorized;
    var options = {
        rejectUnauthorized: rejectUnauthorized,
        host: xapi.vpcUrl,
        port: 443,
        path: path,
        method: "PUT",
        headers: {
            'X-AH-API-CLIENT-SECRET': devAccount.clientSecret,
            'X-AH-API-CLIENT-ID': devAccount.clientId,
            'X-AH-API-CLIENT-REDIRECT-URI': devAccount.redirectUrl,
            'Authorization': "Bearer " + xapi.accessToken,
            'Content-Type': 'application/json'
        }
    };
    httpRequest(options, callback);
};

/**
 * HTTP DELETE Request
 * @param {Object} xapi - API credentials
 * @param {String} xapi.vpcUrl - ACS server to request
 * @param {String} xapi.ownerId - ACS ownerId
 * @param {String} xapi.accessToken - ACS accessToken
 * @param {String} path - path to request the ACS endpoint
 * @param {Object} devAccount - information about the Aerohive developper account to user
 * @param {String} devAccount.clientId - Aerohive Developper Account clientId
 * @param {String} devAccount.clientSecret - Aerohive Developper Account secret
 * @param {String} devAccount.redirectUrl - Aerohive Developper Account redirectUrl
 *  */
module.exports.DELETE = function (xapi, devAccount, path, callback) {
    var rejectUnauthorized = true;
    if (xapi.hasOwnProperty('rejectUnauthorized')) rejectUnauthorized = xapi.rejectUnauthorized;
    var options = {
        rejectUnauthorized: rejectUnauthorized,
        host: xapi.vpcUrl,
        port: 443,
        path: path,
        method: "DELETE",
        headers: {
            'X-AH-API-CLIENT-SECRET': devAccount.clientSecret,
            'X-AH-API-CLIENT-ID': devAccount.clientId,
            'X-AH-API-CLIENT-REDIRECT-URI': devAccount.redirectUrl,
            'Authorization': "Bearer " + xapi.accessToken
        }
    };
    httpRequest(options, callback);
};

function httpRequest(options, callback, body) {
    var result = {};
    result.request = {};
    result.result = {};

        
    console.info(options);
    result.request.options = options;
    var req = https.request(options, function (res) {
        result.result.status = res.statusCode;
        console.info('STATUS: ' + result.result.status);
        result.result.headers = JSON.stringify(res.headers);
        console.info('HEADERS: ' + result.result.headers);
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            if (data != '') {
                var dataJSON = JSON.parse(data);
                result.data = dataJSON.data;
                result.error = dataJSON.error;
            }
            switch (result.result.status) {
                case 200:
                    result.request.options.headers['X-AH-API-CLIENT-SECRET'] = "anonymized-data";
                    callback(null, result.data, result.request);
                    break;
                default:
                    var error = {};
                    result.request.options.headers['X-AH-API-CLIENT-SECRET'] = "anonymized-data";
                    console.error(result);
                    if (result.error.hasOwnProperty('status')) error.status = result.error.status;
                    else error.status = result.result.status;
                    if (result.error.hasOwnProperty('message')) error.message = result.error.message;
                    else error.message = result.error;
                    if (result.error.hasOwnProperty('code')) error.code = result.error.code;
                    else error.code = "";
                    callback(error, result.data, result.request);
                    break;

            }
        });
    });
    req.on('error', function (err) {
        console.log(err);
        callback(err, null);
    });


    // write data to request body
    req.write(body + '\n');
    req.end();


}