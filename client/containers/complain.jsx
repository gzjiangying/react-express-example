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
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Label from 'react-bootstrap/lib/Label';

import {
  ACCOUNT_UPDATE, ACCOUNT_RESET
} from '../actions/index';

class Complain extends Component {
 constructor (props) {
    super(props);
    this.state = {};
    this.add_complain = this.add_complain.bind(this);
  };
  /*
  <FormGroup>
    <ControlLabel>Select</ControlLabel>
    <input type="file" name="files[]" multiple/>
  </FormGroup>
  */
  async add_complain(){

    let title = this.title.value;
    let data ={};
    let detail = this.data.value;
    let type = this.type_name.value;
    let result =  await fetch('/api/complain',{
        method: 'POST',
        body: JSON.stringify({
          title:title,
          data:{
            detail:detail
          },
          type:type
        })
      });
     if(result.status === "success")
     {
        browserHistory.push('/');
     }
  };

 render () {
    return (
       <form>
        <FormGroup>
         <ControlLabel>标题</ControlLabel>
          <FormControl type="text" placeholder="Normal text" inputRef={ref => { this.title = ref; }}/>
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>正文</ControlLabel>
          <FormControl componentClass="textarea" placeholder="textarea" inputRef={ref => { this.data = ref; }}/>
        </FormGroup>
         <FormGroup controlId="formControlsSelect">
          <ControlLabel>类型</ControlLabel>
          <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.type_name = ref; }}>
            <option value="technology">技术畅聊</option>
            <option value="food">食品安全</option>
            <option value="educational">教育问题</option>
             <option value="life">生活问题</option>
            <option value="belief">信仰问题</option>
            <option value="violence">暴力执勤</option>
            <option value="delinquency">违法犯罪</option>
            <option value="drug">药品安全与医院</option>
            <option value="internet">互联网黑</option>
            <option value="factory">黑心厂商</option>
            <option value="history">正看历史</option>
            <option value="news">天下大事</option>
            <option value="unclassified">其他</option>
          </FormControl>
        </FormGroup>
        <Button onClick={this.add_complain}>
          提交
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
  }
};

const ComplainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Complain);

export default ComplainContainer;
