// class providers {
//     proovidersList() {return [
//         {
//             name: 'provider 1',
//             providerObject: new mailGunProvider_fail(),//sendGridProvider(),
//             successCode: 200
//         },
//         {
//             name: 'provider 2',
//             providerObject: new mailGunProvider(),//sendGridProvider(),
//             successCode: 200
//         },
//         {
//             name: 'provider 3',
//             providerObject: new mailGunProvider_fail(),
//             successCode: 200
//         }
//     ];
// }
// }

class sendGridProvider {
    constructor() {

    }
    sendMail(mailData) {
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
class mailGunProvider_fail {
    constructor() {

    }
    sendMail(mailData) {
        console.log('SendMail of provider TWO is called with ' + mailData);
        var qs = require("querystring");
        var http = require("https");
        var authenticationHeader = "Basic " + new Buffer("api:key-f5d4a714492b3b791d9515691efd4eb9").toString("base64");
        //console.log('authenticationHeader = '+authenticationHeader);
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
        var returnPromise = new Promise((resolve, reject) => {
            var req = http.request(options, function (res) {
                var chunks = [];
                console.log('MailGun response STATUS: ' + res.statusCode);
                if (res.statusCode === 200) {
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

            console.log(qs.stringify(mailData));
            console.log(JSON.stringify(mailData));
            req.write(qs.stringify(mailData));
            req.end();
        });

        return returnPromise;
    }
}
class mailGunProvider {
    constructor() {

    }
    sendMail(mailData) {
        console.log('SendMail of provider TWO is called with ' + mailData);
        var qs = require("querystring");
        var http = require("https");
        var authenticationHeader = "Basic " + new Buffer("api:key-f5d4a714492b3b791d9515691efd4eb9").toString("base64");
        //console.log('authenticationHeader = '+authenticationHeader);
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
        var returnPromise = new Promise((resolve, reject) => {
            var req = http.request(options, function (res) {
                var chunks = [];
                console.log('MailGun response STATUS: ' + res.statusCode);
                if (res.statusCode === 200) {
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

            console.log(qs.stringify(mailData));
            console.log(JSON.stringify(mailData));
            req.write(qs.stringify(mailData));
            req.end();
        });

        return returnPromise;
    }
}

module.exports = [
    {
        name: 'provider 1',
        providerObject: new mailGunProvider_fail(),//sendGridProvider(),
        successCode: 200
    },
    {
        name: 'provider 2',
        providerObject: new sendGridProvider(),//mailGunProvider(),//
        successCode: 200
    },
    {
        name: 'provider 3',
        providerObject: new mailGunProvider_fail(),
        successCode: 200
    }
];
