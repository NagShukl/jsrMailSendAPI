const validData = {
    from: {
        name: 'nagendra',
        email: 'nagendra.shukla@gmail.com'
    },
    to: [
        {
            name: 'nagendra',
            email: 'nagendra.shukla@gmail.com'
        },
        {
            name: 'nagshukl',
            email: 'nagshukl2@gmail.com'
        }
    ],
    cc: [
        {
            name: 'nagendra',
            email: 'nagendra.shukla13@gmail.com'
        },
        {
            name: 'nagshukl',
            email: 'nagshukl14@gmail.com'
        }
    ],
    bcc: [
        {
            name: 'nagendra',
            email: 'nagendra.shukla2@gmail.com'
        },
        {
            name: 'nagshukl',
            email: 'nagshukl26@gmail.com'
        }
    ],
    subject: '111122233',
    text: '123213131312312312313'
};
const invalidData = {
    from: {
        name: 'nagendra',
        email: 'nagendra.shukla'
    },
    to: [
        {
            name: 'nagendra',
            email: 'nagendra.shukla@gmail.com'
        },
        {
            name: 'nagshukl',
            email: 'nagshukl.gmail.com'
        }
    ],
    cc: [
        {
            name: 'nagendra',
            email: 'nagendra.shukla1gmail.com'
        },
        {
            name: 'nagshukl',
            email: 'nagshukl1@gmail.com'
        }
    ],
    bcc: [
        {
            name: 'nagendra',
            email: 'nagendra.shukla@gmail.com'
        },
        {
            name: 'nagshukl',
            email: 'nagshukl2gmail.com'
        }
    ],
    subject: '111122233',
    text: '123213131312312312313'
};
const invalidEmail = 'nagendra.shukla.gmail.com';
const responses = {
    success: {
        "api_status_code": 0,
        "api_status_msg": "Mail Sent Successfully!"
    },
    invalidRequest: {
        "errCode": "001",
        "errMessage": "Invalid Request!"
    },
    noSubject: {
        "errCode": "001",
        "errMessage": "Should have Subject"
    },
    noContent: {
        "errCode": "001",
        "errMessage": "Should have text"
    },
    noFromField: {
        "errCode": "001",
        "errMessage": "Should have from field."
    },
    invalidEmailInFrom: {
        "errCode": "001",
        "errMessage": "Should have valid email in from field."
    },
    missingTo: {
        errCode: '001',
        errMessage: 'Should have \"to\" field.'
    },
    invalidEmailinTo: {
        errCode: '001',
        errMessage: `${invalidEmail} is an Invalid email in \"to\" field!`
    },
    invalidEmailinCC: {
        errCode: '001',
        errMessage: `${invalidEmail} is an Invalid email in cc list.`
    },
    invalidEmailinBcc: {
        errCode: '001',
        errMessage: `${invalidEmail} is an Invalid email in bcc list.`
    }
}
module.exports = { invalidData, validData, responses, invalidEmail };

