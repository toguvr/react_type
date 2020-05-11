import React, { InputHTMLAttributes, useState, useCallback } from 'react';

import { IconBaseProps } from 'react-icons/lib/cjs';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  icon?: React.ComponentType<IconBaseProps>;
  value: string;
  erroMsg?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  erroMsg,
  icon: Icon,
  value,
  ...rest
}) => {
  const [isFocused, setFocused] = useState(false);
  const [isFilled, setFilled] = useState(false);

  const handleIinputFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleIconColor = useCallback(() => {
    setFocused(false);
    setFilled(!!value);
  }, [value]);

  return (
    <Container erroMsg={!!erroMsg} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input onFocus={handleIinputFocus} onBlur={handleIconColor} {...rest} />
      {erroMsg && (
        <Error title="oi">
          <FiAlertCircle size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
