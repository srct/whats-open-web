import React from 'react';
import {withStyles} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import RestaurantIcon from 'material-ui-icons/Restaurant';
import RestaurantMenuIcon from 'material-ui-icons/RestaurantMenu';
import StoreIcon from 'material-ui-icons/Store';
import LocalCafeIcon from 'material-ui-icons/LocalCafe';
import LocalPrintShopIcon from 'material-ui-icons/LocalPrintshop';
import LocalPostOfficeIcon from 'material-ui-icons/LocalPostOffice';
import FitnessCenterIcon from 'material-ui-icons/FitnessCenter';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'
import {amber, purple, brown, grey, teal, blue, deepOrange, lime} from 'material-ui/colors';

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

const FacilityCategory = ({classes, category}) => {

    const generateAvatar = () => {
        let color;
        let icon;

        /*
            TODO: May not want to hardcode the id's. Can be dynamically retrieved from /api/categories.
            this wouldn't be of any use unless the API returns something to indicate the icon / color.
         */

        switch (category.id) {
            case 1: //Dining Hall
                color = amber[500];
                icon = <RestaurantMenuIcon className={classes.categoryIcon}/>;
                break;
            case 2: //Restaurant
                color = blue[500];
                icon = <RestaurantIcon className={classes.categoryIcon}/>;
                break;
            case 3: //Convenience Store
                color = purple[500];
                icon = <StoreIcon className={classes.categoryIcon}/>;
                break;
            case 4: //Cafe
                color = brown[500];
                icon = <LocalCafeIcon className={classes.categoryIcon}/>;
                break;
            //case 5: //Take out dining hall
                //TODO: No idea for this icon...
                //break;
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