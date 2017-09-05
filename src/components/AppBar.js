import React from 'react';
import PropTypes from 'prop-types';
import { withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { compose } from 'redux';
import { withTheme } from 'material-ui/styles';
import classNames from 'classnames';

function customAppBar({ classes, handleMenuClick, isOpen}) {
  return (
    <div  >
        <AppBar  position="absolute" >
            <Toolbar>
                {/* <IconButton onClick={handleMenuClick} color="contrast" aria-label="Menu">
                    <MenuIcon />
                </IconButton> */}
                <Typography type="title" color="inherit" className={classes.title}>
                    Title
                </Typography>
                {/* <Button color="contrast">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

customAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

const styleSheet =  {
  title: {
    marginRight: 'auto',
  },
  drawerOpen: {
        paddingLeft: 400,
        transition: 'padding 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        height: '100%'
    },
    drawerClosed: {
        paddingLeft: 0,
        transition: 'padding 255ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        height: '100%'
    },
};

export default compose(withStyles(styleSheet),withTheme)(customAppBar);
