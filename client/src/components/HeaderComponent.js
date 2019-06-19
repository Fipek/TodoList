import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

class HeaderComponent extends Component{
  render(){
    return (
    <div className="ui secondary pointing menu">
      <Link to="/list" className="item">
        <h3 className="ui header">To-Do List</h3>
      </Link>
      <div className="right menu">
        <GoogleAuth />
      </div>
    </div>
    );
  }
}

export default HeaderComponent;