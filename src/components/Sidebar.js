import React from 'react';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider';
import TextwTitle from '../components/TextwTitle'
import FacilitiesMap from '../components/FacilitiesMap'
import classNames from 'classnames';
import Button from 'material-ui/Button';

const Sidebar = ({facility, isSidebarOpen, isSidebarMapOpen, toggleSidebarMap, facilities}) => {

    const removeBrackets = (name) => {
        if (typeof(name) === "undefined") {
            return "";
        }

        const openBracket = name.indexOf('[');
        if (openBracket !== -1) {
            return name.substring(0, openBracket);
        }

        return name;
    };

    return (
        <Paper
            className={classNames(['sidebar-root', (!isSidebarOpen && 'sidebar-open'), (isSidebarOpen && 'sidebar-closed')])}>
            <div className={'sidebar-row1'}>
                <Avatar className={'sidebar-avatar'} src={require('../images/chipotleLogo.png')}/>
                <div className={'sidebar-title'}>
                    <Typography type='display1'>{removeBrackets(facility.facility_name)}</Typography>
                </div>
            </div>
            <Divider className={'sidebar-divider'}/>
            <div className={'sidebar-label-holder'}>
                <div className={'sidebar-label-row'}>
                    <TextwTitle label="Location" content="The Johnson Center"/>
                    <TextwTitle label="Location" content="The Johnson Center"/>
                </div>
                <div className={'sidebar-label-row'}>
                    <TextwTitle label="Location" content="The Johnson Center"/>
                    <TextwTitle label="Location"
                                content="The Johnson Center asdfasdfasdfasdf  asd fas as asd asdfasdfasf "/>
                </div>
            </div>
            <div className={'sidebar-row2'}>
                <FacilitiesMap isMapOpen={isSidebarMapOpen} facilities={facilities} facility={facility}/>

                <Button className={'sidebar-toggle-map-btn'}
                        onClick={toggleSidebarMap}>{isSidebarMapOpen ? 'Close Map' : 'Open Map'}</Button>
            </div>
        </Paper>
    )
};

export default Sidebar;

