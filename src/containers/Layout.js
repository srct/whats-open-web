import React from 'react';
import {connect} from 'react-redux';
import {setAllFavorites, toggleSidebar, toggleSidebarMap} from '../actions/ui';
import AppBar from '../components/AppBar';
import Sidebar from '../components/Sidebar';
import {getFacilities, setFacilities} from '../actions/api';
import CardContainer from '../components/CardContainer';
import SearchBar from './SearchBar';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';


class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        /*
            This is done in order to immediately load the page (retrieving from local storage is faster
            than an API call). After retrieving from local storage, then call the API to see if there
            are any updates.
         */
        if (localStorage.getItem('facilities')) {
            const facilities = localStorage.getItem('facilities');
            this.props.setFacilities(facilities)
        }
        if (localStorage.getItem('favorites')) {
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            this.props.setAllFavorites(favorites);
        }

        this.props.getFacilities()
    };

    render() {
        const {isSidebarOpen, isSidebarMapOpen, toggleSidebar, toggleSidebarMap, getFacilities, sidebarFacility} = this.props;
        return (
            <div className={'layout-root'}>
                <AppBar isOpen={false} handleMenuClick={() => {
                }}/>
                <div className={'layout-container'}>
                    <div className={'layout-main-content'}>
                        <SearchBar suggestions={{}}/>
                        <div className={'layout-card-container'}>
                            <CardContainer styles={'layout-card-container'} searchTerm={this.props.searchTerm}
                                           facilities={this.props.facilities}/>
                        </div>
                    </div>
                    <div className={'layout-sidebar-toggle-container'}>
                        <button onClick={toggleSidebar} className={'layout-sidebar-toggle-btn'}>
                            {isSidebarOpen &&
                            <KeyboardArrowLeft className={'layout-arrow-icon'}/>
                            }
                            {!isSidebarOpen &&
                            <KeyboardArrowRight className={'layout-arrow-icon'}/>
                            }
                        </button>
                    </div>
                    <Sidebar facilities={this.props.facilities} facility={sidebarFacility} isSidebarOpen={isSidebarOpen}
                             isSidebarMapOpen={isSidebarMapOpen} toggleSidebarMap={toggleSidebarMap}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        facilities: state.facilities.data,
        favorites: state.ui.favorites,
        searchTerm: state.ui.search.term,
        isLoading: state.facilities.isLoading,
        sidebarFacility: state.ui.sidebar.facility,
        isSidebarOpen: state.ui.sidebar.isOpen,
        isSidebarMapOpen: state.ui.sidebar.isMapOpen,
    }
}

export default connect(mapStateToProps, {
    toggleSidebar,
    toggleSidebarMap,
    getFacilities,
    setFacilities,
    setAllFavorites
})(Layout);
