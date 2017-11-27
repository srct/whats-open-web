import React from 'react'
import Grid from 'material-ui/Grid';

const WeekHours = ({facility}) => {

    const convert_am_pm = (time) => {
        const timeArr = time
            .split(":")
            .map((item) => {
                return Number(item)
            });

        let am_pm = "am"
        if (timeArr[0] > 12) {
            timeArr[0] = timeArr[0] - 12
            am_pm = "pm"
        }
        if (timeArr[1] === 0) {
            timeArr[1] = ""
        } else {
            timeArr[1] = ":" + timeArr[1]
        }
        return timeArr[0] + timeArr[1] + am_pm;
    }
    const weekDays = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ]
    let output = [];
    try {

        const schedule = facility.main_schedule.open_times;
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            let startDay,
                endDay,
                startTime,
                endTime;
            let hours = null;

            for (let i = 0; i < schedule.length; i++) {
                startDay = schedule[i].start_day;
                endDay = schedule[i].end_day;
                startTime = schedule[i].start_time;
                endTime = schedule[i].end_time;
                if (dayOfWeek === startDay) {
                    hours = convert_am_pm(startTime) + "  -  " + convert_am_pm(endTime);
                    break;
                } else if (dayOfWeek > startDay && dayOfWeek < endDay) {
                    hours = '24 hours';
                    break;
                }
            }

            if (hours === null) {
                hours = 'Closed'
            }
            output[dayOfWeek] = (
                <Grid container key={facility.slug + dayOfWeek} className='week-hours-row'>
                    <Grid item xs={2} className='week-hours-day'>{weekDays[dayOfWeek]}</Grid>
                    <Grid item className='week-hours-times'>{hours}</Grid>
                </Grid>
            )
        }
    } catch (e) {}

    return (
        <div>
            {output}
        </div>
    )
};

export default WeekHours;