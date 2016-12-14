import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import {
  ACCOUNT_UPDATE, ACCOUNT_RESET
} from '../actions/index';

class Advertise extends Component {
  
 render () {
    return <h1>广告</h1>;
  }
};

const mapStateToProps = (state, ownProps = {}) => {
  return {
   
// set fetch
  }
};

const mapDispatchToProps = (dispatch, ownProps = {}) => {
  return {
    handleLogin () {
    },

    handleLogout () {
    }
  }
};

const AdvertiseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Advertise);

export default AdvertiseContainer;
