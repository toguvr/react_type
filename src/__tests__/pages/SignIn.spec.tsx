import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const mockedSignIn = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({ push: mockedHistoryPush }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign in', async () => {
    const result = render(<SignIn />);

    const emailField = result.getByPlaceholderText('E-mail');
    const passwordField = result.getByPlaceholderText('Senha');
    const buttonElement = result.getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'augusto@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: '1234526' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in with invalid credentials', async () => {
    const result = render(<SignIn />);

    const emailField = result.getByPlaceholderText('E-mail');
    const passwordField = result.getByPlaceholderText('Senha');
    const buttonElement = result.getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'no-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const result = render(<SignIn />);

    const emailField = result.getByPlaceholderText('E-mail');
    const passwordField = result.getByPlaceholderText('Senha');
    const buttonElement = result.getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'augusto@gmail.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
