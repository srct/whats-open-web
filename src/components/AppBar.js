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
import classNames from 'classnames'

class CustomAppBar extends React.Component {

    constructor(props) {
        super();
        this.state = {
            isAppBarExpanded: false
        };

        this.toggleExpand = this.toggleExpand.bind(this);
    }

    toggleExpand() {
        this.setState({
            isAppBarExpanded: !this.state.isAppBarExpanded
        })
    };

    render() {
        return (<div>
            <AppBar position="absolute" className={this.props.classes.appBar}>
                <Toolbar className={this.props.classes.toolBar}>
                    <img src={require('../images/SRCT_square.svg')} className={this.props.classes.navbarLogo} />
                    <Typography type="title" className={classNames(this.props.classes.title, this.props.classes.navbarTextColor)}>
                        What's Open
                    </Typography>
                    <IconButton onClick={this.toggleExpand} aria-label="Menu"
                                className={classNames(this.props.classes.appBarMenuButton, this.props.classes.navbarTextColor)}>
                        <MenuIcon/>
                    </IconButton>
                    <div className={classNames(this.props.classes.linkContainer, !this.state.isAppBarExpanded && this.props.classes.hide)}>
                        <Button className={classNames(this.props.classes.appBarLinkButton, this.props.classes.navbarTextColor)}>
                            About
                        </Button>
                        <Button className={classNames(this.props.classes.appBarLinkButton, this.props.classes.navbarTextColor)}>
                            Feedback
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>);
    };
}

CustomAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styleSheet = {
    '@media screen and (max-width: 600px)': {
        appBarLinkButton: {
            display: 'block',
            padding: 0,
            textAlign: 'left'
        },
        appBarMenuButton: {
            display: 'inherit !important'
        },
        hide: {
            maxHeight: '0 !important',
            overflow: 'hidden'
        },
        toolBar: {
            flexWrap: 'wrap',
        },
        linkContainer: {
            display: 'block',
            flexBasis: '100%',
            transition: 'ease-in-out 2s'
        }
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: '0px 1px 0px 0px rgba(0, 0, 0, 0.2)'
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
    },
};

export default compose(withStyles(styleSheet), withTheme)(CustomAppBar);
