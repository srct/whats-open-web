import React from 'react';
import {withStyles } from 'material-ui/styles';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {toggleSidebar,toggleSidebarMap,setAllFavorites} from '../actions/ui';
import AppBar from '../components/AppBar';
import Sidebar from '../components/Sidebar';
import { getFacilities, setFacilities } from '../actions/api';
import Button from 'material-ui/Button';
import CardContainer from '../components/CardContainer';
import SearchBar from './SearchBar';
import Icon from 'material-ui/Icon';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
  ];

class Layout extends React.Component {
    constructor(props){
        super(props);
    }
    
    componentWillMount() {
        /*
            This is done in order to immediately load the page (retrieving from local storage is faster
            than an API call). After retrieving from local storage, then call the API to see if there
            are any updates.
         */
        if(localStorage.getItem('facilities')){
            const facilities = localStorage.getItem('facilities');
            this.props.setFacilities(facilities)
        }
        if(localStorage.getItem('favorites')){
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            this.props.setAllFavorites(favorites);
        }

        this.props.getFacilities()
    };

    render() {
        const {classes, isSidebarOpen, isSidebarMapOpen, toggleSidebar, toggleSidebarMap, getFacilities,sidebarFacility} = this.props;
        return (
            <div className={classes.root}>
                <AppBar isOpen={false} handleMenuClick={ ()=>{} }/>
                <div className={classes.container}>
                    <div className={classes.mainContent}>
                        <SearchBar styles={styleSheet.searchBar} suggestions={suggestions}/>
                        <div className={classes.cardContainer}>
                            <CardContainer styles={styleSheet.cardContainer} searchTerm={this.props.searchTerm} facilities={this.props.facilities}/>
                        </div>
                    </div> 
                    <div className={classes.sidebarToggleContainer}>
                        <button onClick={toggleSidebar} className={classes.openCloseButton}>
                            {isSidebarOpen &&
                            <KeyboardArrowLeft className={classes.arrowIcon}/>
                            }
                            {!isSidebarOpen &&
                            <KeyboardArrowRight className={classes.arrowIcon}/>
                            }
                        </button>
                    </div>
                    <Sidebar facilities={this.props.facilities} facility={sidebarFacility} isSidebarOpen={isSidebarOpen} isSidebarMapOpen={isSidebarMapOpen} toggleSidebarMap={toggleSidebarMap}/>
                </div> 
            </div>
        )
    }
}
const styleSheet = {
    root:{
        paddingTop:64,
        boxSizing:'border-box',
        height:'100%',
    },
    container:{
        width:'100%',
        height:'100%',
        display:'flex'

    },
    mainContent:{
        boxSizing:'border-box',
        position:'relative',
        flex:'1 1 100%',
        height:'100%',
        width: '100%',
        paddingTop:16,
    },
    sidebarToggleContainer:{
        width:16,
        position:'relative',
    },
    openCloseButton:{
        width:24,
        height:48,
        position:'absolute',
        top:16,
        right:-1,
        border:0,
        backgroundColor:'white',
        boxShadow:'0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        outline:'none',
        borderRadius:1,
    },
    arrowIcon:{
        position:'absolute',
        top:12,
        right:0,
        width:24,
        height:24,
    },
    cardContainer:{
        height:'calc(100% - 86px)',
        overflowY:'auto',
        overflowX:'hidden',
    },
    '@media screen and (max-width: 600px)': {
        sidebarToggleContainer: {
            display: 'none'
        }
    }
};

function mapStateToProps(state) {
    return {
        facilities: state.facilities.data,
        searchTerm:state.ui.search.term,
        isLoading: state.facilities.isLoading,
        sidebarFacility:state.ui.sidebar.facility,
        isSidebarOpen: state.ui.sidebar.isOpen,
        isSidebarMapOpen: state.ui.sidebar.isMapOpen,
    }
}

export default compose(connect(mapStateToProps,{toggleSidebar,toggleSidebarMap,getFacilities,setFacilities,setAllFavorites}), withStyles(styleSheet))(Layout);
