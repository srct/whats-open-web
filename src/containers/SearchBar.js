import React from 'react';
import {connect} from 'react-redux';
import {setSearchTerm} from '../actions/ui';
import SearchIcon from 'material-ui-icons/Search';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import classNames from 'classnames';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isFocused: false,
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

    clear = () => {
        this.setState({
            value: ''
        });

        this.props.setSearchTerm('');
    };

    render() {
        return (
            <Paper className={classNames('search-bar-paper-background', this.state.isFocused && 'search-bar-focus',
                this.state.value && 'search-bar-has-value')}>
                <div className={'search-bar-left-search-container'}>
                    <SearchIcon className={'search-bar-search-icon'}/>
                </div>
                <Input
                    placeholder="Names, Locations, etc."
                    autoFocus
                    disableUnderline
                    className={'search-bar-input'}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    inputProps={{
                        'aria-label': 'Search Bar',
                    }}
                    value={this.state.value}
                />
                <IconButton onClick={this.clear} className={'search-bar-close-btn'}>
                    <CloseIcon />
                </IconButton>
            </Paper>
        );
    }
}

export default connect(null, {setSearchTerm})(SearchBar);