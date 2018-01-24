import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchBar from '../containers/SearchBar';
import classNames from 'classnames';
import AlertContainer from '../containers/AlertContainer';

class CustomAppBar extends React.Component {

    constructor() {
        super();
        this.state = {
            isAppBarExpanded: false,
            isSearchExpanded: false
        };

        this.toggleExpand = this.toggleExpand.bind(this);
    }

    toggleExpand() {
        this.setState({
            isAppBarExpanded: !this.state.isAppBarExpanded
        });
    }

    render() {
        return (
            <div>
                <AppBar position="absolute"
                        className={classNames('app-bar', this.state.isSearchExpanded && 'app-bar-search-expanded')}>
                    <Toolbar className={'app-bar-tool-bar'}>
                        <div className={'app-bar-logo-name'}>
                            <img src={require('../images/SRCT_square.svg')} className={'app-bar-logo'}/>
                            <Typography type="title" className={classNames('app-bar-title', 'app-bar-text-color')}>
                                What's Open
                            </Typography>
                        </div>
                        <AlertContainer/>
                        <div className={'app-bar-search-menu'}>
                            <SearchBar onSearchExpand={() => this.setState({
                                isSearchExpanded: true
                            })}
                                       onSearchCollapse={() => this.setState({
                                           isSearchExpanded: false
                                       })}/>
                            <IconButton onClick={this.toggleExpand} aria-label="Menu"
                                        className={classNames('app-bar-menu-button', 'app-bar-text-color')}>
                                <MenuIcon/>
                            </IconButton>
                        </div>
                        <div
                            className={classNames('app-bar-link-container', !this.state.isAppBarExpanded && 'app-bar-hide')}>
                            <Button className={classNames('app-bar-link-button', 'app-bar-text-color')}
                                    href={'https://srct.gmu.edu/'} target="_blank" rel="noopener">
                                About
                            </Button>
                            <Button className={classNames('app-bar-link-button', 'app-bar-text-color')}
                                    href={'https://srct.gmu.edu/contact/'} target="_blank" rel="noopener">
                                Feedback
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default CustomAppBar;
