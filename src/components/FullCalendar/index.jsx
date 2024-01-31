import { formatDate, DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../../utils/event-utils'
import { useEffect, useLayoutEffect, useRef, useState } from "react"
// import Card from '@/components/card';
// import { useSettings } from '@/store/settingStore';
import { useResponsive } from '@/hooks/use-reponsive';
import dayjs from 'dayjs';

// import CalendarEvent from './calendar-event';
import CalendarEventForm from './calendar-event-form';
import CalendarHeader from './calendar-header';
import { useEmotionCss } from '@ant-design/use-emotion-css';
const DefaultEventInitValue = {
    id: Math.random().toString(36).slice(2),
    title: '',
    description: '',
    allDay: false,
    start: dayjs(),
    end: dayjs(),
    color: '',
};
const Strategy = ({date,setDate}) => {
    const fullCalendarRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [view, setView] = useState('dayGridMonth');
    // const [date, setDate] = useState(new Date());
    const [eventFormType, setEventFormType] = useState('add');
    const [eventInitValue, setEventInitValue] = useState(DefaultEventInitValue);
    useEffect(() => {
        const calendarApi = fullCalendarRef.current.getApi();
        console.log(dayjs(date).format('YYYY-MM-DD'));
        if (typeof date==='object') {
        calendarApi.gotoDate(dayjs(date).format('YYYY-MM-DD'))
        }
    }, [date]);
    function renderEventContent(eventInfo) {
        return (
            <>
                {/* <b>{eventInfo.timeText}</b> */}
                <i>{eventInfo.event?.title}</i>
            </>
        )
    }
    const [state, dispatchState] = useState({
        weekendsVisible: true,
        currentEvents: []
    });
    const handleViewTypeChange = (view) => {
        setView(view);
    };



    const siderContentStyle = useEmotionCss(({ token }) => {
        return {
            width: '100%',
            height: '100%',
            overflow: 'auto',
            '-ms-overflow-style': 'none', /* 适用于Internet Explorer, Edge */
            scrollbarWidth: 'none',/* 适用于Firefox */
            overflowY: scroll,
            '  &::-webkit-scrollbar': {
                display: 'none', /* 适用于Chrome、Safari和Opera */
            },
            ' .fc ': {
                width: '100%',
                height: 'calc(100% - 112px)',
                '--fc-border-color': 'rgba(145, 158, 171, 0.16)',
                '--fc-now-indicator-color': '#ff5630',
                '--fc-today-bg-color': 'rgba(145, 158, 171, 0.08)',
                '--fc-page-bg-color': '#ffffff',
                '--fc-neutral-bg-color': '#F4F6F8',
                '--fc-list-event-hover-bg-color': ' rgba(145, 158, 171, 0.08)',
                '--fc-highlight-color': 'rgba(145, 158, 171, 0.08)',
                a: {
                    color: token.titleColor,
                },
                '.fc-col-header': {
                    boxShadow: 'rgba(145, 158, 171, 0.2) 0px -1px 0px inset',
                    th: {
                        borderColor: 'transparent',
                    },
                    '.fc-col-header-cell-cushion': {
                        fontWeight: 600,
                        fontSize: '16px',
                        padding: '8px 0px',
                    }
                },
                ' .fc-dayGridMonth-view,.fc-timeGridWeek-view,.fc-timeGridDay-view': {
                    '.fc-daygrid-day-number': {
                        lineHeight: 1.57143,
                        fontSize: '16px',
                        //   font-family: 'Public Sans', sans-serif,
                        fontWeight: 400,
                        padding: '8px 8px 0px',
                    },
                    '.fc-daygrid-event': {
                        marginTop: '4px',
                        ' .fc-event-start,.fc-event-end': {
                            marginLeft: '4px',
                            marginRight: '4px',
                        }
                    },
                    '.fc-daygrid-event-harness': {
                        borderColor: ' transparent !important',
                        backgroundColor: 'transparent !important',
                        color: ` ${token.titleColor} !important`,

                        '.fc-event-main-wrapper': {
                            borderRadius: '6px',
                            width: '100%',
                            backgroundColor: token.titleColor,
                            ' &::before': {
                                top: '0px',
                                left: '0px',
                                width: '100%',
                                content: '""',
                                opacity: '0.24',
                                height: '100%',
                                borderRadius: '6px',
                                position: 'absolute',
                                // backgroundColor: 'currentcolor',
                                transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                            },
                            '.fc-event-main': {
                                fontSize: '13px',
                                lineHeight: '20px',
                                filter: 'brightness(0.48)',
                                display: 'flex',
                                width: '100%',
                                backgroundColor: token.titleColor,
                                'b':{

                                },
                                '.fc-event-time': {
                                    overflow: 'unset',
                                    fontWeight: 700,
                                },
                                '.fc-event-title-container': {
                                    flexGrow: 1,
                                    flexShrink: 1,
                                    minWidth: '0px',
                                    '.fc-event-title': {
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                    }
                                }
                            }
                        }
                    }
                }
            },

        }

    })
    const handleDateSelect = (selectInfo) => {
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect(); // clear date selection
        setOpen(true);
        setEventFormType('add');
        setEventInitValue({
            id: Math.random().toString(36).slice(2),
            title: '',
            description: '',
            start: dayjs(selectInfo.startStr),
            end: dayjs(selectInfo.endStr),
            allDay: selectInfo.allDay,        
        });
    }
    const handleEventClick = (clickInfo) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }
    const handleEvents = (events) => {
        dispatchState({
            ...state,
            currentEvents: events
        })
    }
    const handleMove = (action) => {
        const calendarApi = fullCalendarRef.current.getApi();
        switch (action) {
            case 'prev':
                calendarApi.prev();
                break;
            case 'next':
                calendarApi.next();
                break;
            case 'today':
                calendarApi.today();
                break;
            default:
                break;
        }
        setDate(calendarApi.getDate());
    };
    const handleCancel = () => {
        setEventInitValue(DefaultEventInitValue);
        setOpen(false);
    };
    const handleDelete = (id) => {
        const calendarApi = fullCalendarRef.current.getApi();
        const oldEvent = calendarApi.getEventById(id);
        oldEvent?.remove();
    };
    const handleCreate = (values) => {
        const calendarApi = fullCalendarRef.current.getApi();
        const { title = '', description, start, end, allDay = false, color } = values;
        const newEvent = {
            id: Math.random().toString(36).slice(2),
            title,
            allDay,
            color,
            extendedProps: {
                description,
            },
        };
        if (start) newEvent.start = start.toDate();
        if (end) newEvent.end = end.toDate();
        // 刷新日历显示
        calendarApi.addEvent(newEvent);
    };
    const handleEdit = (values) => {
        const { id, title = '', description, start, end, allDay = false, color } = values;
        const calendarApi = fullCalendarRef.current.getApi();
        const oldEvent = calendarApi.getEventById(id);

        const newEvent = {
            id,
            title,
            allDay,
            color,
            extendedProps: {
                description,
            },
        };
        if (start) newEvent.start = start.toDate();
        if (end) newEvent.end = end.toDate();

        // 刷新日历显示
        oldEvent?.remove();
        calendarApi.addEvent(newEvent);
    };
    useLayoutEffect(() => {
        const calendarApi = fullCalendarRef.current.getApi();
        setTimeout(() => {
            calendarApi.changeView(view);
        });
    }, [view]);
    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }


    return (
        <div className='demo-app' style={{ width: '100%', height: '100%' }}>
            <div className={siderContentStyle} >
                <CalendarHeader
                    now={date}
                    view={view}
                    onMove={handleMove}
                    onCreate={() => setOpen(true)}
                    onViewTypeChange={handleViewTypeChange}
                />
                <FullCalendar
                    ref={fullCalendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={false}
                    initialDate={date}
                    initialView={view}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    // weekends={state.weekendsVisible}
                    initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                    select={handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={handleEventClick}
                    eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
                eventAdd={function(){}}
                eventChange={function(){}}
                eventRemove={function(){}}
                */
                />
            </div>
            <CalendarEventForm
                open={open}
                type={eventFormType}
                initValues={eventInitValue}
                onCancel={handleCancel}
                onDelete={handleDelete}
                onCreate={handleCreate}
                onEdit={handleEdit}
            />
        </div>
    )

}

export default Strategy