import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchBar from '../containers/SearchBar';
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
            <AppBar position="absolute" className={'app-bar'}>
                <Toolbar className={'app-bar-tool-bar'}>
                    <img src={require('../images/SRCT_square.svg')} className={'app-bar-logo'}/>
                    <Typography type="title" className={classNames('app-bar-title', 'app-bar-text-color')}>
                        What's Open
                    </Typography>
                    <IconButton onClick={this.toggleExpand} aria-label="Menu"
                                className={classNames('app-bar-menu-button', 'app-bar-text-color')}>
                        <MenuIcon/>
                    </IconButton>
                    <SearchBar />
                    <div
                        className={classNames('app-bar-link-container', !this.state.isAppBarExpanded && 'app-bar-hide')}>
                        <Button
                            className={classNames('app-bar-link-button', 'app-bar-text-color')}>
                            About
                        </Button>
                        <Button
                            className={classNames('app-bar-link-button', 'app-bar-text-color')}>
                            Feedback
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>);
    };
}

export default CustomAppBar;
