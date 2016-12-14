import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import fetch from '../actions/myfetch';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Radio from 'react-bootstrap/lib/Radio';
import {
  ACCOUNT_UPDATE, ACCOUNT_RESET
} from '../actions/index';

class Register extends Component {
 constructor (props) {
    super(props);
    this.state = {};
    this.regist = this.regist.bind(this);
  };
  async regist(){
    let name = this.name.value;
    let passwd = this.passwd.value;
    let repasswd = this.repasswd.value;
    let email = this.email.value;
    if(passwd !== repasswd){
      Messenger().post({
        message: 'invalid input',
        type: 'error',
        showCloseButton: true
      });
      return ;
    } else {
      let result =  await fetch('/api/register',{
        method: 'POST',
        body: JSON.stringify({
          login_name:name,
          passwd:passwd,
          e_mail:email
        })
      });
     if(result.status === "success")
     {
        browserHistory.push('/');
     }
    }
    
  };

 render () {

    return (
       <form>
        <FormGroup controlId="form_email">
          <ControlLabel>邮箱</ControlLabel>
          <FormControl type="text" inputRef={ref => {this.email = ref; }}/>
        </FormGroup>
        <FormGroup controlId="form_name">
          <ControlLabel>登录名</ControlLabel>
          <FormControl type="text" inputRef={ref => {this.name = ref; }}/>
        </FormGroup>
        <FormGroup controlId="form_passwd">
          <ControlLabel >密码</ControlLabel>
          <FormControl type="password" inputRef={ref => {this.passwd = ref; }}/>
        </FormGroup>
        <FormGroup controlId="form_repasswd">
          <ControlLabel >确认密码</ControlLabel>
          <FormControl type="password" inputRef={ref => {this.repasswd = ref; }}/>
        </FormGroup>
        <Button onClick={this.regist}>
          注册
        </Button>

      </form>
    );
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

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;
