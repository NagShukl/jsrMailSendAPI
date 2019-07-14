
-- This project is build on Node v 10.15.3

-- There no external dependance required for this package. one can simple unzip or clone and then execute
-- npm start command to launch email sender api on port 3000
-- this commands runs on development mode, so all the console logs should be visible on console.

-- Execute $> npm install command to grab the dev-dependance required for unit testing.
-- To Execute unit test use
-- $> npm test

-- Below is the valid JSON - can be used to test api from postman.
{"from":{"name":"nagendra","email":"nagendra.shukla@gmail.com"},"to":[{"name":"nagendra","email":"nagendra.shukla@gmail.com"},{"name":"nagshukl","email":"nagshukl2@gmail.com"}],"cc":[{"name":"nagendra","email":"nagendra.shukla13@gmail.com"},{"name":"nagshukl","email":"nagshukl14@gmail.com"}],"bcc":[{"name":"nagendra","email":"nagendra.shukla2@gmail.com"},{"name":"nagshukl","email":"nagshukl26@gmail.com"}],"subject":"Subject form mail","text":"Text for email"}

-- Here is the Invalid JSON
{"from":{"name":"nagendra","email":"nagendra.shukla"},"to":[{"name":"nagendra","email":"nagendra.shukla@gmail.com"},{"name":"nagshukl","email":"nagshukl.gmail.com"}],"cc":[{"name":"nagendra","email":"nagendra.shukla1gmail.com"},{"name":"nagshukl","email":"nagshukl1@gmail.com"}],"bcc":[{"name":"nagendra","email":"nagendra.shukla@gmail.com"},{"name":"nagshukl","email":"nagshukl2gmail.com"}],"subject":"Subject form mail","text":"Text for email"}

-- produces error response as below.
{"errCode":"001","errMessage":"Should have valid email in from field.,nagshukl.gmail.com is an Invalid email 
in \"to\" field!,nagendra.shukla1gmail.com is an Invalid email in cc list.,nagshukl2gmail.com is an Invalid 
email in bcc list.,nagendra.shukla@gmail.com Ids are duplicate in to, cc or bcc list."}
