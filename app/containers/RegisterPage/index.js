import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFormik } from 'formik';
import yup from 'yup';

import * as UserActions from 'features/user/actions';

const RegisterInnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit} className="measure center pa2">
    <fieldset className="b--transparent ph0 mh0">
      <legend className="f4 fw6">Create a new account</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          className="pa2 ba w-100"
        />
      </div>
      {touched.username &&
        errors.username && (
          <div className="mt3 pa2 bg-light-red">{errors.username}</div>
        )}
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          className="pa2 ba w-100"
        />
      </div>
      {touched.email &&
        errors.email && (
          <div className="mt3 pa2 bg-light-red">{errors.email}</div>
        )}
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className="pa2 ba w-100"
        />
      </div>
      {touched.password &&
        errors.password && (
          <div className="mt3 pa2 bg-light-red">{errors.password}</div>
        )}
    </fieldset>
    <button
      type="submit"
      disabled={isSubmitting}
      className="ph3 pv2 ba b--black grow pointer dib"
    >
      Create Account
    </button>
  </form>
);

RegisterInnerForm.propTypes = {
  values: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  touched: PropTypes.shape({
    username: PropTypes.bool,
    email: PropTypes.bool,
    password: PropTypes.bool,
  }),
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const withForm = withFormik({
  validationSchema: yup.object().shape({
    username: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required(),
  }),
  handleSubmit(values, { props, setSubmitting, setErrors }) {
    props.register(
      values,
      () => {
        setSubmitting(false);
      },
      () => {
        setErrors({});
      },
    );
  },
});

const RegisterForm = withForm(RegisterInnerForm);

const RegisterPage = ({ register }) => (
  <article className="w-100 h-100 black-80">
    <RegisterForm username="" email="" password="" register={register} />
  </article>
);

RegisterPage.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  register: UserActions.register,
};

const enhance = compose(connect(undefined, mapDispatchToProps));

export default enhance(RegisterPage);
