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
            <AppBar position="absolute">
                <Toolbar>
                    <Typography type="title" color="inherit" className={this.props.classes.title}>
                        What's Open
                    </Typography>
                    <Button color="contrast" className={this.props.classes.appBarLinkButton}>
                        About
                    </Button>
                    <Button color="contrast" className={this.props.classes.appBarLinkButton}>
                        Feedback
                    </Button>
                    <IconButton onClick={this.toggleDrawer} color="contrast" aria-label="Menu"
                                className={this.props.classes.appBarMenuButton}>
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
                    <Divider />
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
    }
};

export default compose(withStyles(styleSheet), withTheme)(CustomAppBar);
