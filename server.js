const http = require('http');
const utils = require('./utils/utils');
const emailSender = require('./sendEmail/sendEmail');
// import {emailSender as emailSender} from './sendEmail/sendEmail';

const API_ROUTE = '/sendmail';
const PORT = 3000;
const server = http.createServer();

server.on('request', (req, res) => performRequest(req, res));
server.listen(PORT);
utils.log('**JSR Server listening on port '+PORT);



const performRequest = (req, res) => {
    if(req.method === 'POST') {
       return handlePostRequest(req, res);
    }
    sendError(res, 'Unsupported HTTP method!', 404);
}
const handlePostRequest = (req, res) => {
    if(req.url === API_ROUTE) {
        return emailSender.handleSendMailRequest(req, res);
     }
    sendError(res, 'Unknown route, requested'+req.url, 404);
}
const sendError = (res, errMsg, errCode) => {
    utils.log('SendError : '+errMsg);
    res.writeHead(505, {'Content-Type': 'text/html'});
    res.write(errMsg);
    res.end();
}

/**
 * 
Hi Nagendra Shukla,

A new API key was created on your account:

Key ID: afab6073-5b41e7ee 
Description: API Key 
If you or one of your users did not create this API key, please contact

====
sandbox4f97468e1cd94d71a6e4b0ed0f83daac.mailgun.org
 */
