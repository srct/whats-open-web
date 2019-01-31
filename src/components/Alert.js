import React from 'react';
import classNames from 'classnames';
import {findLink} from '../utils/nameUtils';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import ArrowForwardIcon from 'material-ui-icons/ArrowForward';

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

    const getBody = () => {
        /*
            API V2.2 removed the message field and replaced it with
            subject and body. In order to ensure backwards compatability,
            use the message field if it exists, otherwise use body.

            TODO: Eventually, this check will be useless when older alerts
            are phased out and should be removed to minimize complexity.

            Alternatively, move this into the mapper once TypeScript is added.
        */
        const body = alert.message ? alert.message : alert.body;
        const links = findLink(body);

        if (!links) {
            return (
                <span className={'alert-body'}>
                    {body}
                </span>
            );
        }

        return (
            <span className={'alert-body'}>
                {body.substring(0, links.index)}
                <a href={links[0]} className={'alert-link'} target="_blank" rel="noopener noreferrer">{links[0]}</a>
                {body.substring(links.index + links[0].length)}
            </span>
        );
    };

    const getChipLabel = () => alert.urgency_tag.charAt(0).toUpperCase() + alert.urgency_tag.slice(1);

    return (
        <div className={'alert'}>
            <div className={'alert-subject-container'}>
                <h3 className={'alert-subject'}>{alert.subject}</h3>
                <Chip label={getChipLabel()} className={classNames('alert-urgency-chip', getUrgencyClass())} />
            </div>

            {getBody()}

            {
                alert.url &&
                <span className={'alert-url-container'}>
                    <Button size={'small'} href={alert.url} target="_blank" rel="noopener noreferrer" classes={{
                        root: 'alert-url-button-root'
                    }}>
                        More Information
                        <ArrowForwardIcon />
                    </Button>
                </span>
            }
        </div>
    );
};

export default Alert;