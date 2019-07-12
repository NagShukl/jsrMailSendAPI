const sendGridProvider = require('./serviceProviders/SendGridProvider');
const mailGunProvider = require('./serviceProviders/MailGunProvider');
const fakeProviderOne = require('./serviceProviders/FakeProviderOne');
const fakeProviderTwo = require('./serviceProviders/FakeProviderTwo');

module.exports = [
    {
        name: 'Fake Provider 1',
        providerObject: fakeProviderOne,
        description: 'This is just a fake provider, It fails in 2 sec.'
    },
    {
        name: 'Fake Provider 2',
        providerObject: fakeProviderTwo,
        description: 'This is just a fake provider, It fails in 2 sec.'
    },
    {
        name: 'MailGun service provider',
        providerObject: mailGunProvider,
        description: 'MailGun service provider to send mail.'
    },
    {
        name: 'SendGrid service provider',
        providerObject: sendGridProvider,
        description: 'SendGrid service provider to send mail.'
    }
];
