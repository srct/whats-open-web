import React from 'react'
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {setSidebar} from '../actions/ui'

const FacilityCard = ({classes,facility,setSidebar}) => {

    const handleClick = () => {
        setSidebar(facility)
    }
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
    return(
        <Paper onClick={handleClick} className={classes.root}>
            {removeBrackets(facility.facility_name)}
        </Paper>
    )
}
const styleSheet  = {
    root:{
        width:100,
        height:100,
    }
}

export default compose(connect(null,{setSidebar}),withStyles(styleSheet))(FacilityCard)