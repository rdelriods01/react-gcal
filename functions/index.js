const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar('v3');
const functions = require('firebase-functions');

const credentials = require('./credentials.json');

const TIME_ZONE = 'America/Mexico_City';

const oAuth2Client = new OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
);

const calendarId = credentials.calid

// CREATE EVENT
exports.addEventToCalendar = functions.https.onCall((data) => {
    const event = {
        eventName: data.eventName,
        startTime: data.startTime,
        endTime: data.endTime
    };

    oAuth2Client.setCredentials({
        refresh_token: credentials.refresh_token
    });

    const create = new Promise(((resolve, reject) => {
        calendar.events.insert({
            auth: oAuth2Client,
            calendarId: calendarId,
            resource: {
                'summary': event.eventName,
                'start': {
                    'dateTime': event.startTime,
                    'timeZone': TIME_ZONE,
                },
                'end': {
                    'dateTime': event.endTime,
                    'timeZone': TIME_ZONE,
                },
            },
        }, (err, res) => {
            if (err) {
                console.log('The API returned an error on CREATE: ' + err);
                reject(err);
            }
            console.log('Request CREATE successful');
            resolve(res.data);
        });
    }));

    return create.then(res => {
        return res
    })

});

// UPDATE EVENT
exports.updateEvent = functions.https.onCall((data) => {
    const eventId = data.id;

    oAuth2Client.setCredentials({
        refresh_token: credentials.refresh_token
    });

    const update = new Promise(((resolve, reject) => {
        calendar.events.update({
            auth: oAuth2Client,
            calendarId: calendarId,
            eventId: eventId,
            resource: {
                'summary': data.title,
                'start': {
                    'dateTime': data.start,
                    'timeZone': TIME_ZONE,
                },
                'end': {
                    'dateTime': data.end,
                    'timeZone': TIME_ZONE,
                },
            },
        }, (err, res) => {
            if (err) {
                console.log('The API returned an error on UPDATE: ' + err);
                reject(err);
            }
            console.log('Request UPDATE successful');
            resolve(res.data);
        });
    }));

    return update.then(res => {
        return res
    })

});

// DELETE EVENT
exports.deleteEventFromCalendar = functions.https.onCall((data) => {
    const eventId = data.eventId;

    oAuth2Client.setCredentials({
        refresh_token: credentials.refresh_token
    });

    const deleted = new Promise(((resolve, reject) => {
        calendar.events.delete({ auth: oAuth2Client, calendarId: calendarId, eventId: eventId }, (err, res) => {
            if (err) {
                console.log('The API returned an error on DELETE: ' + err);
                reject(err);
            }
            console.log('Request DELETE successful');
            resolve(res.data);
        });
    }));

    return deleted.then(res => {
        return res
    })
})

// READ EVENTS
exports.readEvents = functions.https.onCall((data) => {
    const maxResults = data.maxResults;

    oAuth2Client.setCredentials({
        refresh_token: credentials.refresh_token
    });

    const read = new Promise((resolve, reject) => {
        calendar.events.list({ auth: oAuth2Client, calendarId: calendarId, maxResults: maxResults }, (err, res) => {
            if (err) {
                console.log('The API returned an error on READ: ' + err);
                reject(err);
            }
            console.log('Request READ successful');
            resolve(res.data.items);
        })
    })

    return read.then(myEvents => {
        return myEvents
    })
})