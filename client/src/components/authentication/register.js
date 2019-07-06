import React from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, 'Too Short!')
        .required('Field Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Field Required'),
    password: Yup.string()
        .min(6, 'Too short!')
        .max(12, 'Too long!')
        .required('Field Required'),

});


class Register extends React.Component {
    handleSubmit = (values) => {
        axios.post('http://dct-user-auth.herokuapp.com/users/register', values)
            .then((response) => {
                if (response.data.errors) {
                    alert(response.data.errors)
                } else {
                    this.props.history.push('/users/login')
                }
            })
    }

    render() {
        return (
            <div>
                <h1>REGISTER</h1>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={this.handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            username:
                                        <Field name="username" />
                            {errors.username && touched.username ? (
                                <div>{errors.username}</div>
                            ) : null}
                            email:
                                        <Field name="email" type="email" />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            password:
                                        <Field name="password" type="password" />
                            {errors.password && touched.password ? <div>{errors.password}</div> : null}

                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }

}


export default Register