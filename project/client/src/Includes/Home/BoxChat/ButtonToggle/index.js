import React from 'react';
import PropTypes from 'prop-types';
import {MessageOutlined} from '@ant-design/icons';

function ButtonToggle(props) {
    const { isShowForm, handleShowFormMess } = props;
    return (
        <div
            id="chat-circle"
            className={isShowForm ? `btn btn-raised scale` : `btn btn-raised`}
            style={{ display: isShowForm ? 'none' : 'flex' }}
            onClick={handleShowFormMess}
        >
            <div id="chat-overlay" />
            <MessageOutlined />
        </div>
    );
}

ButtonToggle.propTypes = {};

export default ButtonToggle;
