import React, {
  Component
} from 'react';
import {
  Link,
  browserHistory
} from 'react-router';
import {
  connect
} from 'react-redux';

import fetch from '../actions/myfetch';

import Carousel from 'react-bootstrap/lib/Carousel';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Table from 'react-bootstrap/lib/Table';
import Media from 'react-bootstrap/lib/Media';
import Nav from 'react-bootstrap/lib/Nav';
import Tab from 'react-bootstrap/lib/Tab';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavItem from 'react-bootstrap/lib/NavItem';
import Label from 'react-bootstrap/lib/Label';
import Pagination from 'react-bootstrap/lib/Pagination';
import {
 COMPLAIN_SHOW
} from '../actions/index';

class Home extends Component {
  constructor (props) {
    super(props),
    this.state = {data:{},activePage: 1,type_name:"technology"};
    this.handleSelect = this.handleSelect.bind(this);
  };
  async componentWillMount() {
     let result =  await fetch('/api/complain?type=technology',{
        method: 'GET',});
      if( result.status === "success")
      {
      
        this.setState({data:result.data});
        this.setState({ type_name:"technology"});
      }
  };

  async change_type(type_name,eventKey) {
   let result =  await fetch(`/api/complain?type=${type_name}&page=${eventKey}`,{
        method: 'GET',});
      if( result.status === "success")
      {
         
        this.setState({data:result.data});
        this.setState({ type_name:type_name});
      }
      this.setState({
        activePage: eventKey
      });
  };

  async show_detail(con_id) {
    let { detail } = this.props;
    detail(con_id);
  };

  async handleSelect(eventKey) {
    
     let result =  await fetch(`/api/complain?type=${eventKey}&page=1`,{
        method: 'GET',});
      if( result.status === "success")
      {
        this.setState({data:result.data});
        this.setState({type_name:`${eventKey}`});
      }
  };
  render() {
      console.log(this.state.data);
      if(!this.state.data.count&&this.state.data.count!==0){
        return <h1>加载中!</h1>
      }else{
        let line = parseInt(this.state.data.count/5);
      if(this.state.data.count > line*5){
        line =line +1;
      }
      console.log(line);
      let items = this.state.data.rows.map((item, index) => {
          return  <div key={index}>
            <Media>
             <Media.Left>
                <img width={64} height={64} src={require('../assets/1.jpg')} alt="Image"/>
              </Media.Left>
              <Media.Body>
                <Button bsStyle="link" onClick={this.show_detail.bind(this,item.id)}>{item.title}</Button>
                <p>{item.detail} </p>
                  <Row className="show-grid">
                    <Col sm={12} md={6}>
                      <Label>{item.time}</Label>
                      <Button bsStyle="link">{item.login_name}</Button>
                    </Col>
                    <Col sm={12} md={6}>
                      <Label>{item.recommend}</Label>
                    </Col>
                  </Row>
              </Media.Body>
            </Media>
          </div>
        });
      if(this.state.data.rows.length<1){
        items = <h1>还没人发表赶紧发表自己的想法吧！</h1>;
      }
     let tab_pane = <Tab.Pane eventKey={this.state.type_name}>
                <Row className="show-grid">
                    {items}
                </Row>
              </Tab.Pane>;
      let page =  <Pagination prev next first last
        ellipsis
        boundaryLinks
        items={line}
        maxButtons={5}
        activePage={this.state.activePage}
        onSelect={this.change_type.bind(this,this.state.type_name)} />

    return (
      <div key="home">
        <Row className="show-grid">
            <Carousel>
              <Carousel.Item>
                <img width={500} height={150} alt="600x200" src={require('../assets/1.jpg')}/>
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
            <Carousel.Item>
              <img width={500} height={150} alt="900x500" src={require('../assets/2.jpg')}/>
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={500} height={150} alt="900x500" src={require('../assets/3.jpg')}/>
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
      </Row>
      <Row className="show-grid">
          <Tab.Container id="tabs-with-dropdown_s" defaultActiveKey={this.state.type_name} onSelect={this.handleSelect}>
           <Row className="clearfix">
            <Nav bsStyle="tabs">
              <NavItem eventKey="technology" > 技术畅聊 </NavItem>
              <NavItem eventKey="educational" > 教育问题 </NavItem>
              <NavItem eventKey="life" > 生活问题</NavItem>
              <NavItem eventKey="food" > 食品安全 </NavItem>
              <NavItem eventKey="belief" > 信仰问题 </NavItem>
              <NavItem eventKey="violence" > 暴力执勤</NavItem>
              <NavItem eventKey="delinquency" > 违法犯罪 </NavItem>
              <NavItem eventKey="drug" > 药品安全与医院 </NavItem>
              <NavItem eventKey="internet" > 互联网黑</NavItem>
              <NavItem eventKey="factory" > 黑心厂商 </NavItem>
              <NavItem eventKey="history" > 正看历史 </NavItem>
              <NavDropdown eventKey="12" title="更多" id="nav-dropdown-within_s">
                <MenuItem eventKey="news" >天下大事</MenuItem>
                <MenuItem eventKey="1unclassified" >其他</MenuItem>
              </NavDropdown>
            </Nav>
             <Tab.Content animation id="nav-dropdown-within_s_c">
              {tab_pane}
            </Tab.Content>
          </Row>
          </Tab.Container>
      </Row>
      {page}
    </div>
    );
    }
  }
};

const mapStateToProps = (state, ownProps = {}) => {
  return {

    // set fetch
  }
};

const mapDispatchToProps = (dispatch, ownProps = {}) => {
  return {
    detail(id){
        dispatch({
          type: COMPLAIN_SHOW,
          payload: {
            id:id
          }
        });
        browserHistory.push('/show');
    },
  }
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;