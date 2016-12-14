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
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Panel from 'react-bootstrap/lib/Panel';
import { COMPLAIN_SHOW } from '../actions/index';

class Show extends Component {
  constructor (props) {
    super(props),
    this.state = {'data':{}};
  };
  async componentWillMount() {
    let {complain} = this.props;
    let result =  await fetch(`/api/complain/${complain.id}`,{
        method: 'GET',});
    if( result.status === "success")
    {
       console.log(result.data);
      this.setState({'data':result.data});
    }
  };
  async on_comment(id,reply_name){
    let comment = this.comment.value;
    let grade = this.grade.value;
    let result =  await fetch(`/api/complain/${id}`,{
        method: 'PATCH',
        body: JSON.stringify({
          type:"comment",
          comment:{
            reply_name:reply_name,
            comment:comment,
            grade:parseInt(grade)
          }
        })
      });
     if(result.status === "success")
     {
        let results =  await fetch(`/api/complain/${result.data.id}`,{
        method: 'GET',});
        if( results.status === "success")
        {
           console.log(results.data);
          this.setState({'data':results.data});
        }
     }
  };
  async on_recommend(id){
     let result =  await fetch(`/api/complain/${id}`,{
        method: 'PATCH',
        body: JSON.stringify({
          type:"recommend"
        })
      });
     if(result.status === "success")
     {
        let results =  await fetch(`/api/complain/${result.data.id}`,{
        method: 'GET',});
        if( results.status === "success")
        {
           console.log(results.data);
          this.setState({'data':results.data});
        }
     }
  }
 render () {
    let data = this.state.data;
    console.log(data);
    let title = null;
    let comment = null;
    if(!data.title){
      return <h1>加载中!</h1>
    }
      title = <Panel>
            <h2　className="center-block">{data.title}</h2>
            <Label bsStyle="primary">作者</Label>
            <Button bsStyle="link" >{data.login_name}</Button>
            <Label bsStyle="primary">推荐人数</Label>
            <Button bsStyle="link" onClick={this.on_recommend.bind(this,this.state.data.id)}>{data.recommend}</Button>
            <h3　className="center-block">正文</h3>
            <Well>
              <p className={style['p']}>{data.data.detail}</p>
            </Well>
          </Panel>
      comment = data.comment.map((item, index) => {
          return  <div key={`${index}`}>
              <Label bsStyle="primary">评论人</Label>
              <Button bsStyle="link" >{item.name}</Button>
               <p className={style['p']}>{item.comment}</p>
            </div>
        });
      if(data.comment.length ===0 ){
        comment = <h1>赶快抢沙发吧!</h1>
      }
    return <div >
          {title}
          <Label bsStyle="primary">评论</Label>
          <Well>
            {comment}
          </Well>
        <form>
        <FormGroup>
        <ControlLabel>评论</ControlLabel>
          <FormControl  componentClass="textarea" placeholder="textarea" inputRef={ref => { this.comment = ref; }}/>
        </FormGroup>
       <FormGroup controlId="formControlsSelect">
        <ControlLabel>评分</ControlLabel>
        <FormControl componentClass="select" placeholder="select" inputRef={ref => { this.grade = ref; }}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </FormControl>
      </FormGroup>
         <Button onClick={this.on_comment.bind(this,this.state.data.id,this.state.data.login_name)}>提交</Button>
        </form>
     </div>;
  }
};

const mapStateToProps = (state, ownProps = {}) => {
  return {
   complain: state.complain
  }
};

const mapDispatchToProps = (dispatch, ownProps = {}) => {
  return {
  }
};

const ShowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);

export default ShowContainer;
