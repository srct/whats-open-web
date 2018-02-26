import React from 'react';
import {connect} from 'react-redux';
import AppBar from '../components/AppBar';
import Sidebar from '../components/Sidebar';
import Route from 'react-router-dom/Route';
import {getAlerts, getFacilities, setAlerts, setFacilities, sortFacilityCards} from '../actions/api';
import {setAllFavorites, setSelectedFacility, setSidebar} from '../actions/ui';
import CardContainer from '../components/CardContainer';

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        /*
            This is done in order to immediately load the page (retrieving from local storage is faster
            than an API call). After retrieving from local storage, then call the API to see if there
            are any updates.
         */
        try {
            if (localStorage.getItem('facilities')) {
                const facilities = localStorage.getItem('facilities');
                this.props.setFacilities(facilities);
            }

            if (localStorage.getItem('favorites')) {
                const favorites = JSON.parse(localStorage.getItem('favorites'));
                this.props.setAllFavorites(favorites);
            }
            this.props.sortFacilityCards();
        } catch (e) {
            console.warn('you should enable cookies so we can remember what places you favorite');
        }

        this.props.getFacilities();
        this.props.getAlerts();
    };

    render() {
        const {isSidebarOpen, facilities, searchTerm, campusRegion, setSidebar, setSelectedFacility} = this.props;

        return (
            <div className={'layout-root'}>
                <AppBar isOpen={false}/>
                <div className={'layout-container'}>
                    <div className={'layout-main-content'}>
                        <div className={'layout-card-container'}>
                            <CardContainer styles={'layout-card-container'} searchTerm={searchTerm}
                                           campusRegion={campusRegion} facilities={facilities}/>
                        </div>
                    </div>

                    <Route path={'/facility/:slug'} render={(route) => {
                        const facility = facilities.find((f) => f.slug === route.match.params.slug);
                        return facility ? (
                            <Sidebar facilities={facilities} facility={facility} isSidebarOpen={isSidebarOpen}
                                     setSidebar={setSidebar} setSelectedFacility={setSelectedFacility}
                                     campusRegion={campusRegion}/>
                        ) : null;
                    }}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        facilities: state.facilities.data,
        alerts: state.alerts,
        favorites: state.ui.favorites,
        searchTerm: state.ui.search.term,
        campusRegion: state.ui.search.campusRegion,
        isLoading: state.facilities.isLoading,
        selectedFacility: state.ui.selectedFacility,
        isSidebarOpen: state.ui.sidebar.isOpen
    };
}

export default connect(mapStateToProps, {
    getFacilities,
    setFacilities,
    getAlerts,
    setAlerts,
    setAllFavorites,
    sortFacilityCards,
    setSidebar,
    setSelectedFacility
})(Layout);
