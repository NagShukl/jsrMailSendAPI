-- below is the valid JSON - to be submitted from postman.
{"from":{"name":"nagendra","email":"nagendra.shukla@gmail.com"},"to":[{"name":"nagendra","email":"nagendra.shukla@gmail.com"},{"name":"nagshukl","email":"nagshukl2@gmail.com"}],"cc":[{"name":"nagendra","email":"nagendra.shukla13@gmail.com"},{"name":"nagshukl","email":"nagshukl14@gmail.com"}],"bcc":[{"name":"nagendra","email":"nagendra.shukla2@gmail.com"},{"name":"nagshukl","email":"nagshukl26@gmail.com"}],"subject":"111122233","text":"123213131312312312313"}

-- below is the Invalid JSON
{"from":{"name":"nagendra","email":"nagendra.shukla"},"to":[{"name":"nagendra","email":"nagendra.shukla@gmail.com"},{"name":"nagshukl","email":"nagshukl.gmail.com"}],"cc":[{"name":"nagendra","email":"nagendra.shukla1gmail.com"},{"name":"nagshukl","email":"nagshukl1@gmail.com"}],"bcc":[{"name":"nagendra","email":"nagendra.shukla@gmail.com"},{"name":"nagshukl","email":"nagshukl2gmail.com"}],"subject":"111122233","text":"123213131312312312313"}

If submitted from postman, must show error as
{"errCode":"001","errMessage":"Should have valid email in from field.,nagshukl.gmail.com is an Invalid email 
in \"to\" field!,nagendra.shukla1gmail.com is an Invalid email in cc list.,nagshukl2gmail.com is an Invalid 
email in bcc list.,nagendra.shukla@gmail.com Ids are duplicate in to, cc or bcc list."}