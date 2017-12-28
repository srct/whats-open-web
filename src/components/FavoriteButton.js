import React from 'react'
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class FavoriteButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
        }
    }

    handleClick = (e) => {
        e.stopPropagation(); //Stops the card from being selected in the sidebar.

        if (this.props.isFavorite) {
            this.props.removeFavoriteFacility(this.props.facility.slug);
        } else {
            this.props.addFavoriteFacility(this.props.facility.slug);
        }
    };


    render() {
        const {isHovered} = this.props;
        if (this.props.isFavorite) {
            return (<FavoriteIcon onClick={this.handleClick}
                                  className={classNames('favorite-button-heart', 'favorite-button-heart-favorited')}/>);
        }

        return (<FavoriteBorderIcon onClick={this.handleClick}
                                    className={classNames('favorite-button-heart', isHovered ? 'favorite-button-heart-hover' : 'favorite-button-heart-no-hover')}/>);
    }
}

FavoriteButton.propTypes = {
    facility: PropTypes.object.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    addFavoriteFacility: PropTypes.func.isRequired,
    removeFavoriteFacility: PropTypes.func.isRequired,
};

export default FavoriteButton;