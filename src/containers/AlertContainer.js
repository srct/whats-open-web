import React from 'react';
import {findDOMNode} from 'react-dom';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import Alert from '../components/Alert';
import NotificationsIcon from 'material-ui-icons/Notifications';
import {connect} from 'react-redux';

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

        return (
            <div>
                <Button fab mini color={'primary'} ref={this.handleBtnRef} onClick={this.handleOpen}>
                    <NotificationsIcon/>
                </Button>
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
                        {alerts.filter(this.isAlertActive).map((alert) => {
                            return (
                                <Alert key={alert.id} alert={alert} />
                            );
                        })}
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

export default connect(mapStateToProps)(AlertContainer);
