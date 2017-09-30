import React from 'react'
import {withStyles} from 'material-ui/styles';
import grey from 'material-ui/colors/grey'
import pink from 'material-ui/colors/pink';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PropTypes from 'prop-types';

class FavoriteButton extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.stopPropagation(); //Stops the card from being selected in the sidebar.

        if (this.props.isFavorite) {
            this.props.removeFavoriteFacility(this.props.facility.slug);
        } else {
            this.props.addFavoriteFacility(this.props.facility.slug);
        }
    }

    render() {
        if (this.props.isFavorite) {
            return (<FavoriteIcon onClick={this.handleClick} className={this.props.classes.heart}
                                  style={{color: pink[400]}}/>);
        }

        return (<FavoriteBorderIcon onClick={this.handleClick} className={this.props.classes.heart}
                                    style={{color: grey[400]}}/>);
    }
}

FavoriteButton.propTypes = {
    classes: PropTypes.object.isRequired,
    facility: PropTypes.object.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    addFavoriteFacility: PropTypes.func.isRequired,
    removeFavoriteFacility: PropTypes.func.isRequired,
};

const styleSheet = {
    heart: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        height: '24px',
        width: '24px',
        padding: '5px',
        cursor: 'pointer',
    }
};

export default withStyles(styleSheet)(FavoriteButton);