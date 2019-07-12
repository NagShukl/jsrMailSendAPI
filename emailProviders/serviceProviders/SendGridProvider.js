const utils = require('../../utils/utils');
class SendGridProvider {
    constructor() {
        this.init();
    }
    init() {
        this.config = require('../../config/MailGunConfig');
        this.path = `/v3/${this.config.domain}/messages`
    }
    sendMail(mailData) {
        utils.log('SendGrid service is trying to send mail.');
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
                "cache-control": "no-cache"
            }
        };
        var returnPromise = new Promise((resolve, reject) => {
        var req = http.request(options, function (res) {
            var chunks = [];
            console.log('STATUS: ' + res.statusCode);
            if (res.statusCode === 200 || res.statusCode === 202) {
                resolve('success');
            } else
                reject('failure');
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
    });
        return returnPromise;
    }
}

module.exports = new SendGridProvider();