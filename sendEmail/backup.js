const utils = require('../utils/utils');
const CONTENT_TYPE = 'content-type';
const CONTENT_LENGTH = 'content-length';
const SUPPORTED_CONTENT_TYPE = 'application/json';
const HTTP_BAD_REQUEST = { 
    statusCode: '404', 
    statusMessage: 'Bad Request!'
}
const APPLICATION_BAD_REQUEST = {
    errCode: '001',
    errMessage: 'Invalid Request!'
}

class SendEmail {
    constructor() {
        console.log("SendEmail : constructor called.")
    }
    handleSendMailRequest(req, res) {
        const isError = this.verifyRequestHeaders(req)
        if(isError) {
            this.sendError(res, isError);
            return;
        }
        console.log('content length='+req.headers['content-length']);
        res.writeHead(200, {'Content-Type': 'text/html'});
        let xx = 'aaaa';
        req.on('data', (reqData) => {
            console.log('Request Data = '+reqData);
            const data = this.getRequestBody(reqData);
            if(!data) {
                this.sendError(res, {httpError: HTTP_BAD_REQUEST, appError: APPLICATION_BAD_REQUEST});
                return;
            }
            this.performMailSendAction();
            res.write(xx+'Jai Shri Ram!'+req.method + ' : '+req.url+ ' : '+req.headers['jsr']);
            res.end();
          });
          return;
        
    }
    performMailSendAction() {
        console.log('From here lets send mail');
        // var request = require('request');
        this.JSRSendMail();
        //=== below is generated from curl 
// var options = {
//     url: '	https://api.mailgun.net/v3/sandbox4f97468e1cd94d71a6e4b0ed0f83daac.mailgun.org/messages',
//     auth: {
//         'user': 'api',
//         'pass': 'dc2ecf46faa0c71c202994d93c1612cc-afab6073-5b41e7ee'
//     }
// };

// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     }
//     console.log('>>>>> '+body);
// }
// try{
//     const https = require('https');
//     console.log('>>>>> 11111');
//     https.request(options, callback);
//     console.log('>>>>> 112222222');
// }catch(ee) {
//     console.log('<<<<< '+ee);
// }

//******** */
        const mailgun = require("mailgun-js");
        // https://api.mailgun.net/v3//sandbox4f97468e1cd94d71a6e4b0ed0f83daac.mailgun.org/messages
        // USE dc2ecf46faa0c71c202994d93c1612cc-afab6073-5b41e7ee as api key
        // https://api.mailgun.net/v3/
        //=====below is working code======
        // const DOMAIN = 'sandbox4f97468e1cd94d71a6e4b0ed0f83daac.mailgun.org';
        // const mg = mailgun({apiKey: 'dc2ecf46faa0c71c202994d93c1612cc-afab6073-5b41e7ee', domain: 'sandbox4f97468e1cd94d71a6e4b0ed0f83daac.mailgun.org'});
        // const data = {
        //     from: 'Nagendra <nagendra.shukla@gmail.com>',
        //     to: 'nagendra.shukla@gmail.com',
        //     subject: 'Hello 1',
        //     text: 'Testing some Mailgun awesomness!'
        // };
        // mg.messages().send(data, function (error, body) {
        //     console.log(body);
        //     console.log(error);
        // });
    }
    getRequestBody(data) {
        try {
            return JSON.parse(data);
        }catch(err) {
            return false;
        }
    }
    verifyRequestHeaders(req) {
        console.log(req.headers[CONTENT_LENGTH]);
        console.log(req.headers[CONTENT_TYPE]);
        // 1. verify for request content type
        let isError = false;
        isError = this.validateContentType(req);  
        if(!isError) {
            isError = this.validateContentLength(req);
        }
        return isError;      
    }
    validateContentLength (req) {
        // console.log(res);
        if(req.headers[CONTENT_LENGTH] !== '0') {
            return false;
        }        
        return {httpError: HTTP_BAD_REQUEST, appError: APPLICATION_BAD_REQUEST};
        // return res;
    }
    validateContentType (req) {
        if(req.headers[CONTENT_TYPE] === SUPPORTED_CONTENT_TYPE) {
            return false;
        }
        return {httpError: HTTP_BAD_REQUEST, appError: APPLICATION_BAD_REQUEST};
        // return req.headers[CONTENT_TYPE] ?  ? true:false : false;
    }
    sendError(res, err) {
        res.writeHead(err.httpError.statusCode, err.appError.statusMessage);
        res.write(JSON.stringify(err.appError));
        res.end();
    }
    JSRSendMail() {
    var qs = require("querystring");
var http = require("https");
var authenticationHeader = "Basic " + new Buffer("api:dc2ecf46faa0c71c202994d93c1612cc-afab6073-5b41e7ee").toString("base64");
var options = {
  "method": "POST",
  "hostname": "api.mailgun.net",
  "port": null,
  "path": "/v3/sandbox4f97468e1cd94d71a6e4b0ed0f83daac.mailgun.org/messages",
  "headers": {
    "authorization": authenticationHeader,//"Basic YXBpOmRjMmVjZjQ2ZmFhMGM3MWMyMDI5OTRkOTNjMTYxMmNjLWFmYWI2MDczLTViNDFlN2Vl",
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});
const data = { from: 'nagendra.shukla@gmail.com',
to: 'nagendra.shukla@gmail.com',
subject: '111122233',
text: '123213131312312312313' };
console.log(qs.stringify(data));
console.log(JSON.stringify(data));
req.write(qs.stringify(data));
req.end();
}
    JSRSendMail_() {
        // https://api.mailgun.net/v3//sandbox4f97468e1cd94d71a6e4b0ed0f83daac.mailgun.org/messages
        // USE dc2ecf46faa0c71c202994d93c1612cc-afab6073-5b41e7ee as api key
        // https://api.mailgun.net/v3/
        //=====below is working code======
        // const DOMAIN = 'sandbox4f97468e1cd94d71a6e4b0ed0f83daac.mailgun.org';
        // const mg = mailgun({apiKey: 'dc2ecf46faa0c71c202994d93c1612cc-afab6073-5b41e7ee', domain: 'sandbox4f97468e1cd94d71a6e4b0ed0f83daac.mailgun.org'});
        // 
        var https = require('https');
        // const data1 = {
        //     from: 'Nagendra <nagendra.shukla@gmail.com>',
        //     to: 'nagendra.shukla@gmail.com',
        //     subject: 'Hello 1',
        //     text: 'Testing some Mailgun awesomness!'
        // };
        const data1 = {};
        data1.from = 'Nagendra <nagendra.shukla@gmail.com>';
        data1.to= 'nagendra.shukla@gmail.com';
        data1.subject= 'Hello 1';
        data1.text= 'Testing some Mailgun awesomness!'
        const post_data = JSON.stringify(data1);
        var authenticationHeader = "Basic " + new Buffer("api:dc2ecf46faa0c71c202994d93c1612cc-afab6073-5b41e7ee").toString("base64");
        var options = {
            host: 'api.mailgun.net',
            port: 443,
            path: '/v3/sandbox4f97468e1cd94d71a6e4b0ed0f83daac.mailgun.org/messages',
            method: 'POST',
            body: post_data,
            // user: authenticationHeader,
            // auth: {
            //     user: 'api',
            //     password: 'dc2ecf46faa0c71c202994d93c1612cc-afab6073-5b41e7ee'
            // },
            headers: {
            //     apiKey: 'dc2ecf46faa0c71c202994d93c1612cc-afab6073-5b41e7ee',
            // domain: 'sandbox4f97468e1cd94d71a6e4b0ed0f83daac.mailgun.org',
            'Authorization' : authenticationHeader,
            // user: authenticationHeader
            //"apiKey:dc2ecf46faa0c71c202994d93c1612cc-afab6073-5b41e7ee"
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(post_data)
              }
            
          };
          var req = https.request(options, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
              console.log('BODY: ' + chunk);
            });
          });
          
          req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
          });
          
          // write data to request body
          console.log(post_data);
          req.write(post_data);
        //   req.write('data\n');
          req.end();
    }
}


module.exports = new SendEmail();