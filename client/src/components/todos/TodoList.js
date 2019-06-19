import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {  Item, Button, Icon, List } from 'semantic-ui-react';
import _ from 'lodash';
//LOCAL
import { deleteList } from '../../actions';
import { submitConfirm } from '../../utils';
import history from '../../history';
//CSS
import 'react-confirm-alert/src/react-confirm-alert.css';


class TodoList extends Component{  
  
  onClickDeleteButton = (e) => {
    submitConfirm(this.removeList);
    e.stopPropagation();
  }

  removeList = () => {
    this.props.deleteList();
  }

  setStatus = status => {
    if(status === "Active"){
      return false;
    }else{
      return true;
    }
  }

  renderDeleteButton = () => {
    return (
      <div className="right floated" onClick={this.onClickDeleteButton}>
        <Button icon className="negative">
            <Icon name='trash' />
          </Button>
      </div>     
    );
  }

  renderPreviewTask = taskList => {
    if(taskList.length > 0){
      return taskList.map(task => {
        return(
          <List.Item style={{marginTop:'2px'}} key={_.random(100,true)}>
            <div className="ui checkbox">
              <input type="checkbox" className="hidden" checked={this.setStatus(task.status)} onChange={() => "" } readOnly={true} />
              <label>{task.title}</label>
            </div>
          </List.Item>
        );
      });
    }else{
      return (<div><b>No tasks yet!</b></div>);
    }
  }

  render(){
    return (
      <Item.Group key={this.props.listId}>
        <Item onClick={() => { history.push(`/streams/${this.props.listId}`) }}>
          <Item.Image size='tiny'><div className="record-image">{this.props.title.charAt(0)}</div></Item.Image>
          <Item.Content>
            <Item.Header style={{"color":"#018ded"}}>{this.props.title}</Item.Header>
            <Item.Meta style={{marginLeft:'3%'}}>
              {this.renderPreviewTask(this.props.todoItemLists)}
            </Item.Meta>
            <Item.Description style={{marginLeft:'3%'}}>
              <i aria-hidden="true" className="ellipsis vertical icon"></i>
            </Item.Description>
          </Item.Content>
          {this.renderDeleteButton()}
        </Item>
      </Item.Group>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todolists: Object.values(state.todolists),
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({ 
  deleteList: () => dispatch(deleteList(ownProps.listId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);