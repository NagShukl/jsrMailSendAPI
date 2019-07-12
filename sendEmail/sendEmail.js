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
        //this.JSRSendGridMail();
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
    JSRSendGridMail() {
       
    }
    JSRSendMail(mailData) {
       
        
    }
}


module.exports = new SendEmail();