import React from 'react';
import {withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider';
import TextwTitle from '../components/TextwTitle'
import FacilitiesMap from '../components/FacilitiesMap'
import classNames from 'classnames';
import Button from 'material-ui/Button';

const Sidebar = ({classes,facility,isSidebarOpen,isSidebarMapOpen,toggleSidebarMap,facilities}) => {
    const removeBrackets = (name) => {
       if(typeof(name) === "undefined"){
           return ""
       }
       const openBracket = name.indexOf('[')
        if(openBracket !== -1){
            return name.substring(0,openBracket)
        }
        return name
    }
    // if(isSidebarOpen){
    //     return (<div></div>)
    // }
    return(

    <Paper className={classNames([classes.root,(!isSidebarOpen && classes.openSidebar),(isSidebarOpen && classes.closedSidebar)])}>
       <div className={classes.row1}>
           <Avatar className={classes.avatar} src={require('../images/chipotleLogo.png')} />
           <div className={classes.title}>
                <Typography  type='display1'>{removeBrackets(facility.facility_name)}</Typography>
           </div>
        </div>
           <Divider className={classes.divider}/>
           <div className={classes.labelHolder}>
               <div className={classes.labelRow}>
                    <TextwTitle label="Location" content="The Johnson Center" />
                    <TextwTitle label="Location" content="The Johnson Center" />
               </div>
               <div className={classes.labelRow}>
                   <TextwTitle label="Location" content="The Johnson Center" />
                   <TextwTitle label="Location" content="The Johnson Center asdfasdfasdfasdf  asd fas as asd asdfasdfasf " />
               </div>
           </div>
        <div className={classes.row2}>
            <FacilitiesMap isMapOpen={isSidebarMapOpen} facilities={facilities} facility={facility}/>

            <Button className={classes.toggleMapBtn} onClick={toggleSidebarMap}>{isSidebarMapOpen ? 'Close Map' : 'Open Map'}</Button>
        </div>
    </Paper>
    )
}
const styleSheet = {
    '@media screen and (max-width: 600px)': {
        root: {
            display: 'none !important'
        },
    },
    labelRow:{
        display:'flex',
    },
    labelHolder:{
        margin:16,
    },
    openSidebar:{
        flex:'1 0 400px',
    },
    closedSidebar:{
        flex:'1 0 0px',
    },
    root:{
        overflow:'hidden',
        display:'block',
        boxSizing:'border-box',
        position:'relative',
        webkitTransition: '150ms ease-in-out',
        mozTransition: '150ms ease-in-out',
        oTransition: ' 150ms ease-in-out',
        transition: '150ms ease-in-out',
    },
    divider:{
        margin:16,
    },
    row1:{
        display:'flex',
        padding:8,

    },
    avatar:{
        width:100,
        height:100,
    },
    title:{
        height:100,
        marginLeft:8,
        display:'flex',
        alignItems:'center'
    },
    row2:{
        position: 'absolute',
        bottom: '0px',
        width: '100%'
    },
    toggleMapBtn: {
        width: '100%'
    }
}

export default withStyles(styleSheet)(Sidebar)

