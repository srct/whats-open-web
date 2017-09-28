import React from 'react';
import {withStyles } from 'material-ui/styles';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {toggleDrawer,setAllFavorites} from '../actions/ui';
import AppBar from '../components/AppBar';
import Sidebar from '../components/Sidebar';
import { getFacilities, setFacilities } from '../actions/api';
import Button from 'material-ui/Button';
import CardContainer from '../components/CardContainer';
import SearchBar from './SearchBar';

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
    
    componentWillMount = () => {
        if(localStorage.getItem('facilities')){
            const facilities = localStorage.getItem('facilities') 
            this.props.setFacilities(facilities)
        }

        if(localStorage.getItem('favorites')){
            const favorites = localStorage.getItem('favorites')
            this.props.setAllFavorites(favorites);
        }

        this.props.getFacilities()
    }

    render() {
        const {classes, isDrawerOpen, toggleDrawer, getFacilities,sidebarFacility} = this.props;
        return (
            <div className={classes.root}>
                <AppBar isOpen={isDrawerOpen} handleMenuClick={ toggleDrawer }/>
                <div className={classes.container}>
                    <div className={classes.mainContent}>
                        {/* <Button raised onClick={getFacilities} className={classes.button}>
                            Default
                        </Button> */}
                        <SearchBar suggestions={suggestions}/>
                        <CardContainer searchTerm={this.props.searchTerm} facilities={this.props.facilities}/>
                    </div> 
                    <Sidebar facility={sidebarFacility}/>
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
        flex:'1 1 100%',
        height:'100%',
        padding:16,
    },
}

function mapStateToProps(state) {
    return {
        facilities: state.facilities.data,
        searchTerm:state.ui.search.term,
        isLoading: state.facilities.isLoading,
        sidebarFacility:state.ui.sidebar,
    }
}

export default compose(connect(mapStateToProps,{toggleDrawer,getFacilities,setFacilities,setAllFavorites}), withStyles(styleSheet))(Layout);
