import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFormik } from 'formik';
import yup from 'yup';
import cx from 'classnames';
import _ from 'lodash';

import * as ApiActions from 'features/api/actions';

const CreateGameInnerForm = ({
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
      <legend className="f4 fw6">Create Game</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          className="pa2 ba w-100"
        />
      </div>
      {touched.name &&
        errors.name && (
          <div className="mt3 pa2 bg-light-red">{errors.name}</div>
        )}
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="players">
          Number of Players
        </label>
        <input
          type="number"
          name="players"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.players}
          className="pa2 ba w-100"
        />
      </div>
      {touched.players &&
        errors.players && (
          <div className="mt3 pa2 bg-light-red">{errors.players}</div>
        )}
      <div className="mt3">
        <input
          type="checkbox"
          name="protected"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.protected}
          className="mr2"
        />
        Password Protected
      </div>
      <div className={cx('mt3', { 'moon-gray': !values.protected })}>
        <label className="db fw6 lh-copy f6" htmlFor="password">
          Password
        </label>
        <input
          type="text"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          disabled={!values.protected}
          className="pa2 ba w-100"
        />
      </div>
      <div className="mt3">
        <input
          type="checkbox"
          name="unlisted"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.unlisted}
          className="mr2"
        />
        Unlisted
      </div>
    </fieldset>
    <button
      type="submit"
      disabled={isSubmitting}
      className="ph3 pv2 ba b--black grow pointer dib"
    >
      Create
    </button>
  </form>
);

CreateGameInnerForm.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
    players: PropTypes.number.isRequired,
    protected: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired,
    unlisted: PropTypes.bool.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    players: PropTypes.string,
    protected: PropTypes.string,
    password: PropTypes.string,
    unlisted: PropTypes.string,
  }),
  touched: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const withForm = withFormik({
  validationSchema: yup.object().shape({
    name: yup.string().required(),
    players: yup
      .number()
      .required()
      .min(2)
      .max(5),
    protected: yup.boolean().default(() => false),
    password: yup.string(),
    unlisted: yup.boolean().required(),
  }),
  handleSubmit(values, { props, setSubmitting, setErrors }) {
    props.createGame(
      _.pickBy(_.omit(values, ['protected']), (v) => v !== ''),
      () => {
        setSubmitting(false);
      },
      () => {
        setErrors({});
      },
    );
  },
});

const CreateGameForm = withForm(CreateGameInnerForm);

const CreateGamePage = ({ createGame }) => (
  <article className="w-100 h-100 black-80">
    <CreateGameForm
      name=""
      players={5}
      protected={false}
      password=""
      unlisted={false}
      createGame={createGame}
    />
  </article>
);

CreateGamePage.propTypes = {
  createGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  createGame: ApiActions.createGame,
};

const withConnect = connect(undefined, mapDispatchToProps);

export default compose(withForm, withConnect)(CreateGamePage);
