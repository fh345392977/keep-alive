import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import classNames from 'classnames';
import React from 'react';
import styles from './index.less';


interface LoginSubmitProps extends ButtonProps {
  className?: string;
}

const LoginSubmit: React.FC<LoginSubmitProps> = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />;
};

export default LoginSubmit;
