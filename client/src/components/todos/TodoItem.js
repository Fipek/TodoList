import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {  Item, Checkbox, Button, Icon, Popup } from 'semantic-ui-react';
//LOCAL
import { deleteTask, checkTask } from '../../actions';
import { getDependentTaskNames, submitConfirm } from '../../utils';
//CSS
import 'react-confirm-alert/src/react-confirm-alert.css';

class TodoItem extends Component{
  
  onClickCheckbox = (e,data) => {
    let status;
    if(data.checked){
      status= 'Done'
    }else{
      status = 'Active'
    }
    let todoItem = {'id': this.props.id, 'listId': this.props.listId, 'status': status}
    this.props.checkTask(todoItem);
    this.props.defaultOptions();
  }

  onClickDeleteButton = () => {
    submitConfirm(this.removeTask);
  }

  removeTask = () => {
    this.props.deleteTask();
    this.props.defaultOptions();
  }

  setStatus = () => {
    if(this.props.status === "Active"){
      return false;
    }else{
      return true;
    }
  }

  renderCheckOrDependentSymbol(dependentList){
    if(dependentList != null && dependentList.length > 0){
      let dependentTaskWarning = 'The task depends on these tasks: ' + getDependentTaskNames(this.props.todotasks,dependentList);
      return(
      <Item.Image size='tiny'> 
        <div style={{marginLeft: '38%'}}>
        <Popup
          trigger={<Icon name='tasks' color='red' size='large' circular />}
          content={dependentTaskWarning}
        />
        </div>
      </Item.Image>
      );
    }else{
      return(
        <Item.Image size='tiny'> <Checkbox onClick={this.onClickCheckbox} checked={this.setStatus()} style={{marginLeft: '50%'}}/> </Item.Image>
      );
    }
  }

   renderDeleteButton = () =>{
    return (
      <div className="right floated" onClick={this.onClickDeleteButton}>
        <Button icon className="negative">
            <Icon name='trash' />
          </Button>
      </div>     
    );
  }

  render(){
    return (
      <Item.Group key={this.props.id}>
        <Item>
          {this.renderCheckOrDependentSymbol(this.props.dependency)}
          <Item.Content>
            <Item.Header style={{"color":"#018ded"}}>{this.props.title}</Item.Header>
            <Item.Meta style={{marginLeft:'3%'}}>
              <i aria-hidden="true" className="clock outline icon"></i>
              {this.props.deadline}
            </Item.Meta>
            <Item.Description style={{marginLeft:'3%'}}>
              {this.props.description}
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
    todotasks: Object.values(state.todotasks),
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({ 
  deleteTask: () => dispatch(deleteTask(ownProps.id,ownProps.listId)),
  checkTask: todoItem => dispatch(checkTask(todoItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);