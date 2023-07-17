import React, { memo } from 'react';
import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import PropTypes from 'prop-types';

const TextArea = (props) => {
    const { field, label, type, rows, cols, placeholder, errors } = props;
    return (
        <TextAreaC>
            {label && <label>{label}</label>}
            <textarea
                placeholder={placeholder}
                className="text-area"
                type={type}
                rows="90"
                cols="10"
                {...field}
            />
            {errors && (
                <ErrorMessage
                    errors={errors}
                    name={field.name}
                    render={({ message }) => (
                        <span style={{ color: 'red' }}>{message}</span>
                    )}
                />
            )}
        </TextAreaC>
    );
};

TextArea.propTypes = {
    name: PropTypes.string,
    field: PropTypes.object,
    label: PropTypes.string,
    rows: PropTypes.string,
    cols: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    errors: PropTypes.object,
};

export default memo(TextArea);

const TextAreaC = styled.div`
    margin-bottom: 16px;
    .text-area {
        padding: 22px 15px;
        height: 400px;
        width: 100%;
        border: 1px solid rgb(238, 236, 236);
        border-radius: 28px;
        background-color: rgb(255, 255, 255);
        color: rgb(33, 33, 33);
        font-size: 14px;
        letter-spacing: 0px;
        line-height: 28px;
        background-clip: padding-box;
        font-weight: 400;
        display: block;
        &::placeholder {
            color: #b9b8b8;
            opacity: 1;
        }
    }
    .error_show {
        font-size: 12px;
        color: #d92020;
    }
`;
