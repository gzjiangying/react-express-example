import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import fetch from '../actions/myfetch';
import style from '../base.css';

import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Radio from 'react-bootstrap/lib/Radio';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Label from 'react-bootstrap/lib/Label';
import Pagination from 'react-bootstrap/lib/Pagination';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Panel from 'react-bootstrap/lib/Panel';

class Wish extends Component {
   constructor (props) {
    super(props),
    this.state = {'data':{},activePage: 1};
  };
  async componentWillMount() {
    let {complain} = this.props;
    let result =  await fetch('/api/wish',{
        method: 'GET',});
    if( result.status === "success")
    {
       console.log(result.data);
      this.setState({'data':result.data});
    }
  };
  async change_type(eventKey) {
   let result =  await fetch(`/api/wish?page=${eventKey}`,{
        method: 'GET',});
      if( result.status === "success")
      {
         
        this.setState({data:result.data});
        this.setState({activePage: eventKey});
      }
      
  };
  close() {
    this.setState({ showModal: false });
  };

  open() {
    this.setState({ showModal: true });
  };
  async write_wish(){
    let name = this.name.value;
    let wish = this.wish.value;
    let result =  await fetch('/api/wish',{
        method: 'POST',
        body: JSON.stringify({
          name:name,
          wish:wish
        })
      });
     if(result.status === "success")
     {
       this.setState({ showModal: false });
       let result =  await fetch('/api/wish?page=1',{
        method: 'GET',});
        if( result.status === "success")
        {
           
          this.setState({data:result.data});
        }
     }
  };
 render () {
  
    if(!this.state.data.count&&this.state.data.count!==0){
      return <h1>加载中!</h1>
    }

     let data = this.state.data;

    let line = parseInt(data.count/5);
    if(this.state.data.count > line*5){
      line =line +1;
    }
     let page =  <Pagination prev next first last
        ellipsis
        boundaryLinks
        items={line}
        maxButtons={5}
        activePage={this.state.activePage}
        onSelect={this.change_type.bind(this)} />
        console.log(data);
    let wish = data.data.map((item, index) => {
          return  <div key={`${index}`}>
                <Well>
                  <Label bsStyle="primary">发表人</Label>
                  <Button bsStyle="link" >{item.name}</Button>
                  <p className={style['p']}>{item.wish}</p>
                  <Label　bsStyle="danger">{item.time}</Label>
                </Well>
            </div>
        });
    return (
      <div >
      <Label　bsStyle="danger">表白留言</Label>
      <Button bsStyle="link"　onClick={this.open.bind(this)}>快来表白吧</Button>
      {wish}
      {page}
      <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>表白</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <form>
             <FormGroup controlId="formInlineName">
              <ControlLabel>名称</ControlLabel>
              <FormControl type="text" placeholder="Jane Doe" inputRef={ref => {this.name = ref; }}/>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>正文</ControlLabel>
              <FormControl componentClass="textarea" placeholder="textarea" inputRef={ref => { this.wish = ref; }}/>
            </FormGroup>
              <Button onClick={this.write_wish.bind(this)}>发表</Button>
            </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close.bind(this)}>Close</Button>
            </Modal.Footer>
          
        </Modal>
      </div>
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

const WishContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wish);

export default WishContainer;
