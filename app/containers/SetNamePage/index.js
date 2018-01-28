import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { replace } from 'react-router-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withState, withHandlers } from 'recompose';

import * as ApiActions from 'features/api/actions';

const SetNamePage = ({ name, handleChange, onClick }) => (
  <article className="mw6 center">
    <input value={name} onChange={handleChange} />
    <button onClick={onClick}>set name</button>
  </article>
);

SetNamePage.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setName: ApiActions.setName,
  replace,
};

export default compose(
  withRouter,
  connect(undefined, mapDispatchToProps),
  withState('name', 'setNameState', ''),
  withHandlers({
    handleChange: (props) => (event) => {
      props.setNameState(event.target.value);
    },
    onClick: (props) => () => {
      props.setName(props.name);
      props.replace(props.location.state.from);
    },
  }),
)(SetNamePage);
