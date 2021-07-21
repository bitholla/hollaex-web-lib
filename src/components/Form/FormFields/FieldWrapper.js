import React, { Component, Fragment } from 'react';
import { ExclamationCircleFilled, CheckOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import { ActionNotification } from '../../ActionNotification';
import { Editable } from '../../Editable';

export const FieldContent = ({
  stringId,
  label = '',
  valid = false,
  hasValue = false,
  focused = false,
  children,
  hideUnderline = false,
  contentClassName = '',
  hideCheck = false,
  outlineClassName = '',
  displayError,
  error,
  ishorizontalfield = false,
  dateFieldClassName,
  warning,
  preview,
  getErrorLocalized,
}) => {
  return (
    <div>
      <div className={classnames({ 'field-label-wrapper': ishorizontalfield })}>
        <div className="d-flex">
          {label && (
            <div className="field-label">
              {label}
              {warning && (
                <div className="d-flex align-items-baseline field_warning_wrapper">
                  <ExclamationCircleFilled className="field_warning_icon" />
                  <div className="field_warning_text">{warning}</div>
                </div>
              )}
            </div>
          )}
          <Editable stringId={stringId} />
        </div>
        <div className={classnames('field-content')}>
          <div
            className={classnames(
              'field-children',
              { valid, custom: hideUnderline },
              contentClassName,
              {
                'input-box-field':
                ishorizontalfield && dateFieldClassName === '',
              }
            )}
          >
            {children}
            {!hideCheck && valid && hasValue && (
              <CheckOutlined className="field-valid" />
            )}
          </div>
          {!hideUnderline && (
            <span
              className={classnames('field-content-outline', outlineClassName, {
                focused,
              })}
            />
          )}
        </div>
      </div>
      <div className="field-label-wrapper">
        {ishorizontalfield ? (
          <Fragment>
            <div className="field-label"></div>
            <FieldError displayError={displayError} error={error} preview={preview} getErrorLocalized={getErrorLocalized}/>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

export const FieldError = ({ error, displayError, className, stringId, preview, getErrorLocalized }) => (
  <div
    className={classnames('field-error-content', 'align-items-baseline', className, {
      'field-error-hidden': !displayError && !preview,
    })}
    style={preview ? { height: 'auto' } : {}}
  >
    {error && (
      <Editable stringId={stringId}>
        <ExclamationCircleFilled className="field_warning_icon" />
        <span className="field-error-text">{getErrorLocalized(error)}</span>
      </Editable>
    )}
    {
      preview && (
        <Fragment>
          {preview}
        </Fragment>
      )
    }
  </div>
);

class FieldWrapper extends Component {
  render() {
    const {
      children,
      label,
      warning,
      stringId,
      input: { value },
      meta: { active = false, error = '', touched = false, invalid = false },
      focused = false,
      fullWidth = false,
      visited = false,
      hideUnderline = false,
      className = '',
      onClick = () => {},
      notification,
      hideCheck = false,
      outlineClassName = '',
      ishorizontalfield,
      preview,
      getErrorLocalized,
    } = this.props;

    const displayError = !(active || focused) && (visited || touched) && error;
    const hasValue = value || value === false;
    return (
      <div
        className={classnames('field-wrapper', className, {
          error: displayError,
          inline: !fullWidth,
          'with-notification': !!notification,
          'field-valid': !invalid,
        })}
      >
        <FieldContent
          stringId={stringId}
          label={label}
          warning={warning}
          valid={!invalid}
          hasValue={hasValue}
          focused={active || focused}
          hideUnderline={hideUnderline}
          hideCheck={hideCheck}
          outlineClassName={outlineClassName}
          onClick={onClick}
          displayError={displayError}
          error={error}
          ishorizontalfield={ishorizontalfield}
          dateFieldClassName={className}
          preview={preview}
          getErrorLocalized={getErrorLocalized}
        >
          {children}
          {notification && typeof notification === 'object' && (
            <ActionNotification
              {...notification}
              className={classnames('pr-0 pl-0 no_bottom', {
                'with-tick-icon': fullWidth && !invalid && !hideCheck,
              })}
              showActionText={true}
            />
          )}
        </FieldContent>
        {!ishorizontalfield ? (
          <FieldError displayError={displayError} error={error} preview={preview} getErrorLocalized={getErrorLocalized}/>
        ) : null}
      </div>
    );
  }
}

FieldWrapper.defaultProps = {
  meta: {},
  input: {
    value: '',
  },
  getErrorLocalized: (error) => error
};

export default FieldWrapper;
