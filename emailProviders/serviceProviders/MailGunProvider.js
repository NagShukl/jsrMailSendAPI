const utils = require('../../utils/utils');
class MailGunProvider {
    constructor() {
        this.init();
    }
    init() {
        this.config = require('../../config/MailGunConfig');
        this.path = `/v3/${this.config.domain}/messages`
    }
    sendMail(mailData) {
        utils.log('sendMail: MailGun service is trying to send mail.');
        const qs = require("querystring");
        const http = require("https");
        
        const returnPromise = new Promise((resolve, reject) => {
            const req = http.request(this.getOptions(), function (res) {
                if (res.statusCode === 200) {
                    resolve('success');
                } else
                    reject('failure');
                const chunks = [];
                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });
                res.on("end", function () {
                    utils.log(`sendMail: MailGun response code: ${res.statusCode} message: ${Buffer.concat(chunks)}`);
                });
            });
            req.write(qs.stringify(this.getRequestBoday(mailData)));
            req.end();
        });

        return returnPromise;
    }
    getRequestBoday(mailData) {
        const res = {};
        if(mailData.from) {
            res.from = mailData.from.name+' <'+mailData.from.email+'>';
        }
        if(mailData.to) {
            res.to = mailData.to.map(ele => {
                return ele.name+' <'+ele.email+'>';
            }).join();
        }
        if(mailData.cc) {
            res.cc = mailData.cc.map(ele => {
                return ele.name+' <'+ele.email+'>';
            }).join();
        }
        if(mailData.bcc) {
            res.bcc = mailData.bcc.map(ele => {
                return ele.name+' <'+ele.email+'>';
            }).join();
        }
        if(mailData.subject) {
            res.subject = mailData.subject;
        }
        if(mailData.text) {
            res.text = mailData.text;
        }
        return res;
    }
    getOptions() {
        const authenticationHeader = "Basic " + new Buffer(this.config.user+':'+this.config.key).toString("base64");
        return {
            "method": "POST",
            "hostname": this.config.hostname,
            "port": null,
            "path": this.path,
            "headers": {
                "authorization": authenticationHeader,
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache"
            }
        };
    }
}
module.exports = new MailGunProvider();