import React from 'react'
import {withStyles} from 'material-ui/styles';
import pink from 'material-ui/colors/pink';
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
    }


    render() {
        const {heart,heartFavorited,heartHover,heartNoHover} = this.props.classes;
        const {isHovered} = this.props;
        if (this.props.isFavorite) {
            return (<FavoriteIcon onClick={this.handleClick} className={classNames(heart,heartFavorited)}/>);
        }

        return (<FavoriteBorderIcon onClick={this.handleClick}  className={classNames(heart,{[heartHover]:isHovered,[heartNoHover]:!isHovered})}/>);
    }
}

FavoriteButton.propTypes = {
    classes: PropTypes.object.isRequired,
    facility: PropTypes.object.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    addFavoriteFacility: PropTypes.func.isRequired,
    removeFavoriteFacility: PropTypes.func.isRequired,
};
const sizeScale = .75
const styleSheet = {
    heart: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 24*sizeScale,
        width: 24*sizeScale,
        padding: 5*sizeScale,
        cursor: 'pointer',
    },
    heartFavorited:{
        color:pink[500]
    },
    heartHover:{
       color:'grey' 
    },
    heartNoHover:{
        color:'rgba(0,0,0,0)'
    }
};

export default withStyles(styleSheet)(FavoriteButton);