import React from 'react'
import {withStyles} from 'material-ui/styles';
import yellow from 'material-ui/colors/yellow';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {addFavoriteFacility, removeFavoriteFacility} from "../actions/ui";
import StarIcon from 'material-ui-icons/Star';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import PropTypes from 'prop-types';

class FavoriteButton extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            isFavorite: this.props.favorites.includes(this.props.favorites.slug)
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isFavorite: nextProps.favorites.includes(nextProps.facility.slug)
        });
    }

    handleClick() {
        if (this.state.isFavorite) {
            this.props.removeFavoriteFacility(this.props.facility.slug);
        } else {
            this.props.addFavoriteFacility(this.props.facility.slug);
        }
    }

    render() {
        if (this.state.isFavorite) {
            return (<StarIcon onClick={this.handleClick} className={this.props.classes.star}/>);
        }

        return (<StarBorderIcon onClick={this.handleClick} className={this.props.classes.star}/>);
    }
}

FavoriteButton.propTypes = {
    classes: PropTypes.object.isRequired,
    facility: PropTypes.object.isRequired,
    favorites: PropTypes.array,
    addFavoriteFacility: PropTypes.func.isRequired,
    removeFavoriteFacility: PropTypes.func.isRequired,
};

const styleSheet = {
    star: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        color: yellow[600],
        height: '20px',
        width: '20px',
        cursor: 'pointer',
    }
};

const mapStateToProps = state => ({
    favorites: state.ui.favorites
});

export default compose(connect(mapStateToProps, {
    addFavoriteFacility,
    removeFavoriteFacility
}), withStyles(styleSheet))(FavoriteButton);