import React from 'react';
import {withStyles} from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import {green, red} from 'material-ui/colors'

const FacilityStatus = ({classes, facility}) => {

    /**
     * Helper function to calculate the number  days between dayFrom and dayTo.
     *
     * @param dayFrom The index of the start day (0-6)
     * @param dayTo The index of the end day (0-6)
     * @returns {number} The number of days between the two.
     */
    const daysTill = (dayFrom, dayTo) => {
        let days = 0;
        while (dayFrom !== dayTo) {
            days++;
            if (++dayFrom > 6) {
                dayFrom = 0;
            }
        }

        return days;
    };

    /**
     * Calculates the time until the facility is open.
     * This function does not work correctly if the facility is open.
     *
     * @param schedule The active schedule for the facility.
     * @return {number} The time (in minutes) until the facility opens.
     */
    const calcTimeTillOpen = schedule => {
        const curDateTime = new Date();
        //Converts the JS day of week (0 is sunday), to the API day of week (0 is monday).
        const dayOfWeek = [6, 0, 1, 2, 3, 4, 5][curDateTime.getDay()];

        let timeTillOpen = null; //The time till the facility is open (in ms)

        //Iterates over each schedule, setting the timeTillOpen to be the smallest it can be.
        for (let i = 0; i < schedule.open_times.length; i++) {
            const scheduleEntry = schedule.open_times[i];

            let daysTillOpen = daysTill(dayOfWeek, scheduleEntry.start_day);

            const timeInParts = scheduleEntry.start_time.split(':');

            const openTime = new Date(
                curDateTime.getFullYear(),
                curDateTime.getMonth(),
                curDateTime.getDate() + daysTillOpen,
                timeInParts[0],
                timeInParts[1],
                timeInParts[2]);

            const entryTillOpen = openTime - curDateTime;
            if (!timeTillOpen || (entryTillOpen > 0 && entryTillOpen < timeTillOpen)) {
                timeTillOpen = entryTillOpen;
            }
        }

        return timeTillOpen / 60000; //Set to minutes
    };

    /**
     * Calculates the time until the facility is closed.
     * This function does not work correctly if the facility is closed.
     *
     * @param schedule The active schedule for the facility.
     * @returns {number} The time (in minutes) until the facility closes.
     */
    const calcTimeTillClose = schedule => {
        const curDateTime = new Date();
        //Converts the JS day of week (0 is sunday), to the API day of week (0 is monday).
        const dayOfWeek = [6, 0, 1, 2, 3, 4, 5][curDateTime.getDay()];

        let currentEntry;

        //Finds the active entry for the schedule.
        for (let i = 0; i < schedule.open_times.length; i++) {
            const scheduleEntry = schedule.open_times[i];

            const startTimeInParts = scheduleEntry.start_time.split(":");
            const endTimeInParts = scheduleEntry.end_time.split(":");

            /*
                Only the times are being compared, therefore set the year, month, and date to 0.
             */
            const curTime = new Date(0, 0, 0, curDateTime.getHours(), curDateTime.getMinutes(), curDateTime.getSeconds());
            const startTime = new Date(0, 0, 0, startTimeInParts[0], startTimeInParts[1], startTimeInParts[2]);
            const endTime = new Date(0, 0, 0, endTimeInParts[0], endTimeInParts[1], endTimeInParts[2]);

            /*
                First block accounts for entries where the end day is larger than the start day
                ex. start day is Monday (0), end day is Tuesday (1)

                Second block Accounts for entries where the end day is smaller than the start day
                ex. start day is Sunday (6), end day is Monday (0)
             */
            if ((scheduleEntry.start_day <= scheduleEntry.end_day &&
                    dayOfWeek >= scheduleEntry.start_day &&
                    dayOfWeek <= scheduleEntry.end_day) ||

                (scheduleEntry.start_day > scheduleEntry.end_day &&
                    dayOfWeek >= scheduleEntry.start_day ||
                    dayOfWeek <= scheduleEntry.end_day)
            ) {
                /*
                    This logic makes sure that if the current day is the start day / end day, the current time
                    is within the start / end times. This is important for cases such as Southside.
                    If this logic was not here, then example: if the day was Friday (4) at 18:00:00,
                    the schedule that starts on Thursday (3) at 07:00:00 and ends on Friday (4) at 02:00:00 would be
                    selected as it is the first to be iterated that either begins or ends on Friday (4)
                    This logic prevents this from occurring and instead selects starting on Friday (4) at 07:00:00 and
                    ending on Saturday (5) at 02:00:00
                 */
                if ((dayOfWeek === scheduleEntry.start_day && curTime > startTime) ||
                    (dayOfWeek === scheduleEntry.end_day && curTime <= endTime) ||
                    (dayOfWeek !== scheduleEntry.start_day && dayOfWeek !== scheduleEntry.end_day)) {
                    currentEntry = scheduleEntry;
                    break;
                }
            }
        }

        let daysTillClose = daysTill(dayOfWeek, currentEntry.end_day);

        const timeInParts = currentEntry.end_time.split(':');

        const closeTime = new Date(
            curDateTime.getFullYear(),
            curDateTime.getMonth(),
            curDateTime.getDate() + daysTillClose,
            timeInParts[0],
            timeInParts[1],
            timeInParts[2]);

        return (closeTime - curDateTime) / 60000;
    };

    /**
     * Generates the chip label
     *
     * @param facility The facility to determine the label for.
     * @returns {string} The label for the chip
     */
    const chipLabel = facility => {
        const schedule = facility.main_schedule;

        //TODO: Logic for "Special Schedule". I have no idea what this is.

        //Facility is open 24/7
        if (schedule.twenty_four_hours) {
            return "OPEN 24/7";
        }

        let time = facility.isOpen ? calcTimeTillClose(schedule) : calcTimeTillOpen(schedule);

        if (facility.isOpen && time > 60) {
            return "OPEN";
        } else if (facility.isOpen && time <= 60) {
            return "CLOSING SOON";
        } else if (!facility.isOpen && time > 60) {
            return "CLOSED";
        } else {
            return "OPENING SOON";
        }

        /*/TODO: May want to use Math.ceil instead of Math.round
        if (time < 60) { //Under one hour
            const roundedMins = Math.round(time);
            return `${roundedMins} ${roundedMins === 1 ? "min" : "mins"}`;
        } else if (time < 1440) { //Under one day
            const roundedHrs = Math.round(time / 60);
            return `${roundedHrs} ${roundedHrs === 1 ? "hr" : "hrs"}`;
        } else { //Over a day
            const roundedDays = Math.round(time / 1440);
            return `${roundedDays} ${roundedDays === 1 ? "day" : "days"}`;
        }*/
    };

    return (
        <Chip label={
            <div>
                <Typography type={'caption'} className={classes.isOpenText}>
                    {chipLabel(facility)}
                </Typography>
            </div>
        } className={classes.chip} style={{backgroundColor: facility.isOpen ? green[500] : red[500]}}/>
    )
};
const styleSheet = {
    chip: {
        position: 'absolute',
        left: '8px',
        bottom: '4px',
        opacity: .9,
        height: '28px'
    },
    isOpenText: {
        color: 'white',
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        display: 'inline',
    }
};

export default withStyles(styleSheet)(FacilityStatus);