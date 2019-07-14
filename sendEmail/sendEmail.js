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
            const testData = require('../test/testData');
            const mailData = this.getRequestBody(reqData);//JSON.stringify(testData));
            if (!mailData.isValid) {
                utils.log(`handleSendMailRequest: request body verification failed!`);
                const err = {
                    errCode: '001',
                    errMessage: '' + mailData.data
                }
                this.sendError(res, { httpError: constants.HTTP_BAD_REQUEST, appError: err });
                return;
            }
            // Is a valid request, try to send
            this.performMailSendAction(res, mailData.data);
        });
    }
    performMailSendAction(res, mailData, providerNumber) {
        utils.log(`\n**********************************************************\n`);
        if (!providerNumber) {
            providerNumber = 0;
        }
        // Check If application has tried all provider then return.
        res.writeHead(200, constants.API_RESPONSE_CONTENT_TYPE);
        if (providerNumber >= providers.length) {
            utils.log('performMailSendAction: Already tried with all configured providers. Unable to send Mail!');
            res.write(JSON.stringify(constants.API_ERROR_RESPONSE));
            res.end();
            return false;
        }
        // Select the email provider
        const selectedProvider = providers[providerNumber].providerObject;
        const selectedProviderName = providers[providerNumber].name;
        utils.log(`performMailSendAction: Trying to send Mail with provider#${providerNumber} of ${providers.length}, name=${selectedProviderName}`);

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
        let err = [];
        const res = {};

        try {
            const mailData = JSON.parse(data);
            let isValid = this.validateForNonBlankProperty(mailData, 'subject');
            if (!isValid) {
                err.push('Should have Subject');
            }
            isValid = this.validateForNonBlankProperty(mailData, 'text');
            if (!isValid) {
                err.push('Should have text');
            }
            err = this.validateFields(mailData, err);
            if (err.length === 0) {
                res.isValid = true;
                res.data = mailData;

            } else {
                res.isValid = false;
                res.data = err;
            }
        } catch (err) {
            res.isValid = false;
            res.data = ['Invalid JSON!'];
        }
        return res;
    }
    validateFields(mailData, err) {
        const allEmailIds = [];
        const fromError = this.validateFromField(mailData);
        err = fromError.length > 0 ? [...err, fromError] : err;
        const toError = this.validateToField(mailData, allEmailIds);
        err = toError.length > 0 ? [...err, toError] : err;
        if (mailData.cc) {
            const ccError = this.validateCCBCCField(mailData, 'cc', allEmailIds);
            err = ccError.length > 0 ? [...err, ccError] : err;
        }
        if (mailData.bcc) {
            const bccError = this.validateCCBCCField(mailData, 'bcc', allEmailIds);
            err = bccError.length > 0 ? [...err, bccError] : err;
        }

        // finally validate for unique emailIds.
        const duplicateError = this.validateUniqueEmails(allEmailIds);
        err = duplicateError.length > 0 ? [...err, duplicateError] : err;
        return err;
    }
    validateUniqueEmails(allEmailIds) {
        const err = [];
        var duplicates = allEmailIds.reduce(function (acc, el, i, arr) {
            if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
        }, []);
        if (duplicates.length != 0) {
            err.push(duplicates + ' Ids are duplicate in to, cc or bcc list.');
        }
        return err;
    }
    validateCCBCCField(mailData, propertyName, allEmailIds) {
        const err = [];
        const toList = mailData[propertyName];
        toList.forEach(ele => {
            allEmailIds.push(ele.email);
            if (!this.isValidEmail(ele.email)) {
                err.push(ele.email + ' is an Invalid email in ' + propertyName + ' list.');
            }
        });
        return err;
    }
    validateToField(mailData, allEmailIds) {
        const err = [];
        if (!mailData.to) {
            err.push('Should have "to" field.');
        } else {
            const toList = mailData.to;
            toList.forEach(ele => {
                allEmailIds.push(ele.email);
                if (!this.isValidEmail(ele.email)) {
                    err.push(ele.email + ' is an Invalid email in "to" field!');
                }
            });
        }
        return err;
    }
    validateFromField(mailData) {
        const err = [];
        if (!mailData.from) {
            err.push('Should have from field.');
        } else {
            const from = mailData.from.email;
            if (!this.isValidEmail(from)) {
                err.push('Should have valid email in from field.');
            }
        }
        return err;
    }
    isValidEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    }
    validateForNonBlankProperty(mailData, propertyName) {
        return (mailData[propertyName] && mailData[propertyName] !== '');
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
        res.writeHead(err.httpError.statusCode, { "Content-Type": "application/json" });
        res.write(JSON.stringify(err.appError));
        res.end();
    }
}

module.exports = new SendEmail();