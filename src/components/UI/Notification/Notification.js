import React from 'react';

import classes from './Notification.css';
import Icon from 'react-icons-kit';
import {ic_done} from 'react-icons-kit/md/ic_done';
import {ic_error} from 'react-icons-kit/md/ic_error'

const notification = (props) => {
    let type = props.notType === "Success" ? <Icon icon={ic_done} size={20} /> : <Icon icon={ic_error} size={20} />
    return (
        <div className={[classes.Notification, classes[props.notType]].join(' ')}>
            <p><span style={{marginRight: '1rem'}}>{type}</span><strong>{props.notMessage}</strong></p>
        </div>
    );
}

export default notification;