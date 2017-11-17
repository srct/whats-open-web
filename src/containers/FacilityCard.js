import React from 'react'
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import FacilityStatus from '../components/FacilityStatus';
import FavoriteButton from '../components/FavoriteButton';
import FacilityCategory from '../components/FacilityCategory';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {addFavoriteFacility, removeFavoriteFacility, setSelectedFacility} from '../actions/ui';
import DirectionsWalkIcon from 'material-ui-icons/DirectionsWalk';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import {removeBrackets} from '../utils/nameUtils';
import classnames from 'classnames'

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

class FacilityCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isHovered:false
        }
    }

    handleClick = () => {
        this.props.setSelectedFacility(this.props.facility);
    };

    /**
     * Gets the the initials for a facility name. The initials will be the first character of the first and last word
     * of the facility. Initial lengths range from 1-2.
     *
     * @param name The facility name to find the initials for.
     * @returns {string} The initials.
     * @deprecated
     */
    getInitials = name => {
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
     * @deprecated
     */
    materialColorFromSlug = slug => {

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

    handleMouseEnter = () =>{
        this.setState({
            isHovered:true
        })
    };

    handleMouseLeave = () =>{
        this.setState({
            isHovered:false
        })
    };

    render() {
        const {facility, favorites, selectedFacility, addFavoriteFacility, removeFavoriteFacility} = this.props;

        return (
        <Card onClick={this.handleClick} className={classnames('fc-root', selectedFacility.slug === facility.slug && 'fc-selected')}
              onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} raised>
            <CardMedia className={'fc-media'}
                       image={'https://gmucampus.files.wordpress.com/2010/09/00sothside2.jpg'}/>

            <div className={'fc-logo-container'}>
                <CardMedia className={'fc-logo'}
                           image={'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg'}/>
            </div>


            <FavoriteButton facility={facility} isFavorite={favorites.includes(facility.slug)}
                            addFavoriteFacility={addFavoriteFacility} isHovered={this.state.isHovered} removeFavoriteFacility={removeFavoriteFacility}/>

            <CardContent className={'fc-card-content'}>
                <Grid container align={'center'} direction={'column'} className={'fc-small-grid-container-spacing'}>
                    <Grid item className={classnames('fc-small-grid-item-spacing', 'fc-ellipsis-container')}>
                        <Typography type={'subheading'} align={'center'} className={classnames('fc-title', 'fc-one-line-ellipsis')}>
                            {removeBrackets(facility.facility_name)}
                        </Typography>
                    </Grid>
                    <Grid item className={'fc-small-grid-item-spacing'}>
                        <FacilityCategory category={facility.facility_category} />
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions>
                <Grid container justify={'space-around'}>
                    <Grid item className={'fc-extraInfoWrapper'}>
                        <FacilityStatus facility={facility}/>
                    </Grid>

                    <Grid item className={'fc-extra-info-wrapper'}>
                        <Typography type={'caption'}>
                            <LocationOnIcon className={'fc-card-map-marker-icon'}/>
                        </Typography>
                        <Typography type={'caption'} align={'center'} className={'fc-two-line-ellipsis'}>
                            {facility.facility_location.building}
                        </Typography>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
    }
}

const mapStateToProps = state => ({
    favorites: state.ui.favorites,
    selectedFacility: state.ui.selectedFacility
});

export default connect(mapStateToProps, {
    setSelectedFacility,
    addFavoriteFacility,
    removeFavoriteFacility
})(FacilityCard);