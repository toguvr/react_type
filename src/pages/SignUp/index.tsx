import React, { useState, useCallback } from 'react';

import { FiLogIn, FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils';

interface ErrorLog {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrors({ name: '' });

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .email('Email inválido')
          .required('Email obrigatório'),
        password: Yup.string().min(
          6,
          'A senha deve conter no mínimo 6 dígitos',
        ),
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
      <Background />

      <Content>
        <form onSubmit={handleSubmit}>
          <img src={logoImg} alt="" />
          <h1>Faça seu cadastro</h1>
          <Input
            erroMsg={errors && errors.name}
            icon={FiUser}
            value={values.name}
            name="name"
            type="text"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })}
            placeholder="Nome"
          />

          <Input
            icon={FiMail}
            name="email"
            type="email"
            value={values.email}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })}
            placeholder="E-mail"
          />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            value={values.password}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })}
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </form>
        <a href="">
          <FiArrowLeft />
          voltar para login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
