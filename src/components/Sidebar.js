import React from 'react';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider';
import TextwTitle from '../components/TextwTitle'
import FacilitiesMap from '../components/FacilitiesMap'
import classNames from 'classnames';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import WeekHours from './WeekHours';
import { toggleSidebar } from '../actions/ui';

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
    const handleSidebarMapToggle = () =>{
        if (navigator.geolocation) {
            console.log('Geolocation is supported!');
            // navigator.geolocation.getCurrentPosition(()=>{})
          }
          else {
            console.log('Geolocation is not supported for this Browser/OS.');
          }
          toggleSidebarMap()
    }

    
    let productChips;
    try{
        let index = -1;
        productChips = facility.facility_product_tags.map((tag) => {
            index++;
        return (<Chip key={tag+index} label={tag} />)
    })
    }catch(e){
       productChips = ''
    }
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
                    <TextwTitle label="Building" content="The Johnson Center"/>
                    <TextwTitle label="Address" content="https://amenufromaplace.com"/>
                    <TextwTitle label="Phone Number" content="The Johnson Center"/>
                    <TextwTitle label="Tags" content={<div className='chip-holder'>{productChips}</div>}/>
                    <TextwTitle label="Hours" content={<WeekHours facility={facility}/>}/>
                    

            </div>
            <div className={'sidebar-row2'}>
                <FacilitiesMap isMapOpen={isSidebarMapOpen} facilities={facilities} facility={facility}/>

                {/* <Button className={'sidebar-toggle-map-btn'}
                        onClick={handleSidebarMapToggle}>{isSidebarMapOpen ? 'Close Map' : 'Open Map'}</Button> */}
            </div>
        </Paper>
    )
};

export default Sidebar;

