import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setSearchTerm} from '../actions/ui';
import SearchIcon from 'material-ui-icons/Search';
import CloseIcon from 'material-ui-icons/Close';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import classNames from 'classnames';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isFocused: false,
            isMobileOpen: false,
            value: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
        this.props.setSearchTerm(e.target.value)
    };

    handleFocus = () => {
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

        this.inputElement.focus();
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
                    className={'search-bar-input'}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    inputProps={{
                        'aria-label': 'Search Bar',
                    }}
                    inputRef={el => this.inputElement = el}
                    value={this.state.value}
                />
                <IconButton onClick={this.clear} disableRipple className={'search-bar-close-btn'}>
                    <CloseIcon/>
                </IconButton>
            </Paper>
        );
    }
}

SearchBar.propTypes = {
    onSearchExpand: PropTypes.func,
    onSearchCollapse: PropTypes.func
};

export default connect(null, {setSearchTerm})(SearchBar);