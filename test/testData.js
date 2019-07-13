const validData = {
    from: {
            name:'nagendra',
            email: 'nagendra.shukla@gmail.com'
        },
    to: [
        {
            name:'nagendra',
            email: 'nagendra.shukla@gmail.com'
        },
        {
            name:'nagshukl',
            email: 'nagshukl2@gmail.com'
        }
    ],
    cc: [
        {
            name:'nagendra',
            email: 'nagendra.shukla13@gmail.com'
        },
        {
            name:'nagshukl',
            email: 'nagshukl14@gmail.com'
        }
    ],
    bcc: [
        {
            name:'nagendra',
            email: 'nagendra.shukla2@gmail.com'
        },
        {
            name:'nagshukl',
            email: 'nagshukl26@gmail.com'
        }
    ],
    subject: '111122233',
    text: '123213131312312312313'
};
const invalidData = {
        from: {
                name:'nagendra',
                email: 'nagendra.shukla'
            },
        to: [
            {
                name:'nagendra',
                email: 'nagendra.shukla@gmail.com'
            },
            {
                name:'nagshukl',
                email: 'nagshukl.gmail.com'
            }
        ],
        cc: [
            {
                name:'nagendra',
                email: 'nagendra.shukla1gmail.com'
            },
            {
                name:'nagshukl',
                email: 'nagshukl1@gmail.com'
            }
        ],
        bcc: [
            {
                name:'nagendra',
                email: 'nagendra.shukla@gmail.com'
            },
            {
                name:'nagshukl',
                email: 'nagshukl2gmail.com'
            }
        ],
        subject: '111122233',
        text: '123213131312312312313'
    };
module.exports = invalidData;

    