import React from 'react'
import {withStyles} from 'material-ui/styles';
import yellow from 'material-ui/colors/yellow';
import StarIcon from 'material-ui-icons/Star';
import StarBorderIcon from 'material-ui-icons/StarBorder';
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
            return (<StarIcon onClick={this.handleClick} className={this.props.classes.star}/>);
        }

        return (<StarBorderIcon onClick={this.handleClick} className={this.props.classes.star}/>);
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
    star: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        color: yellow[600],
        height: '26px',
        width: '26px',
        padding: '4px',
        cursor: 'pointer',
    }
};

export default withStyles(styleSheet)(FavoriteButton);