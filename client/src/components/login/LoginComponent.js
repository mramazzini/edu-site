import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import LoginGame from './LoginGame';
const LoginComponent = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;

      //Clear the local storage before setting the new token (needed to prevent a bug)
      await localStorage.clear();
      Auth.login(token);

      // Reload the page to update the state of the user
      navigate('/dashboard');
      await window.location.reload();
    } catch (e) {
      Auth.handleError(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <div className='login-body'>
      <div className='login-container'>
        <h2>Login</h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type=''
            placeholder='example@email.com'
            id='email'
            name='email'
          />
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            placeholder='********'
            id='password'
            name='password'
          />
          <nav className='login-nav'>
            <Link to='/' className='home-button'>
              Go Back
            </Link>
            <button type='submit'>Login</button>
          </nav>
        </form>
        <Link className='link-btn' to='/register'>
          Don't have an account? Register here!
        </Link>
      </div>
      <LoginGame />
    </div>
  );
};
export default LoginComponent;
