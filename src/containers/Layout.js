import React from 'react';
import {withStyles } from 'material-ui/styles';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {toggleDrawer} from '../actions/ui';
import AppBar from '../components/AppBar';
import Sidebar from '../components/Sidebar';
import {getFacilities, setFacilities} from '../actions/api'
import Button from 'material-ui/Button';
class Layout extends React.Component {
    constructor(props){
        super(props);
    }
    
    componentWillMount = () => {
        if(localStorage.getItem('facilities')){
            const facilities = localStorage.getItem('facilities') 
            this.props.setFacilities(facilities)
        }
        this.props.getFacilities()
    }

    render() {
        const {classes, isDrawerOpen, toggleDrawer, getFacilities} = this.props;
        return (
            <div className={classes.root}>
                <AppBar isOpen={isDrawerOpen} handleMenuClick={ toggleDrawer }/>
                <div className={classes.container}>
                    <div className={classes.mainContent}>
                        <Button raised onClick={getFacilities} className={classes.button}>
                            Default
                        </Button>
                    </div> 
                    <Sidebar/>
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
    },
}

function mapStateToProps(state) {
    return {
        facilities: state.facilities.data,
        isLoading: state.facilities.isLoading
    }
}

export default compose(connect(mapStateToProps,{toggleDrawer,getFacilities,setFacilities}), withStyles(styleSheet))(Layout);
