import React from 'react';
import Alert from './Alert';

//TODO: Alerts should not stack on top of each other.
const AlertContainer = ({alerts}) => {
    return (
        <div>
            {alerts && alerts.map((alert) => {
                return (
                    <Alert key={alert.id} alert={alert}/>
                );
            })}
        </div>
    );
};

export default AlertContainer;