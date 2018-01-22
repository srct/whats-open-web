import React from 'react';
import NotificationSystem from 'react-notification-system';

class AlertContainer extends React.Component {
    notificationSystem;

    constructor() {
        super();
        /*
            The alerts that have been shown need to be stored because componentWillReceiveProps will be called on
            change detection. Because of this, whenever an action occurs on the screen, the alerts will be reshown.
         */
        this.state = {
            shownAlertIds: []
        };
    }

    componentWillReceiveProps(nextProps) {
        //TODO: Only show alerts that the user has not seen before.
        nextProps.alerts.filter((alert) => !this.state.shownAlertIds.includes(alert.id)).filter(this.isAlertActive).forEach((alert) => {
            this.addNotification(alert);
        });
    }

    isAlertActive = (alert) => {
        const curDate = new Date();
        const startDate = new Date(alert.start_datetime);
        const endDate = new Date(alert.end_datetime);

        return curDate > startDate && curDate < endDate;
    };

    addNotification = (alert) => {
        //TODO: Support alerts with links
        this.state.shownAlertIds.push(alert.id);
        this.notificationSystem.addNotification({
            message: alert.message,
            level: this.resolveNotificationLevel(alert),
            position: 'bl',
            autoDismiss: 6,
            dismissible: true,
            uid: alert.id
        });
    };

    /**
     * The What's Open API tells us if an alert is an info, minor, major, or emergency. However, the library that
     * deals with notifications requires either a info, success, warning, or error. This function maps the
     * What's Open API to the library.
     *
     * @param alert The What's Open Alert.
     * @returns {string} The notification level used by the third party library.
     */
    resolveNotificationLevel = (alert) => {
        switch (alert.urgency_tag) {
            case 'emergency':
                return 'error';
            case 'major':
                return 'warning';
            case 'minor':
                return 'success';
            default:
            case 'info':
                return 'info';

        }
    };

    render() {
        return (
            <div>
                <NotificationSystem ref={(c) => {
                    this.notificationSystem = c;
                }}/>
            </div>
        );

    }
}

export default AlertContainer;