import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { withStyles } from 'material-ui/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setSearchTerm} from '../actions/ui';
import Search from 'material-ui-icons/Search'
import Input from 'material-ui/Input';
// import Select from 'material-ui/Select';

const createSuggestions = () => {

}



function renderInput(inputProps) {
  const { classes, home, value, ref, ...other } = inputProps;

  return (
    <TextField
      autoFocus={home}
      className={classes.textField}
      value={value}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        disableUnderline:true,
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={index} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function getSuggestions(value,suggestions) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    // height: 40,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex:1000,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
    height:48,
  },
  input:{
      height:40,
      marginLeft:8,
  },
  paperBackground:{
      height:54,
      maxWidth:600,
      width:'90%',
      display:'flex',
      margin:'0px auto 16px auto',
  },
  rightSearchContainer:{
    height:'100%',
    display:'flex',
    alignItems:'center',
    marginLeft:8,
    marginRight:8,
  },
  searchIcon:{
      display:'block',
      opacity:.54,
  },
  noSuggestInput:{
      display:'flex',
      alignItems:'center',
      marginLeft:8,
  }
});

class IntegrationAutosuggest extends React.Component {
  state = {
    value: '',
    // suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    // this.setState({
    //   suggestions: getSuggestions(value,this.props.suggestions),
    // });
  };

  handleSuggestionsClearRequested = () => {
    // this.setState({
    //   suggestions: [],
    // });
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
    this.props.setSearchTerm(e.target.value)
  };

  render() {
    const { classes,setSearchTerm,suggestions } = this.props;

    return (
        <Paper className={classes.paperBackground} elevation={3}>

      {/* <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={getSuggestions(this.state.value,suggestions)}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          autoFocus: true,
          classes,
          placeholder: 'names, locations, etc',
          value: this.state.value,
          onChange: this.handleChange,
        }}
      /> */}
      <Input
      placeholder="names, locations, etc"
      disableUnderline
      fullWidth
      autoFocus
      className={classes.noSuggestInput}
      onChange={this.handleChange}
      inputProps={{
        'aria-label': 'Description',
      }}
    />
      <div className={classes.rightSearchContainer}>
      {/* <Select
      native
      value={this.state.age}
      onChange={this.handleChange('age')}
      input={<Input id="age-native-simple" />}
    >
      <option value="" />
      <option value={10}>Ten</option>
      <option value={20}>Twenty</option>
      <option value={30}>Thirty</option>
    </Select> */}
          <Search className={classes.searchIcon}/>
      </div>
        </Paper>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(connect(null,{setSearchTerm}),withStyles(styles))(IntegrationAutosuggest);