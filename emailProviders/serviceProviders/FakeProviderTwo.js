const utils = require('../../utils/utils');
class FakeProviderTwo {
    constructor() {

    }
    sendMail(mailData) {
        utils.log('FakeProviderTwo is trying to send mail.');
        
        var returnPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('failure');
            }, 2000);
            
        });

        return returnPromise;
    }
}
module.exports = new FakeProviderTwo();