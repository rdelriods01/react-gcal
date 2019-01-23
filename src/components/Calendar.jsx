import React, { Component } from 'react'

import BigCalendar from 'react-big-calendar'
import firebase from 'firebase/app';

import Event from './Event';

import moment from 'moment'
import 'moment/locale/es-us'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
const localizer = BigCalendar.momentLocalizer(moment)
const DragAndDropCalendar = withDragAndDrop(BigCalendar)

export default class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            openCreate: false,
            openEdit: false,
            actualEvent: null
        }
        this.editEvent = this.editEvent.bind(this)
        this.openCreateModal = this.openCreateModal.bind(this)
        this.openEditModal = this.openEditModal.bind(this)
        this.readEventsfromGCal();
        setInterval(this.readEventsfromGCal, 3600000)
    }

    readEventsfromGCal = () => {
        const readEvents = firebase.functions().httpsCallable('readEvents');
        readEvents({ maxResults: 250 }).then(res => {
            let events = [];
            res.data.map(event => {
                // GCal date is an ISO string "2019-01-12T18:00:00.000Z" 
                // we need to conver to Date object "Sat Jan 12 2019 12:00:00 GMT-0600 (hora estándar central)" for BigCal
                const newStart = new Date(event.start.dateTime)
                const newEnd = new Date(event.end.dateTime)
                events.push({
                    title: event.summary,
                    meta: event,
                    start: newStart,
                    end: newEnd,
                    id: event.id
                })
                return events
            })
            this.setState({ events }, () => console.log(this.state.events))
        })
    }

    openCreateModal = (ev) => {
        this.setState({ openCreate: true, actualEvent: { start: ev.start, end: ev.end, title: '' } });
    }
    createEvent = (event) => {
        this.setState({ openCreate: false });
        if (event.ready) {
            // let newEvent = {
            //     title: event.title,
            //     start: event.start,
            //     end: event.end,
            // }
            // this.setState({
            //     events: this.state.events.concat([newEvent]),
            // })
            // BigCal date is an Date object "Sat Jan 12 2019 12:00:00 GMT-0600 (hora estándar central)"
            // we need to conver to ISOString "2019-01-12T18:00:00.000Z" for GCal
            let start = event.start.toISOString()
            let end = event.end.toISOString()
            const addEvent = firebase.functions().httpsCallable('addEventToCalendar');
            addEvent({
                "eventName": event.title,
                "startTime": start,
                "endTime": end
            }).then((res) => {
                if (res) {
                    console.log('Se creo el evento ' + event.title);
                    this.readEventsfromGCal()
                }
            })
        }
    };

    openEditModal = (ev) => {
        this.setState({ openEdit: true, actualEvent: ev });
    }

    closeEditModal = (event) => {
        this.setState({ openEdit: false });
        if (event.ready || event.delete) {
            if (event.delete) {
                this.deleteEvent({ event: this.state.actualEvent })
            } else {
                this.editEvent({ event: this.state.actualEvent, start: event.start, end: event.end })
            }
        }
    }

    editEvent = ({ event, start, end }) => {
        const { events } = this.state
        const idx = events.indexOf(event)
        let newEvent = { ...event, start, end }
        const nextEvents = [...events]
        nextEvents.splice(idx, 1, newEvent)
        this.setState({
            events: nextEvents,
        })
        // BigCal date is an Date object "Sat Jan 12 2019 12:00:00 GMT-0600 (hora estándar central)"
        // we need to conver to ISOString "2019-01-12T18:00:00.000Z" for GCal
        let newStart = newEvent.start.toISOString()
        let newEnd = newEvent.end.toISOString()
        newEvent = { ...event, start: newStart, end: newEnd }
        const updateEvent = firebase.functions().httpsCallable('updateEvent');
        updateEvent({ ...newEvent })
            .then(res => {
                if (res) {
                    console.log('Se edito el evento ' + event.title);
                    this.readEventsfromGCal()
                }
            })
    }

    deleteEvent = ({ event }) => {
        const deleteEvent = firebase.functions().httpsCallable('deleteEventFromCalendar')
        deleteEvent({ eventId: event.id }).then((res) => {
            console.log('Se elimino el evento ' + event.title);
            this.readEventsfromGCal();
        })
    }

    render = () =>
        <div>
            <DragAndDropCalendar
                selectable
                localizer={localizer}
                events={this.state.events}
                onEventDrop={this.editEvent}
                onSelectSlot={this.openCreateModal}
                onSelectEvent={this.openEditModal}
                defaultView={BigCalendar.Views.WEEK}
                step={15}
                timeslots={4}
                min={new Date('2019, 1, 1, 08:00')}
                max={new Date('2019, 1, 1, 20:00')}
                style={{ height: "100vh" }} />
            {this.state.actualEvent ? (
                <div>
                    <Event title="New Event" textbtn="Create" ready={false} delete={false} delbtn={false} open={this.state.openCreate} event={this.state.actualEvent} onClose={this.createEvent} />
                    <Event title="Edit Event" textbtn="Edit" ready={false} delete={false} delbtn={true} open={this.state.openEdit} event={this.state.actualEvent} onClose={this.closeEditModal} />
                </div>
            ) : null}
        </div>
}