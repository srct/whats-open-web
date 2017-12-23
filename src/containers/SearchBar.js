import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {withStyles} from 'material-ui/styles';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {setSearchTerm} from '../actions/ui';
import Search from 'material-ui-icons/Search'
import Input from 'material-ui/Input';

class SearchBar extends React.Component {
    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
        this.props.setSearchTerm(e.target.value)
    };

    render() {
        return (
            <Paper className={'search-bar-paper-background'} elevation={3}>
                <Input
                    placeholder="names, locations, etc"
                    disableUnderline
                    fullWidth
                    autoFocus
                    className={'search-bar-no-suggest-input'}
                    onChange={this.handleChange}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
                <div className={'search-bar-right-search-container'}>
                    <Search className={'search-bar-search-icon'}/>
                </div>
            </Paper>
        );
    }
}

export default connect(null, {setSearchTerm})(SearchBar);