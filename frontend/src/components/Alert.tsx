import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

function Alert(props:any) {

  const {
    variant,
    children,
    dismissible,
    ...otherProps
  } = props;

  return (
    <BootstrapAlert variant={variant} dismissible={dismissible} {...otherProps}>
      {children}
    </BootstrapAlert>
  );
}

export default Alert;