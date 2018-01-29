import React from 'react';
import classNames from 'classnames';
import {findLink} from '../utils/nameUtils';
import Chip from 'material-ui/Chip';

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
            return (<span className={'alert-message'}>
                {alert.message}
            </span>);
        }

        return (
            <span className={'alert-message'}>
                {alert.message.substring(0, links.index)}
                <a href={links[0]} className={'alert-link'} target="_blank" rel="noopener">{links[0]}</a>
                {alert.message.substring(links.index + links[0].length)}
            </span>
        );
    };

    const getChipLabel = () => alert.urgency_tag.charAt(0).toUpperCase() + alert.urgency_tag.slice(1);

    return (
        <div className={'alert'}>
            {getMessage()}
            <Chip label={getChipLabel()} className={classNames('alert-urgency-chip', getUrgencyClass())}/>
        </div>
    );
};

export default Alert;