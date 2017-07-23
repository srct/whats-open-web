import React from 'react';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import { compose } from 'redux';
import Drawer from 'material-ui/Drawer';
// import Paper from 'material-ui/Paper';

function customDrawer({ classes,isOpen,handleLeftClose }){
    return (
        <Drawer
            open={isOpen}
            onRequestClose={handleLeftClose}
            elevation={16}
            docked
            onClick={handleLeftClose}
        >
            <div className={classes.drawer}>
                hi
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



export default compose(withStyles(styleSheet))(customDrawer);
