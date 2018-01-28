import React from 'react';
import {findDOMNode} from 'react-dom';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Alert from '../components/Alert';
import NotificationsIcon from 'material-ui-icons/Notifications';
import CloseIcon from 'material-ui-icons/Close';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux';
import {viewAlert} from '../actions/api';

class AlertContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            isOpen: false,
            anchorEl: null
        };
    }

    handleOpen = () => {
        this.setState({
            isOpen: true
        });
        this.props.alerts.forEach((alert) => this.props.viewAlert(alert));
    };

    handleClose = () => {
        this.setState({
            isOpen: false
        });
    };

    handleBtnRef = (c) => {
        this.setState({
            anchorEl: findDOMNode(c)
        });
    };

    isAlertActive = (alert) => {
        const curDate = new Date();
        const startDate = new Date(alert.start_datetime);
        const endDate = new Date(alert.end_datetime);

        return curDate > startDate && curDate < endDate;
    };

    render() {
        const {alerts} = this.props;
        const activeAlerts = alerts.filter(this.isAlertActive);
        return (
            <div>
                <IconButton classes={{
                    root: 'alert-container-btn'
                }} ref={this.handleBtnRef} onClick={this.handleOpen}>
                    {activeAlerts.filter((alert) => !alert.viewed).length !== 0 &&
                    <span className={'alert-container-number'}>
                        <Typography type={'caption'} className={'alert-container-number-text'}>
                            {activeAlerts.length}
                        </Typography>
                    </span>}

                    <NotificationsIcon>
                    </NotificationsIcon>
                </IconButton>
                <Popover
                    open={this.state.isOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    onClose={this.handleClose}>
                    <div className={'alert-container-popover'}>
                        <div className={'alert-container-header'}>
                            <Typography type={'title'} className={'alert-container-title'}>
                                Alerts
                            </Typography>
                            <IconButton className={'alert-container-close-btn'} onClick={this.handleClose}>
                                <CloseIcon className={'alert-container-close-icon'}/>
                            </IconButton>
                        </div>
                        {
                            activeAlerts.length === 0 ?
                                <div>
                                    <div className={'alert'}>
                                        <span>There are no alerts at this time.</span>
                                    </div>
                                </div> :
                                <div>
                                    {activeAlerts.map((alert) => {
                                        return (
                                            <Alert key={alert.id} alert={alert}/>
                                        );
                                    })}
                                </div>
                        }
                    </div>
                </Popover>
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        alerts: state.alerts
    };
}

export default connect(mapStateToProps, {
    viewAlert
})(AlertContainer);
