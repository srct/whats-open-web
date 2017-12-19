import React from 'react'
import Grid from 'material-ui/Grid';
import FacilityUtils from '../utils/facilityUtils';

const WeekHours = ({facility}) => {
    const weekDays = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];

    let output = [];

    try {
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            output[dayOfWeek] = (
                <Grid container key={facility.slug + dayOfWeek} className='week-hours-row'>
                    <Grid item xs={2} className='week-hours-day'>{weekDays[dayOfWeek]}</Grid>
                    <Grid item className='week-hours-times'>{FacilityUtils.getHoursByDay(facility, dayOfWeek)}</Grid>
                </Grid>
            )
        }
    } catch (e) {
    }

    return (
        <div>
            {output}
        </div>
    )
};

export default WeekHours;