import React from 'react';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import {compose, bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {toggleDrawer} from '../actions/ui';
import AppBar from '../components/AppBar';
import Drawer from '../components/Drawer';
class Layout extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const {classes, isDrawerOpen, toggleDrawer} = this.props;
        return (
            <div>
                <Drawer isOpen={isDrawerOpen} handleLeftClose={toggleDrawer}/>
                <AppBar isOpen={isDrawerOpen} handleMenuClick={ toggleDrawer }/>
            </div>
        )
    }
}
const styleSheet = createStyleSheet('Layout', theme => ({}));

function mapStateToProps(state) {
    return {
        isDrawerOpen: state.ui.drawer.isOpen
    }
}

export default compose(connect(mapStateToProps,{toggleDrawer}), withStyles(styleSheet))(Layout);
