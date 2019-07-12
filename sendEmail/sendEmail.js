const utils = require('../utils/utils');
const constants = require('../constants/constants');
const providers = require('../emailProviders/providers');

class SendEmail {

    handleSendMailRequest(req, res) {
        utils.log(`handleSendMailRequest: verifying request headers.`);
        const isError = this.verifyRequestHeaders(req)
        if (isError) {
            this.sendError(res, isError);
            utils.log(`handleSendMailRequest: request header verification failed!`);
            return;
        }
        req.on('data', (reqData) => {
            utils.log(`handleSendMailRequest: verifying request body.`);
            const mailData = this.getRequestBody(reqData);
            if (!mailData) {
                utils.log(`handleSendMailRequest: request body verification failed!`);
                this.sendError(res, { httpError: constants.HTTP_BAD_REQUEST, appError: constants.APPLICATION_BAD_REQUEST });
                return;
            }
            // Is a valid request, try to send
            this.performMailSendAction(res, mailData);
        });
    }
    performMailSendAction(res, mailData, providerNumber) {
        utils.log(`\n\n`);
        if(!providerNumber) {
            providerNumber = 0;
        }
        // Check If application has tried all provider then return.
        res.writeHead(200, constants.API_RESPONSE_CONTENT_TYPE);
        if(providerNumber >= providers.length) {
            utils.log('performMailSendAction: Already tried with all configured providers. Unable to send Mail!');
            res.write(JSON.stringify(constants.API_ERROR_RESPONSE));
            res.end();
            return false;
        }
        // Select the email provider
        const selectedProvider = providers[providerNumber].providerObject;
        const selectedProviderName = providers[providerNumber].name;
        utils.log(`performMailSendAction: Trying to send Mail with provider#${providerNumber} of ${providers.length}, name=${selectedProviderName}`);
        // mailData = {
        //     from: 'nagendra.shukla@gmail.com',
        //     to: 'nagendra.shukla@gmail.com',
        //     subject: '111122233',
        //     text: '123213131312312312313'
        // };
        selectedProvider.sendMail(mailData).then(data => {
            // Means one of provider, sent mail successfully.
            utils.log(`performMailSendAction: mail sent sucessfully using provider# ${providerNumber}, ${selectedProviderName}`);
            
            res.write(JSON.stringify(constants.API_SUCCESS_RESPONSE));
            res.end();
            return true;
        }).catch(err => {
            utils.log(`performMailSendAction: failed to send mail using provider# ${providerNumber}, ${selectedProviderName} due to err= ${err}`);
            this.performMailSendAction(res, mailData, ++providerNumber);
        });
    }
    getRequestBody(data) {
        try {
            return JSON.parse(data);
        } catch (err) {
            return false;
        }
    }
    verifyRequestHeaders(req) {
        /**
         * Here we can verify all required Or unwanted headers.
         * user Authentication, Authorization and API throtalling can be implemented here!
         */
        let isError = false;
        isError = this.validateContentType(req);
        if (!isError) {
            isError = this.validateContentLength(req);
        }
        return isError;
    }
    validateContentLength(req) {
        if (req.headers[constants.CONTENT_LENGTH] !== '0') {
            return false;
        }
        return { httpError: constants.HTTP_BAD_REQUEST, appError: constants.APPLICATION_BAD_REQUEST };
    }
    validateContentType(req) {
        if (req.headers[constants.CONTENT_TYPE] === constants.SUPPORTED_CONTENT_TYPE) {
            return false;
        }
        return { httpError: constants.HTTP_BAD_REQUEST, appError: constants.APPLICATION_BAD_REQUEST };
    }
    sendError(res, err) {
        res.writeHead(err.httpError.statusCode, err.appError.statusMessage);
        res.write(JSON.stringify(err.appError));
        res.end();
    }
}

module.exports = new SendEmail();