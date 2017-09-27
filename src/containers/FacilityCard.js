import React from 'react'
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {setSidebar} from '../actions/ui'
import FacilityStatus from './FacilityStatus';
import FavoriteButton from './FavoriteButton';
import {removeBrackets} from '../utils/nameUtils';

import {
    amber,
    blue,
    blueGrey,
    brown,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow
} from 'material-ui/colors';

const materialColors = [red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green,
    lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey];

const FacilityCard = ({classes, facility, setSidebar}) => {

    const handleClick = () => {
        setSidebar(facility)
    };

    /**
     * Gets the the initials for a facility name. The initials will be the first character of the first and last word
     * of the facility. Initial lengths range from 1-2.
     *
     * @param name The facility name to find the initials for.
     * @returns {string} The initials.
     */
    const getInitials = name => {
        //TODO: May want to allow initials to be more than 2 characters or use a different strategy to decide which characters to use.

        let words = removeBrackets(name).split(/[ -]+/); //TODO: Add case change to the regex (ex. IndAroma should be IA, not I).

        /*
           TODO: Probably want this to be a regex test and remove any useless word / symbol (ex. the, and, &, etc.)
           Words that are empty or start with ( must be removed.
                Example: 'Recreation and Athletic Complex (RAC)' will result in the initials 'R(' without the filter.
        */
        words = words.filter(word => word && !word.startsWith("("));

        if (words.length === 0) {
            return "";
        }
        if (words.length === 1) {
            return words[0].substring(0, 1).toUpperCase();
        }

        return words[0].substring(0, 1).toUpperCase() + words[words.length - 1].substring(0, 1).toUpperCase();
    };


    /**
     * Gets a material color based off the facility's slug.
     *
     * @param slug The slug of the facility to generate the material color from.
     * @return {string} The color code (in hex format) of a material color.
     */
    const materialColorFromSlug = slug => {

        /*
            Generates the hash code...
            https://stackoverflow.com/questions/194846/is-there-any-kind-of-hash-code-function-in-javascript
        */
        let hash = 0;
        for (let i = 0; i < slug.length; i++) {
            let c = slug.charCodeAt(i);
            hash = ((hash << 5) - hash) + c;
            hash = hash & hash;
        }

        /*
            materialColors is an array of all the different color palettes which contain hues for
            multiples of 100.

            materialColors[Math.abs(hash) % 19] will result in a color palette.

            [((Math.abs(hash) % 7) + 3) * 100] will result in a hue on the palette.
            Only hues 300-900 are selected because 50, 100, and 200 are usually very light and sometimes hard to read.

            List of palettes:
            https://material-ui-1dab0.firebaseapp.com/style/color/
        */
        return materialColors[Math.abs(hash) % 19][((Math.abs(hash) % 7) + 3) * 100];
    };

    return (
        <Card onClick={handleClick} className={classes.root} raised>
            {/*<CardMedia className={classes.media} image={require('../images/chipotleLogo.png')}/>*/}
            <FavoriteButton facility={facility}/>
            <CardContent className={classes.cardContent}>
                <Grid container>
                    <Grid item xs={4} className={classes.avatarContainer}>
                        <Avatar className={classes.avatar}
                                style={{backgroundColor: materialColorFromSlug(facility.slug)}}>{getInitials(facility.facility_name)}</Avatar>
                    </Grid>

                    <Grid item xs={8}>
                        <Grid container direction={'column'}>
                            <Grid item className={classes.smallGridItemSpacing}>
                                <Typography type={'title'} align={'center'} className={classes.title} noWrap>
                                    {removeBrackets(facility.facility_name)}
                                </Typography>
                            </Grid>
                            <Grid item className={classes.smallGridItemSpacing}>
                                <FacilityStatus facility={facility}/>
                            </Grid>
                            <Grid item className={classes.smallGridItemSpacing}>
                                <Typography type={'caption'} align={'center'} className={classes.location} noWrap>
                                    {removeBrackets(facility.facility_location.building)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
};
const styleSheet = {
    root: {
        width: 250,
        borderRadius: '5px',
        position: 'relative'
    },
    cardContent: {
        paddingBottom: '16px !important'
    },
    smallGridItemSpacing: {
        padding: '2px !important'
    },
    /**media: {
        flex: 1,
        width: 200,
        height: 100,
        resizeMode: 'cover',
    },**/
    avatarContainer: {
        display: 'flex',
    },
    avatar: {
        margin: 'auto',
        width: '50px',
        height: '50px'
    },
    title: { //TODO: Should the fonts be added here or in the muitheme (index.js)?
        fontFamily: 'Nunito',
        fontWeight: 'Bold'
    },
    location: {
        fontFamily: 'Nunito'
    },
};

export default compose(connect(null, {setSidebar}), withStyles(styleSheet))(FacilityCard);