import React from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../actions';
import { Input, Button, Dropdown} from 'semantic-ui-react';

class TodoItemCreate extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      parentId:this.props.match.params.id,
      title: '',
      description: '',
      deadline: '',
      dependency: []
    };
  }

  getTasks(){
    return this.props.todotasks
      .filter(task => task.status === 'Active')
      .map(task => {
        return({key: task.id, value: task.id, text: task.title})
      });
  }
  
  onSubmit = () => {
    this.props.createTask(this.state);
  };

  inputEmptyControl = () => {
    if(this.state.parentId === '' || this.state.title === '' || this.state.description === '' || this.state.deadline === '')
      return true
    else
      return false
  }

  render() {
    return (
      <div>
        <h3>Create a Todo Item</h3>
        <div className="ui field" style={{padding:'0.5%'}}>
          <Input className="ui field large input" label='Title' placeholder='Enter a title' value={this.state.title} onChange={e => this.setState({title: e.target.value})} style={{width:'100%'}} />
        </div>

        <div className="ui field" style={{padding:'0.5%'}}>
          <Input className="ui field large input" label='Description' placeholder='Enter a description' value={this.state.description} onChange={e => this.setState({description: e.target.value})} style={{width:'100%'}} />
        </div>

        <div className="ui field" style={{padding:'0.5%'}}>
          <Input className="ui field large input" label='Deadline' type="date" placeholder='Select a deadline date' value={this.state.deadline} onChange={e => this.setState({deadline: e.target.value})} style={{width:'100%'}} />
        </div>

        <div className="ui field" style={{padding:'0.5%'}}>
          <label><b>If there is a dependency, select those tasks:</b></label>      
                <Dropdown
                  clearable
                  fluid
                  multiple
                  search
                  selection
                  options={this.getTasks()}
                  onChange={(e, { value }) => this.setState({ dependency: value })}
                  value={this.state.dependency}
                  placeholder='Select Item'
                />
        </div>

        <div className="ui field" style={{padding:'0.5%'}}>
          <Button fluid className="primary" onClick={this.onSubmit} disabled={this.inputEmptyControl()}>Add a item</Button>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todotasks: Object.values(state.todotasks),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { createTask }
)(TodoItemCreate);