# Notable Backend Integrations Assessment

## Installation 
Fork / Clone repo

```
npm install
npm start
```
Install dependencies and start server.
Recommended to use [Postman](https://www.postman.com/) to test endpoints

## Endpoints
GET:
- /doctors -  Gets a list of all doctors

POST: 
- /doctors - Frontend sends doctorid (int) and date(YYYY-MM-DD format) - Gets all appointments for particular doctor on date
- /appointments - Frontend sends doctorid (int), firstname (string), lastname (string), date(YYYY-MM-DD), time(string: 1:00PM, 11:00AM, etc...), type (string) - Adds a new appointment to the doctor's calendar, 15 min intervals, no more than 3 for same date & time

DELETE:
- /doctors - Frontend sends appointment id (int) - Deletes existing appointment

### Technologies 
- Node.js
- Express.js
- SQL (Postgres)

