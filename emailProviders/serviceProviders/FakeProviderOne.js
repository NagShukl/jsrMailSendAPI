const utils = require('../../utils/utils');
class FakeProviderOne {
    constructor() {

    }
    sendMail(mailData) {
        utils.log('FakeProviderOne is trying to send mail.');

        var returnPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('failure');
            }, 2000);

        });

        return returnPromise;
    }
}
module.exports = new FakeProviderOne();