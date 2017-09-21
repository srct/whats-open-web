import React from 'react'
import {withStyles} from 'material-ui/styles';
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {setSidebar} from '../actions/ui'
import FacilityStatus from './FacilityStatus';


const FacilityCard = ({classes, facility, setSidebar}) => {

    const handleClick = () => {
        setSidebar(facility)
    };
    const removeBrackets = (name) => {
        if (typeof(name) === "undefined") {
            return ""
        }
        const openBracket = name.indexOf('[');
        if (openBracket !== -1) {
            return name.substring(0, openBracket)
        }
        return name
    };
    return (
        <Card onClick={handleClick} className={classes.root}>
            <CardMedia className={classes.media} image={require('../images/chipotleLogo.png')}/>
            <CardContent>
                <Typography type={'title'} align={'center'} className={classes.title} noWrap>
                    {removeBrackets(facility.facility_name)}
                </Typography>
                <FacilityStatus/>
                <Typography type={'caption'} align={'center'} className={classes.location}>
                    {removeBrackets(facility.facility_location.building)}
                </Typography>
            </CardContent>
        </Card>
    )
};
const styleSheet = {
    root: {
        width: 200,
        height: 200,
    },
    card: {
        maxWidth: 345
    },
    media: {
        flex: 1,
        width: 200,
        height: 100,
        resizeMode: 'cover',
    },
    title: { //TODO: Should the fonts be added here or in the muitheme (index.js)?
        fontFamily: 'Nunito',
        fontWeight: 'Bold'
    },
    location: {
        fontFamily: 'Nunito'
    }
};

export default compose(connect(null, {setSidebar}), withStyles(styleSheet))(FacilityCard);