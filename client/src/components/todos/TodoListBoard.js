import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { cleanTasks, fetchLists} from '../../actions';
import { Image, Item } from 'semantic-ui-react';
//LOCAL
import TodoList from './TodoList';
//CSS
import '../../style/Todolist.css';

class TodoListBoard extends React.Component {
  componentDidMount() {
    this.props.cleanTasks();
    this.props.fetchLists(this.props.currentUserId);
  }

  checkLogin() {
    if(this.props.currentUserId === null){
      return(
        <div className="ui center aligned" style={{"marginTop":"25%"}}>
          <h2 className="ui icon center aligned header">
            <Image src='./todolistlogo.png' size='massive' style={{"width":"10em"}}circular />
            <div className="content">Sign in and start using</div>
          </h2>
        </div>
      );
    }
  }

  renderList() {
    return this.props.todolists.map(todolist => {
      if(todolist){
        return (
          <TodoList 
            key={todolist.listId}
            listId={todolist.listId}
            title={todolist.title}
            createDate={todolist.createDate}
            todoItemLists={todolist.todoItemLists}/>
        );
      }
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'center', bottom: '0' }}>
          <Link to="/streams/new" className="ui circular icon button primary large sticky">
            <i aria-hidden="true" className="add icon"></i>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Item.Group>{this.renderList()}</Item.Group>
        {this.checkLogin()}
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todolists: Object.values(state.todolists),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  cleanTasks: () => dispatch(cleanTasks()),
  fetchLists: user => dispatch(fetchLists(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoListBoard);
