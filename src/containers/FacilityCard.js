import React from 'react'
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import FacilityStatus from '../components/FacilityStatus';
import FavoriteButton from '../components/FavoriteButton';
import FacilityCategory from '../components/FacilityCategory';
import {connect} from 'react-redux';
import {addFavoriteFacility, removeFavoriteFacility, setSelectedFacility,setSidebar} from '../actions/ui';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import {removeBrackets} from '../utils/nameUtils';
import classnames from 'classnames';
import FacilityDialog from '../components/FacilityDialog';

class FacilityCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isHovered: false,
        };
    }

    handleCardClick = () => {
        const isSelected = this.props.selectedFacility.slug === this.props.facility.slug;
        this.props.setSelectedFacility(isSelected ? null : this.props.facility);
        this.props.setSidebar(!isSelected);
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
        const {facility, facilities, favorites, selectedFacility, addFavoriteFacility, removeFavoriteFacility} = this.props;

        const isSelected = selectedFacility.slug === facility.slug;

        return (
        <Card onClick={this.handleCardClick} className={classnames('fc-root', isSelected && 'fc-selected')}
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
                <Grid container alignItems={'center'} direction={'column'} className={'fc-small-grid-container-spacing'}>
                    <Grid item className={classnames('fc-small-grid-item-spacing', 'fc-ellipsis-container', 'fc-title-container')}>
                        <Typography type={'subheading'} align={'center'} className={classnames('fc-title', 'fc-one-line-ellipsis')}>
                            {removeBrackets(facility.facility_name)}
                        </Typography>
                    </Grid>
                    <Grid item className={'fc-small-grid-item-spacing'}>
                        <FacilityCategory category={facility.facility_category} />
                    </Grid>
                </Grid>

                <Grid container justify={'space-around'} className={'fc-extra-info-wrapper'}>
                    <Grid item className={'fc-extra-info'}>
                        <FacilityStatus facility={facility}/>
                    </Grid>

                    <Grid item className={'fc-extra-info'}>
                        <Typography type={'caption'}>
                            <LocationOnIcon className={'fc-card-map-marker-icon'}/>
                        </Typography>
                        <Typography title={facility.facility_location.building} type={'caption'} align={'center'} className={'fc-two-line-ellipsis'}>
                            {facility.facility_location.building}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>

            <FacilityDialog facility={facility} facilities={facilities} isOpen={isSelected} onClose={this.handleCardClick} />
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
    removeFavoriteFacility,
    setSidebar,
})(FacilityCard);