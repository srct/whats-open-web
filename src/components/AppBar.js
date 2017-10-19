import React from 'react';
import PropTypes from 'prop-types';
import {withStyles, withTheme} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {compose} from 'redux';
import Drawer from 'material-ui/Drawer';
import List, {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import classNames from 'classnames'

class CustomAppBar extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isDrawerOpen: false
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer() {
        this.setState({
            isDrawerOpen: !this.state.isDrawerOpen
        })
    };

    render() {
        return (<div>
            <AppBar position="absolute" className={this.props.classes.appBar}>
                <Toolbar>
                    <img src={require('../images/SRCT_square.svg')} className={this.props.classes.navbarLogo} />
                    <Typography type="title" className={classNames(this.props.classes.title, this.props.classes.navbarTextColor)}>
                        What's Open
                    </Typography>
                    <Button className={classNames(this.props.classes.appBarLinkButton, this.props.classes.navbarTextColor)}>
                        About
                    </Button>
                    <Button className={classNames(this.props.classes.appBarLinkButton, this.props.classes.navbarTextColor)}>
                        Feedback
                    </Button>
                    <IconButton onClick={this.toggleDrawer} aria-label="Menu"
                                className={classNames(this.props.classes.appBarMenuButton, this.props.classes.navbarTextColor)}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={this.state.isDrawerOpen} onRequestClose={this.toggleDrawer}>
                <List className={this.props.classes.appBarDrawerList}>
                    <ListItem>
                        <Typography type="title" color="inherit">
                            What's Open
                        </Typography>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Button className={this.props.classes.drawerLinkButton}>
                            About
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button className={this.props.classes.drawerLinkButton}>
                            Feedback
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        </div>);
    };
}

CustomAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styleSheet = {
    '@media screen and (max-width: 600px)': {
        appBarLinkButton: {
            display: 'none',
        },
        appBarMenuButton: {
            display: 'inherit !important'
        }
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: '0px 1px 0px 0px rgba(0, 0, 0, 0.2)'
    },
    appBarDrawerList: {
        width: '250px'
    },
    drawerLinkButton: {
        width: '100%'
    },
    title: {
        marginRight: 'auto',
    },
    appBarMenuButton: {
        display: 'none'
    },
    navbarLogo: {
        width: '30px',
        height: '30px',
        marginRight: '5px'
    },
    navbarTextColor: {
        color: '#354052'
    }
};

export default compose(withStyles(styleSheet), withTheme)(CustomAppBar);
