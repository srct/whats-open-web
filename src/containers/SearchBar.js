import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setCampusRegion, setSearchTerm} from '../actions/ui';
import SearchIcon from 'material-ui-icons/Search';
import CloseIcon from 'material-ui-icons/Close';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import {MenuItem} from 'material-ui/Menu';
import Select from 'material-ui/Select';
import {FormControl} from 'material-ui/Form';
import classNames from 'classnames';
import ReactPiwik from 'react-piwik';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isFocused: false,
            isMobileOpen: false,
            value: '',
            campus: 'fairfax'
        };
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });

        this.props.setSearchTerm(e.target.value);
    };

    handleRegionChange = (e) => {
        ReactPiwik.push(['trackEvent', 'change-campus', e.target.value]);
        this.setState({
            campus: e.target.value
        });

        this.props.setCampusRegion(e.target.value);
    };

    handleFocus = () => {
        ReactPiwik.push(['trackEvent', 'search-action', 'focused']);
        this.setState({
            isFocused: true
        });
    };

    handleBlur = () => {
        this.setState({
            isFocused: false
        });
    };

    handleMobileExpand = () => {
        this.setState({
            isMobileOpen: true
        });

        this.props.onSearchExpand();

        /*
            This timeout is necessary because inputElement is not displayed when execution reaches this point.
            By using setTimeout with no delay, inputElement.focus() is added to the end of the execution stack, therefore
            being executed after the input is visible.,
         */
        setTimeout(() => this.inputElement.focus());
    };

    handleMobileCollapse = () => {
        this.setState({
            isMobileOpen: false
        });

        this.props.onSearchCollapse();
    };

    clear = () => {
        this.setState({
            value: ''
        });

        this.props.setSearchTerm('');
    };

    render() {
        return (
            <Paper className={classNames('search-bar-paper-background', this.state.isFocused && 'search-bar-focus',
                this.state.value && 'search-bar-has-value', this.state.isMobileOpen && 'search-bar-mobile-open')}>
                <IconButton onClick={this.handleMobileExpand} disableRipple className={'search-bar-search-btn'}>
                    <SearchIcon className={'search-bar-search-icon'}/>
                </IconButton>
                <IconButton onClick={this.handleMobileCollapse} disableRipple className={'search-bar-back-btn'}>
                    <ArrowBackIcon className={'search-bar-back-icon'}/>
                </IconButton>
                <Input
                    placeholder="Name, Location, etc."
                    disableUnderline
                    className={classNames('search-bar-input', {
                        'hide-search-input': !this.state.isMobileOpen
                    })}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    inputProps={{
                        'aria-label': 'Search Bar'
                    }}
                    inputRef={(el) => this.inputElement = el}
                    value={this.state.value}
                />
                <IconButton onClick={this.clear} disableRipple className={'search-bar-close-btn'}>
                    <CloseIcon/>
                </IconButton>
                <FormControl className={'search-bar-campus-control'}>
                    <Select
                        disableUnderline
                        value={this.state.campus}
                        onChange={this.handleRegionChange}>
                        <MenuItem value={'fairfax'}>Fairfax</MenuItem>
                        <MenuItem value={'arlington'}>Arlington</MenuItem>
                        <MenuItem value={'prince william'}>SciTech</MenuItem>
                        <MenuItem value={'front royal'}>Front Royal</MenuItem>
                    </Select>
                </FormControl>
            </Paper>
        );
    }
}

SearchBar.propTypes = {
    onSearchExpand: PropTypes.func,
    onSearchCollapse: PropTypes.func
};

export default connect(null, {
    setSearchTerm,
    setCampusRegion
})(SearchBar);