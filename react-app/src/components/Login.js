import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import FormContainer from './FormContainer';

const testUser = { name: 'Sofia', password: '54321'}
  
  const Login = () => {
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
		setSubmitting(false);
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