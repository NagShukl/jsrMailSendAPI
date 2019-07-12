const utils = require('../utils/utils');
const providers = require('./providers');
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
        if (isError) {
            this.sendError(res, isError);
            return;
        }
        console.log('content length=' + req.headers['content-length']);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        req.on('data', (reqData) => {
            console.log('Request Data = ' + reqData);
            const data = this.getRequestBody(reqData);
            if (!data) {
                this.sendError(res, { httpError: HTTP_BAD_REQUEST, appError: APPLICATION_BAD_REQUEST });
                return;
            }
            const mailData = {
                from: 'nagendra.shukla@gmail.com',
                to: 'nagendra.shukla@gmail.com',
                subject: '111122233',
                text: '123213131312312312313'
            };
            this.performMailSendAction(res, mailData);
           
        });
        return;

    }
    performMailSendAction(res, mailData, providerNumber) {
        
        if(!providerNumber) {
            providerNumber = 0;
        }
        const mailProviders = providers;//.proovidersList();
        console.log('**JSR total configured Mail Providers = '+mailProviders.length);
        // Check If application has tried all provider then return.
        if(providerNumber >= mailProviders.length) {
            console.log('Already tried all available provider, Mail send failure');
            // return from Here!!
            res.write("Unable to process mail!" + 'Jai Shri Ram! Tried all configured providers.');
            res.end();
            return "Unable to process mail!";
        }

        const selectedProvider = mailProviders[providerNumber].providerObject;
        console.log('**JSR Trying to send Mail with provider = '+providerNumber+' : '+mailProviders[providerNumber].name);
        
        selectedProvider.sendMail(mailData).then(data => {
            // Means one of provider, sent mail successfully.
            console.log('JAI SHRI RAM!! '+data);
            res.write("Successfully sent mail" + 'Jai Shri Ram! using provider= '+mailProviders[providerNumber].name);
            res.end();
            return "Successfully sent mail";
        }).catch(err => {
            console.log('JAI SHRI RAM!! from error,... '+err);
            this.performMailSendAction(res, mailData, ++providerNumber);
        });
        console.log('========');
        // this.JSRSendGridMail();
    }
    getRequestBody(data) {
        try {
            return JSON.parse(data);
        } catch (err) {
            return false;
        }
    }
    verifyRequestHeaders(req) {
        console.log(req.headers[CONTENT_LENGTH]);
        console.log(req.headers[CONTENT_TYPE]);
        // 1. verify for request content type
        let isError = false;
        isError = this.validateContentType(req);
        if (!isError) {
            isError = this.validateContentLength(req);
        }
        return isError;
    }
    validateContentLength(req) {
        // console.log(res);
        if (req.headers[CONTENT_LENGTH] !== '0') {
            return false;
        }
        return { httpError: HTTP_BAD_REQUEST, appError: APPLICATION_BAD_REQUEST };
        // return res;
    }
    validateContentType(req) {
        if (req.headers[CONTENT_TYPE] === SUPPORTED_CONTENT_TYPE) {
            return false;
        }
        return { httpError: HTTP_BAD_REQUEST, appError: APPLICATION_BAD_REQUEST };
        // return req.headers[CONTENT_TYPE] ?  ? true:false : false;
    }
    sendError(res, err) {
        res.writeHead(err.httpError.statusCode, err.appError.statusMessage);
        res.write(JSON.stringify(err.appError));
        res.end();
    }
    JSRSendGridMail(mailData) {
        console.log('SendMail of provider ONE is called with ' + mailData);
        /**
        * //== 202 response but no mail
        * https://stackoverflow.com/questions/42214048/sendgrid-returns-202-but-doesnt-send-email
        * 
        * apikey = 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
        *  SENDGRID_API_KEY='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'"
        * =====
        * api key for curl
        * apikey = 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
        *  SENDGRID_API_KEY='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'
        * 
        * curl --request POST \
 --url https://api.sendgrid.com/v3/mail/send \
 --header "Authorization: Bearer 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" \
 --header 'Content-Type: application/json' \
 --data '{"personalizations": [{"to": [{"email": "nagendra.shukla@gmail.com"}]}],"from": {"email": "nagendra.shukla@gmail.com"},"subject": "Sending with SendGrid is Fun","content": [{"type": "text/plain", "value": "and easy to do anywhere, even with cURL"}]}'
        * 
        */
        var http = require("https");

        var options = {
            "method": "POST",
            "hostname": "api.sendgrid.com",
            "port": null,
            "path": "/v3/mail/send",
            "headers": {
                "content-type": "application/json",
                "authorization": "Bearer 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",
                "cache-control": "no-cache",
                "postman-token": "bac5d190-8f9d-4d0f-f7d3-4dba344ed428"
            }
        };

        var req = http.request(options, function (res) {
            var chunks = [];
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });
        console.log('Sending send Grid ,......');
        req.write(JSON.stringify({
            personalizations:
                [{
                    to: [{ email: 'nagendra.shukla@gmail.com', name: 'Nagendra Shukla' }],
                    dynamic_template_data: { verb: '', adjective: '', noun: '', currentDayofWeek: '' },
                    subject: 'Hello, World! Jai Shri Ram!'
                }],
            from: { email: 'nagendra.shukla@gmail.com', name: 'Nagendra Shukla' },
            reply_to: { email: 'nagendra.shukla@gmail.com', name: 'Nagendra Shukla' },
            template_id: 'd-8096b5dacb254c8b882816f22d1d11fe'
        }));
        req.end();
        return 200;
       
    }
    JSRSendMail(mailData) {
       
        
    }
}


module.exports = new SendEmail();