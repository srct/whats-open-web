import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import TextwTitle from '../components/TextwTitle';
import FacilitiesMap from '../components/FacilitiesMap';
import classNames from 'classnames';
import WeekHours from './WeekHours';
import FacilityTags from './FacilityTags';
import {removeBrackets} from '../utils/nameUtils';

const Sidebar = ({facility, isSidebarOpen, isSidebarMapOpen, facilities}) => {
    return (
        <div
            className={classNames(['card-container-offset', (isSidebarOpen && 'card-container-offset-open'), (!isSidebarOpen && 'card-container-offset-closed')])}>
            <Paper
                className={classNames(['sidebar-root', (isSidebarOpen && 'sidebar-open'), (!isSidebarOpen && 'sidebar-closed')])}>
                <div className={'sidebar-row1'}>
                    <Avatar className={'sidebar-avatar'} src={require('../images/chipotleLogo.png')}/>
                    <div className={'sidebar-title'}>
                        <Typography type='display1'>{removeBrackets(facility.facility_name)}</Typography>
                    </div>
                </div>
                <Divider className={'sidebar-divider'}/>
                <div className={'sidebar-scroll'}>
                    <div className={'sidebar-label-holder'}>
                        <TextwTitle label="Building"
                                    content={facility.facility_location && facility.facility_location.building}/>
                        <TextwTitle label="Address"
                                    content={facility.facility_location && facility.facility_location.address}/>
                        <TextwTitle label="Tags" content={<FacilityTags facility={facility}/>}/>
                        <TextwTitle label="Hours" content={<WeekHours facility={facility}/>}/>
                    </div>
                </div>
                <div className={'sidebar-row2'}>
                    <FacilitiesMap isMapOpen={isSidebarMapOpen} facilities={facilities} facility={facility}/>
                </div>
            </Paper>
        </div>
    )
};

export default Sidebar;

