import Alert from 'react-bootstrap/Alert';

export const variantList = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  light: 'light',
  dark: 'dark',
};

export default function BootstrapAlert({ children, alertVariant }) {
  return (
    <>
      <Alert variant={alertVariant}>{children}</Alert>
    </>
  );
}
