const utils = require('../../utils/utils');
class SendGridProvider {
    constructor() {
        this.init();
    }
    init() {
        this.config = require('../../config/SendGridConfig');
    }
    sendMail(mailData) {
        utils.log('sendMail: SendGrid service is trying to send mail.');
        const http = require("https");

        const returnPromise = new Promise((resolve, reject) => {
            const req = http.request(this.getOptions(), function (res) {

                if (res.statusCode === 200 || res.statusCode === 202) {
                    resolve('success');
                } else
                    reject('failure');
                const chunks = [];
                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function () {
                    utils.log(`sendMail: SendGrid response code: ${res.statusCode} message: ${Buffer.concat(chunks)}`);
                });
            });
            req.write(this.getRequestBoday(mailData));
            req.end();
        });
        return returnPromise;
    }
    getRequestBoday(mailData) {
        const res = {};
        res.personalizations = [
            {
                to: mailData.to,
                cc: mailData.cc,
                bcc: mailData.bcc
            }
        ];
        res.from = mailData.from;
        res.subject = mailData.subject;
        res.content = [
            {
                type: 'text/plain',
                value: mailData.text
            }
        ];
        res.reply_to = { email: 'nagendra.shukla@gmail.com', name: 'Nagendra Shukla' };
        res.template_id ='d-8096b5dacb254c8b882816f22d1d11fe';
        return JSON.stringify(res);
    }
    getOptions() {
        return {
            "method": "POST",
            "hostname": this.config.hostname,
            "port": null,
            "path": "/v3/mail/send",
            "headers": {
                "content-type": "application/json",
                "authorization": `Bearer ${this.config.key}`,
                "cache-control": "no-cache"
            }
        };
    }
}

module.exports = new SendGridProvider();