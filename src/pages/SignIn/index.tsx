import React, { useState, useCallback } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils';

const SignIn: React.FC = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrors({ name: '' });

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Email inválido')
          .required('Email obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(values, {
        abortEarly: false,
      });
    } catch (err) {
      setErrors(getValidationErrors(err));
    }
  }, []);

  return (
    <Container>
      <Content>
        <form onSubmit={handleSubmit}>
          <img src={logoImg} alt="" />
          <h1>Faça seu login</h1>
          <Input
            icon={FiMail}
            name="email"
            type="email"
            placeholder="E-mail"
            value={values.email}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })}
          />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
            value={values.password}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })}
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </form>
        <a href="">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
