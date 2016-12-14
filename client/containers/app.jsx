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
import {
  ACCOUNT_UPDATE, ACCOUNT_RESET
} from '../actions/index';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {showModal: false};
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  };
   componentDidMount () {
    let user_info = Cookies.get('user_info');
    let { handleRefresh } = this.props;
    if (user_info) {
      handleRefresh();

    }
  };
  close() {
    this.setState({ showModal: false });
  };

  open() {
    this.setState({ showModal: true });
  };
  async login() {
    let { handleLogin } = this.props;
    handleLogin(this.login_name.value,this.passwd.value);
    this.setState({ showModal: false });
  };
  logout(){
    let { handleLogout } = this.props;
    handleLogout();
  };
 render () {
   let { account } = this.props;
   let login_name = null;
   if (account.role !== 'guest') {
    login_name = account.login_name;
   }
    let login = 
       <NavDropdown eventKey={4} title="登陆" id="basic-nav-dropdown">
                <MenuItem eventKey={4.1} onClick={this.open}>登陆</MenuItem>
                <MenuItem eventKey={4.2}  href="/register">注册</MenuItem>
         <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>登陆</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <form>
             <FormGroup controlId="formInlineName">
              <ControlLabel>登录名</ControlLabel>
              <FormControl type="text" placeholder="Jane Doe" inputRef={ref => {this.login_name = ref; }}/>
            </FormGroup>
            <FormGroup controlId="formInlineEmail">
              <ControlLabel>密码</ControlLabel>
              <FormControl type="password" inputRef={ref => {this.passwd = ref;}}/>
            </FormGroup>
            {' '}
              <Button onClick={this.login}>登陆</Button>
            </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          
        </Modal>
            </NavDropdown>;
    
    let logout = <NavDropdown eventKey={4} title={login_name} id="basic-nav-dropdown">
                <MenuItem eventKey={4.1} onClick={this.logout}>退出</MenuItem>
                <MenuItem eventKey={4.2} href="/complain">发表吐槽</MenuItem>
                <MenuItem eventKey={4.3}>用户信息</MenuItem>
            </NavDropdown>;
    let login_out = null;
    if(account.role !== 'guest'){
      login_out = logout;
    }else{
      login_out = login;
    }
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">自由世界</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/wish">表白墙</NavItem>
            <NavItem eventKey={2} href="/advertise">广告招商</NavItem>
          </Nav>
          <Nav pullRight>
          　 <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>
              <Button type="submit">搜索</Button>
           </Navbar.Form>
           {login_out}
          </Nav>
        </Navbar>
         <div className={'container'}>
          { this.props.children }
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps = {}) => {
  return {
   account: state.account
  }
};

const mapDispatchToProps = (dispatch, ownProps = {}) => {
  return {
    async handleLogin (login_name, passwd) {
     let result =  await fetch('/api/login',{
        headers: new Headers({
        'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify({
          login_name:login_name,
          passwd:passwd
        })
      });
     if(result.status === "success")
     {
        dispatch({
          type: ACCOUNT_UPDATE,
          payload: {
            login_name: result.data.login_name,
            role:result.data.role,
            id:result.data.id
          }
        });
     }else{
      Messenger().post({
        message: 'passwd error',
        type: 'error',
        showCloseButton: true
      });
     } 
    },
    async handleRefresh(){
      let opts 
      let result =  await fetch('/api/login',{
        method: 'POST',
        body: JSON.stringify({
          type: 'cookie'
        })
      });
     if(result.status === "success")
     {
        dispatch({
          type: ACCOUNT_UPDATE,
          payload: {
            login_name: result.data.login_name,
            role:result.data.role,
            id:result.data.id
          }
        });
     }else{
      Messenger().post({
        message: 'passwd error',
        type: 'error',
        showCloseButton: true
      });
     } 
    },
    handleLogout () {
      Cookies.remove('user_info');
      dispatch({
        type: ACCOUNT_RESET
      });

      browserHistory.push('/');
      Messenger().post({
        message: `you are logged out`,
        type: 'info',
        showCloseButton: true
      });
    }
  }
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
