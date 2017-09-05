import React from 'react'
import {withStyles} from 'material-ui/styles';
import FacilityCard from '../containers/FacilityCard'

const CardContainer = ({classes,facilities}) => {
    return (
        <div className={classes.root}>
            {facilities.map((item) =>{
               return <FacilityCard key={item.slug} facility={item}/>
            })}
        </div>
    )
}
const styleSheet  = {
    root:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexWrap:'wrap',
    }
}

export default withStyles(styleSheet)(CardContainer)