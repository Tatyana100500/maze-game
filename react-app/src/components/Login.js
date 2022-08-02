import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import FormContainer from './FormContainer';
//import { useAuth } from '../hooks/index.js';
const testUser = { name: 'Sofia', password: '54321'}
  
  const Login = () => {
	//const auth = useAuth();
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const nameRef = useRef();
	const handleSubmit = async (values, { setSubmitting }) => {
	  setSubmitting(true);
      if(values.name === testUser.name && values.password === testUser.password) {
		localStorage.setItem('isLogin', true);
		navigate('/posts');
	  } else {
		setError('Неверный логин или пароль')
	  }
	  //const url = 'https://jsonplaceholder.typicode.com/users';
	  /*setError(null);
	  try {
		const res = await axios.get(url, {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {}
		});
		console.log('!!!', res.data)
		//localStorage.setItem('isLogin', res.data.success);
		//localStorage.setItem('token', res.data.token);
	    //localStorage.setItem('currentAccount', res.data.data.id);
		//navigate('/account');
	  } catch (e) {
		console.log(e)
		if (e.isAxiosError && e.response && e.response.status === 401) {
		  setError('authFailed');
		  nameRef.current.select();
		} else if (e.isAxiosError && e.response && e.response.status === 404) {
		  setError('Account not found');
		  nameRef.current.select();
		} else if (e.isAxiosError && e.message === 'Network Error') {
		  setError('netError');
		} else {
		  setError('unknown');
		  console.error(e);
		}*/
		setSubmitting(false);
	  //}
	};
  
	const formik = useFormik({
	  initialValues: {
		name: '',
		password: '',
	  },
	  onSubmit: handleSubmit,
	});
  
	return (
	  <FormContainer>
		<Form data-testid="login-form" className="p-3" onSubmit={formik.handleSubmit}>
		  <Form.Group>
			<Form.Label htmlFor="name">Логин</Form.Label>
			<Form.Control
			  name="name"
			  id="name"
			  autoComplete="name"
			  required
			  type="text"
			  onChange={formik.handleChange}
			  value={formik.values.name}
			  readOnly={formik.isSubmitting}
			  ref={nameRef}
			  isInvalid={!!error}
			/>
		  </Form.Group>
		  <Form.Group>
			<Form.Label htmlFor="password">Пароль</Form.Label>
			<Form.Control
			  name="password"
			  id="password"
			  autoComplete="password"
			  required
			  type="password"
			  onChange={formik.handleChange}
			  value={formik.values.password}
			  readOnly={formik.isSubmitting}
			  isInvalid={!!error}
			/>
			{error
			  && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
		  </Form.Group>
		  <Button
			type="submit"
			variant="outline-primary"
			className="w-100 mb-3"
			disabled={formik.isSubmitting}
		  >
			{formik.isSubmitting
			  && <Spinner className="mr-1" animation="border" size="sm" />}
			Войти
		  </Button>
		</Form>
	  </FormContainer>
	);
  };
  export default Login;