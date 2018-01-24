import React from 'react';
import classNames from 'classnames';
import {findLink} from '../utils/nameUtils';

const Alert = ({alert}) => {
    const getUrgencyClass = () => {
        switch (alert.urgency_tag) {
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

    const getMessage = () => {
        const links = findLink(alert.message);
        if (!links) {
            return alert.message;
        }

        return (
            <span>
                {alert.message.substring(0, links.index)}
                <a href={links[0]} className={'alert-link'} target="_blank" rel="noopener">{links[0]}</a>
                {alert.message.substring(links.index + links[0].length)}
            </span>
        );
    };

    return (
        <div className={classNames('alert', getUrgencyClass())}>
            {getMessage()}
        </div>
    );
};

export default Alert;