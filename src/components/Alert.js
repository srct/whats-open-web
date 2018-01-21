import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

class Alert extends React.Component {

    constructor() {
        super();
        this.state = {
            open: true
        };
    }

    isActive = () => {
        const curDate = new Date();
        const startDate = new Date(this.props.alert.start_datetime);
        const endDate = new Date(this.props.alert.end_datetime);

        return this.state.open && (curDate > startDate && curDate < endDate);
    };

    handleClose = (event, reason) => {
        //The alert should not close if the user clicks anywhere on the screen.
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            open: false
        });
    };

    getAlertClass = () => {
        switch (this.props.alert.urgency_tag.toLowerCase()) {
            case 'emergency':
                return 'alert-emergency';
            case 'major':
                return 'alert-major';
            case 'minor':
                return 'alert-minor';
            case 'info':
            default:
                return 'alert-info';
        }
    };

    render() {
        const alert = this.props.alert;

        return (
            <Snackbar
                open={this.isActive()}
                //autoHideDuration={6000}
                onClose={this.handleClose}
                message={<span>{alert.message}</span>}
                action={
                    <IconButton
                        color="inherit"
                        onClick={this.handleClose}>
                        <CloseIcon/>
                    </IconButton>
                }
                classes={{
                    root: this.getAlertClass()
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}/>
        );
    }
}

export default Alert;