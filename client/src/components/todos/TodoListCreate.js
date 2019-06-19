import React from 'react';
import { connect } from 'react-redux';
import { createList } from '../../actions';
import { Input, Button } from 'semantic-ui-react';

class TodoListCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      user: this.props.currentUserId
    };
  }

  onSubmit = formValues => {
    this.props.createList(this.state);
  };

  inputEmptyControl = () => {
    if(this.state.title === '' || this.state.user === '' )
      return true
    else
      return false
  }

  render() {
    return (
      <div>
        <h3>Create a Todo List</h3>
        <div className="ui field" style={{padding:'0.5%'}}>
          <Input className="ui field large input" label='Title' placeholder='Enter a title' value={this.state.title} onChange={e => this.setState({title: e.target.value})} style={{width:'100%'}} />
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
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { createList }
)(TodoListCreate);