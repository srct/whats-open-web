import React from 'react';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import FacilityStatus from '../components/FacilityStatus';
import FavoriteButton from '../components/FavoriteButton';
import FacilityCategory from '../components/FacilityCategory';
import {connect} from 'react-redux';
import {addFavoriteFacility, removeFavoriteFacility, setSelectedFacility, setSidebar} from '../actions/ui';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import {removeBrackets} from '../utils/nameUtils';
import classNames from 'classnames';
import FacilityDialog from '../components/FacilityDialog';
import FacilityUtils from '../utils/facilityUtils';
import ReactPiwik from 'react-piwik';

class FacilityCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHovered: false
        };
    }

    handleCardClick = () => {
        ReactPiwik.push(['trackEvent', 'card-action', 'click']);
        const isSelected = this.props.selectedFacility.slug === this.props.facility.slug;
        this.props.setSelectedFacility(isSelected ? null : this.props.facility);
        this.props.setSidebar(!isSelected);
    };


    handleMouseEnter = () => {
        this.setState({
            isHovered: true
        });
    };

    handleMouseLeave = () => {
        this.setState({
            isHovered: false
        });
    };


    render() {
        const {facility, facilities, favorites, selectedFacility, addFavoriteFacility, removeFavoriteFacility} = this.props;

        const isSelected = selectedFacility.slug === facility.slug;

        const dayOfWeek = [6, 0, 1, 2, 3, 4, 5][new Date().getDay()];

        const getDisplayHours = () => {
            const currentHour = new Date().getHours();
            const todaysHours = FacilityUtils.getHoursByDay(facility, dayOfWeek);

            if (todaysHours.length > 1) {
                for (let i = 0; i < todaysHours.length; i++) {
                    const hour = todaysHours[i];
                    if (currentHour <= parseInt(hour.end) && currentHour >= parseInt(hour.start)) {
                        return hour.text;
                    }
                }
            }

            return todaysHours[0].text;
        };

        const buildingName = facility.facility_location.friendly_building ?
            facility.facility_location.friendly_building :
            facility.facility_location.building;
        return (
            <Card onClick={this.handleCardClick} className={classNames('fc-root', isSelected && 'fc-selected')}
                  onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} elevation={3}>
                {/*<CardMedia className={'fc-media'}
                          image={'https://gmucampus.files.wordpress.com/2010/09/00southside2.jpg'} />*/}

                <div className={'fc-logo-container'}>
                    <img className={'fc-logo'}
                    alt={facility.slug} src={facility.logo} />
                </div>


                <FavoriteButton facility={facility} isFavorite={favorites.includes(facility.slug)}
                                addFavoriteFacility={addFavoriteFacility} isHovered={this.state.isHovered}
                                removeFavoriteFacility={removeFavoriteFacility} />

                <CardContent className={'fc-card-content'}>
                    <Grid container alignItems={'center'} direction={'column'}
                          className={'fc-small-grid-container-spacing'}>
                        <Grid item
                              className={classNames('fc-small-grid-item-spacing', 'fc-ellipsis-container', 'fc-title-container')}>
                            <Typography type={'subheading'} align={'center'}
                                        className={classNames('fc-title', 'fc-one-line-ellipsis')}>
                                {removeBrackets(facility.facility_name)}
                            </Typography>
                        </Grid>
                        <Grid item className={'fc-small-grid-item-spacing'}>
                            <FacilityCategory category={facility.facility_category} />
                        </Grid>
                        <Grid item className={'fc-small-grid-item-spacing'}>
                            <Typography type={'body1'}>
                                {`Today: ${getDisplayHours()}`}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container justify={'space-around'} className={'fc-extra-info-wrapper'}>
                        <Grid item className={'fc-extra-info'}>
                            <FacilityStatus facility={facility} />
                        </Grid>

                        <Grid item className={'fc-extra-info'}>
                            <Typography type={'caption'}>
                                <LocationOnIcon className={'fc-card-map-marker-icon'} />
                            </Typography>
                            <Typography title={buildingName} type={'caption'} align={'center'}
                                        className={'fc-two-line-ellipsis'}>
                                {buildingName}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>

                <FacilityDialog facility={facility} facilities={facilities} isOpen={isSelected}
                                onClose={this.handleCardClick} />
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    favorites: state.ui.favorites,
    selectedFacility: state.ui.selectedFacility
});

export default connect(mapStateToProps, {
    setSelectedFacility,
    addFavoriteFacility,
    removeFavoriteFacility,
    setSidebar
})(FacilityCard);