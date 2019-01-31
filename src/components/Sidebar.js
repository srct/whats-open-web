import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import TextwTitle from '../components/TextwTitle';
import FacilitiesMap from '../components/FacilitiesMap';
import MapDialog from '../components/MapDialog';
import classNames from 'classnames';
import WeekHours from './WeekHours';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import {removeBrackets} from '../utils/nameUtils';
import phoneFormatter from 'phone-formatter';
import ReactPiwik from 'react-piwik';
class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mapDialogOpen: false
        };
    }

    handleSidebarClose = () => {
        this.props.setSelectedFacility(null);
        this.props.setSidebar(false);
    };

    handleMapDialogClose = () => {
        ReactPiwik.push(['trackEvent', 'map-action', 'close']);
        this.setState({
            mapDialogOpen: false
        });
    };

    handleMapDialogOpen = () => {
        ReactPiwik.push(['trackEvent', 'map-action', 'open']);
        this.setState({
            mapDialogOpen: true
        });
    }

    render() {
        const {facility, isSidebarOpen, facilities} = this.props;
        const {mapDialogOpen} = this.state;

        return (
            <div
                className={classNames(['card-container-offset', (isSidebarOpen && 'card-container-offset-open'), (!isSidebarOpen && 'card-container-offset-closed')])}>
                <meta></meta>
                <Paper
                    className={classNames(['sidebar-root', (isSidebarOpen && 'sidebar-open'), (!isSidebarOpen && 'sidebar-closed')])}>
                    <IconButton className={'sidebar-close-btn'} onClick={this.handleSidebarClose}>
                        <CloseIcon />
                    </IconButton>
                    <div className={'sidebar-row1'}>
                        <Avatar className={'sidebar-avatar'} src={facility.logo} />
                        <div className={'sidebar-title'}>
                            <Typography type="display1">{removeBrackets(facility.facility_name)}</Typography>
                        </div>
                    </div>
                    <Divider className={'sidebar-divider'} />
                    <div className={'sidebar-scroll'}>
                        <div className={'sidebar-label-holder'}>
                            <TextwTitle label="Building"
                                        content={facility.facility_location && facility.facility_location.building} />
                            <TextwTitle label="Address"
                                        content={facility.facility_location && facility.facility_location.address} />
                            <TextwTitle label="Phone Number"
                                        content={facility.phone_number ? phoneFormatter.format(facility.phone_number, '(NNN) NNN-NNNN') : 'Unknown'} />
                            <TextwTitle label="Hours" content={<WeekHours facility={facility} />} />
                        </div>
                    </div>
                    <div className={'sidebar-row2'}>
                        <div className={'sidebar-map-container'} onClick={this.handleMapDialogOpen}>
                            <FacilitiesMap
                                facilities={facilities}
                                facility={facility}
                                interactive={false}
                            />
                        </div>
                        <MapDialog
                            open={mapDialogOpen}
                            facilities={facilities}
                            facility={facility}
                            height={'500px'}
                            width={'600px'}
                            onClose={this.handleMapDialogClose}
                        />
                    </div>
                </Paper>
            </div>
        );
    }
}

export default Sidebar;