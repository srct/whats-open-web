import React from 'react'
import {withStyles } from 'material-ui/styles';

const TextwTitle = ({classes,label,content}) => {

 return(<div>
     <div className={classes.label}>
        {label}
     </div>
     <div className={classes.content}>
         {content}
     </div>
 </div>)
}
const styleSheet  = {
    label:{
        fontWeight:400,
        fontSize:"12px",
        color:"rgba(0,0,0,.54)",
    },
    content:{
        fontWeight:400,
        fontSize:"14px",
        textOverflow: 'ellipsis',
        width:176,
        whiteSpace:'nowrap',
        overflow:'hidden',

    }
}

export default withStyles(styleSheet)(TextwTitle) 