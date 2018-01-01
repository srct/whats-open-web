import React from 'react';
import Grid from 'material-ui/Grid';
import facilityUtils from '../utils/facilityUtils';

const WeekHours = ({facility}) => {
    const weekDays = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
    ];

    const output = [];
    try {
        let index = 0;
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            const todaysHours = facilityUtils.getHoursByDay(facility, dayOfWeek);
            for (let i = 0; i < todaysHours.length; i++) {
                output[index] = (
                    <Grid container spacing={0} key={facility.slug + index} className="week-hours-row">
                        <Grid item xs={2} className="week-hours-day">{weekDays[dayOfWeek]}</Grid>
                        <Grid item className="week-hours-times">{todaysHours[i].text}</Grid>
                    </Grid>
                );
                index++;
            }
        }
    } catch (e) {
        //Empty
    }

    return (
        <div>
            {output}
        </div>
    );
};

export default WeekHours;