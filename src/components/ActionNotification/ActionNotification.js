import React from 'react';
import classnames from 'classnames';
import { Image } from '../Image';
import { isMobile } from 'react-device-detect';
import './ActionNotification.scss';

const getClassNames = (status) => {
  switch (status) {
    case 'success':
      return 'notification-success';
    case 'warning':
      return 'notification-warning';
    case 'information':
      return 'notification-info';
    case 'disabled':
      return 'notification-disabled';
    case 'loading':
      return 'notification-loading';
    default:
      return '';
  }
};

const ActionNotification = ({
  text,
  stringId,
  status,
  onClick,
  iconId,
  iconPath,
  className,
  reverseImage,
  textPosition,
  iconPosition,
  showPointer,
  rotate,
  rotateIfLtr,
  rotateIfRtl,
  showActionText,
  disable = false,
  icon,
}) => {
  // This is to prevent action when edit string or upload icons are clicked
  const onActionClick = ({ target: { dataset = {} } }) => {
    const { stringId, iconId } = dataset;

    if (!disable && !stringId && !iconId && onClick) {
      return onClick();
    }
  };

  return (
    <div
      className={classnames(
        'action_notification-wrapper',
        {
          pointer: !disable && showPointer,
          left: textPosition === 'left',
          right: textPosition === 'right',
          'icon_on-right': iconPosition === 'right',
          'icon_on-left': iconPosition === 'left',
          disabled: disable,
        },
        className
      )}
      onClick={onActionClick}
    >
      {(showActionText || !isMobile) && (
        <div
          className={classnames(
            'action_notification-text',
            getClassNames(status)
          )}
        >
          {text}
        </div>
      )}
      {
        iconPath && (
          <Image
            iconId={iconId}
            stringId={stringId}
            icon={iconPath}
            alt={text}
            svgWrapperClassName="action_notification-svg"
            imageWrapperClassName={classnames('action_notification-image', {
              rotate_ltr: rotateIfLtr,
              rotate_rtl: rotateIfRtl,
              rotate,
              reverse: reverseImage,
            })}
          />
        )
      }
      {
        !iconPath && icon
      }
    </div>
  );
};

ActionNotification.defaultProps = {
  text: '',
  status: 'information',
  iconPath: '',
  className: '',
  reverseImage: false,
  textPosition: 'right',
  iconPosition: 'right',
  showPointer: true,
  rotate: false,
  rotateIfRtl: false,
  rotateIfLtr: false,
};
export default ActionNotification;
