import React from 'react';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import { compose } from 'redux';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import {apiTest} from '../actions/api';
import {connect} from 'react-redux';
// import Paper from 'material-ui/Paper';

function customDrawer({ classes,isOpen,handleLeftClose, apiTest }){
    const handleClick = () =>{
        apiTest()
    }
    return (
        <Drawer
            open={isOpen}
            onRequestClose={handleLeftClose}
            elevation={16}
            docked
            onClick={handleLeftClose}
        >
            <div className={classes.drawer}>
                <Button raised onClick={handleClick}>Call API</Button>
            </div>
        </Drawer>
    )
}
const styleSheet = createStyleSheet('Drawer', theme => ({
    drawer:{
        width:400,
        minWidth:400,
        height:"100%",
        backgroundColor:'white',
    }
}));



export default compose(connect(null,{ apiTest }),withStyles(styleSheet))(customDrawer);
