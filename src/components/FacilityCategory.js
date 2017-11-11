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

const FacilityCategory = ({category}) => {

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
                icon = <RestaurantIcon className={'facility-category-icon'}/>;
                break;
            case 3: //Convenience Store
                color = blue[500];
                icon = <StoreIcon className={'facility-category-icon'}/>;
                break;
            case 4: //Cafe
                color = brown[500];
                icon = <LocalCafeIcon className={'facility-category-icon'}/>;
                break;
            case 6: //Athletic Facility
                color = teal[500];
                icon = <FitnessCenterIcon className={'facility-category-icon'}/>;
                break;
            case 7: //TODO: Print Services - NOT IN API
                color = grey[500];
                icon = <LocalPrintShopIcon className={'facility-category-icon'} />;
                break;
            case 8: //TODO Mailroom - NOT IN API
                color = deepOrange[500];
                icon = <LocalPostOfficeIcon className={'facility-category-icon'}/>;
                break;
            default:
                color = lime[500];
                icon = <ShoppingCartIcon className={'facility-category-icon'}/>
        }

        return (
            <Avatar className={'facility-category-avatar'} style={{backgroundColor: color}}>
                {icon}
            </Avatar>
        )
    };

    return (
        <div className={'facility-category-wrapper'}>
            {/* {generateAvatar()} */}
            <Typography type={'body1'} noWrap>
                {category.name}
            </Typography>
        </div>
    )
};

export default FacilityCategory;