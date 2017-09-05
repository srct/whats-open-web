import React from 'react';
import {withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider';
import TextwTitle from '../components/TextwTitle'
const Sidebar = ({classes}) => {
    return(<Paper className={classes.root}>
       <div className={classes.row1}>
           <Avatar className={classes.avatar} src={require('../images/chipotleLogo.png')} />
           <div className={classes.title}>
                <Typography  type='display1'>Chipotle</Typography>
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

    </Paper>
    )   
}
const styleSheet = {
    labelRow:{
        display:'flex',
    },
    labelHolder:{
        margin:16,
    },
    root:{
        flex:'1 0 400px',
        display:'block',
        boxSizing:'border-box',
        margin:16,
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
}

export default withStyles(styleSheet)(Sidebar)

