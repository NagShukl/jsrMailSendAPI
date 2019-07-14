module.exports = {
     CONTENT_TYPE: 'content-type',
     CONTENT_LENGTH: 'content-length',
     SUPPORTED_CONTENT_TYPE: 'application/json',
     HTTP_BAD_REQUEST: {
        statusCode: '400',
        statusMessage: 'Bad Request!'
    },
     APPLICATION_BAD_REQUEST: {
        errCode: '001',
        errMessage: 'Invalid Request!'
    },
    API_RESPONSE_CONTENT_TYPE: {
        'Content-Type': 'application/json'
    },
    API_SUCCESS_RESPONSE: {
        'api_status_code': 0,
        'api_status_msg': 'Mail Sent Successfully!'
    },
    API_ERROR_RESPONSE: {
        'api_status_code': 1,
        'api_status_msg': 'Something went wrong, Unable to send mail!'
    }
};
// exports: AppConstants,