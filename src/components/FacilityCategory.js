import React from 'react';
import {withStyles} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import RestaurantIcon from 'material-ui-icons/Restaurant';
import StoreIcon from 'material-ui-icons/Store';
import LocalCafeIcon from 'material-ui-icons/LocalCafe';
import LocalPrintShopIcon from 'material-ui-icons/LocalPrintshop';
import LocalPostOfficeIcon from 'material-ui-icons/LocalPostOffice';
import FitnessCenterIcon from 'material-ui-icons/FitnessCenter';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'
import {red, blue, brown, grey, teal, deepOrange, lime} from 'material-ui/colors';

const FacilityCategory = ({classes, category}) => {

    const generateAvatar = () => {
        let color;
        let icon;

        /*
            TODO: May not want to hardcode the id's. Can be dynamically retrieved from /api/categories.
            this wouldn't be of any use unless the API returns something to indicate the icon / color.
         */

        /*
            Proposed Category Types:

            dining hall
            convenience store
            cafe
            restaurant
            food truck ???
            athletic
            mailroom
            print services
            retail
            school offices
            student centers
         */
        switch (category.id) {
            case 1: //Dining Hall
            case 2: //Restaurant
            case 5: //Take out dining hall
                color = red[400];
                icon = <RestaurantIcon className={classes.categoryIcon}/>;
                break;
            case 3: //Convenience Store
                color = blue[500];
                icon = <StoreIcon className={classes.categoryIcon}/>;
                break;
            case 4: //Cafe
                color = brown[500];
                icon = <LocalCafeIcon className={classes.categoryIcon}/>;
                break;
            case 6: //Athletic Facility
                color = teal[500];
                icon = <FitnessCenterIcon className={classes.categoryIcon}/>;
                break;
            case 7: //TODO: Print Services - NOT IN API
                color = grey[500];
                icon = <LocalPrintShopIcon className={classes.categoryIcon} />;
                break;
            case 8: //TODO Mailroom - NOT IN API
                color = deepOrange[500];
                icon = <LocalPostOfficeIcon className={classes.categoryIcon}/>;
                break;
            default:
                color = lime[500];
                icon = <ShoppingCartIcon className={classes.categoryIcon}/>
        }

        return (
            <Avatar className={classes.avatar} style={{backgroundColor: color}}>
                {icon}
            </Avatar>
        )
    };

    return (
        <div className={classes.categoryWrapper}>
            {generateAvatar()}
            <Typography type={'body1'} noWrap>
                {category.name}
            </Typography>
        </div>
    )
};

const styleSheet = {
    categoryWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    categoryIcon: {
        width: '14px !important',
        height: '14px !important',
        padding: '4px !important',
    },
    avatar: {
        width: 'auto !important',
        height: 'auto !important',
        marginRight: '8px'
    },
};

export default withStyles(styleSheet)(FacilityCategory);