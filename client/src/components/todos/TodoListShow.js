import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks, cleanTasks } from '../../actions';
import { Dropdown, Grid} from 'semantic-ui-react';
//LOCAL
import TodoItem from './TodoItem';
import { findListTitle, filterTaskForStatus, filterTaskForExpired, orderTaskForCreateDate } from '../../utils';
//CSS
import '../../style/Todolist.css';



class TodoListShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isManupulated:false,
      manupulatedList:[]
    };
  }
  
  componentDidMount() {
    this.props.fetchTasks();
  }

  onClickDefaultOptions = () => {
    this.setState({isManupulated:false});
  }

  onClickOrderTask = () => {
    let list = filterTaskForStatus(this.props.todotasks,'Active');
    this.setState({isManupulated: true, manupulatedList: list});
  }

  onClickFilterTaskForStatus = status => {
    let list = filterTaskForStatus(this.props.todotasks,status);
    this.setState({isManupulated:true, manupulatedList: list});
  }

  onClickFilterTaskForStatus = status => {
    let list = filterTaskForStatus(this.props.todotasks,status);
    this.setState({isManupulated:true, manupulatedList: list});
  }

  onClickFilterTaskForExpired = () => {
    let list = filterTaskForExpired(this.props.todotasks);
    this.setState({isManupulated:true, manupulatedList: list});
  }

  onClickOrderTask = (orderParameter) => {
    let list = orderTaskForCreateDate(this.props.todotasks, orderParameter);
    this.setState({isManupulated:true, manupulatedList: list});
  }

  renderTasks() {
    let list = this.state.isManupulated ? this.state.manupulatedList : this.props.todotasks  
    return list.map(todotask => {
      if(todotask){
        return (
          <TodoItem 
            key={todotask.id}
            id={todotask.id}
            listId={todotask.parentId}
            title={todotask.title}
            description={todotask.description}
            deadline={todotask.deadline}
            status={todotask.status}
            dependency={todotask.dependency}
            defaultOptions={this.onClickDefaultOptions}/>
        );
      }
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'center', bottom: '0' }}>
          <Link to={`/todo/new/${this.props.match.params.id}`} className="ui circular icon button primary large sticky">
            <i aria-hidden="true" className="add icon"></i>
          </Link>
        </div>
      );
    }
  }

  renderHeader(){
    let title = findListTitle(this.props.match.params.id,this.props.todolists);                            
    return(
      <Grid>
        <Grid.Column floated='left' width={10}>
          <b>{title}</b>
        </Grid.Column>
        <Grid.Column floated='right' width={5} style={{marginRight:'-5%'}}>
          <Dropdown text='Filter' icon='filter' floating labeled button className='icon' >
          <Dropdown.Menu>
            <Dropdown.Header icon='tags' content='Filter Options' />
            <Dropdown.Divider />
              <Dropdown.Item label={{ color: 'grey', empty: true, circular: true }} text='Default' onClick={this.onClickDefaultOptions}/>
              <Dropdown.Item label={{ color: 'green', empty: true, circular: true }} text='Active' onClick={() => this.onClickFilterTaskForStatus('Active')} />
              <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text='Done' onClick={() => this.onClickFilterTaskForStatus('Done')} />
              <Dropdown.Item label={{ color: 'red', empty: true, circular: true }} text='Expired' onClick={this.onClickFilterTaskForExpired} />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown text='Order' icon='filter' floating labeled button className='icon' >
          <Dropdown.Menu>
            <Dropdown.Header icon='tags' content='Order Options' />
            <Dropdown.Divider />
              <Dropdown.Item label={{ color: 'red', empty: true, circular: true }} text='Create Date' onClick={() => this.onClickOrderTask('createDate')} />
              <Dropdown.Item label={{ color: 'blue', empty: true, circular: true }} text='Deadline' onClick={() => this.onClickOrderTask('deadline')}/>
              <Dropdown.Item label={{ color: 'black', empty: true, circular: true }} text='Status' onClick={() => this.onClickOrderTask('status')}/>
              <Dropdown.Item label={{ color: 'yellow', empty: true, circular: true }} text='Title' onClick={() => this.onClickOrderTask('title')}/>
          </Dropdown.Menu>
        </Dropdown>
        </Grid.Column>
      </Grid>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderTasks()}
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todotasks: Object.values(state.todotasks),
    todolists: Object.values(state.todolists),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  cleanTasks: () => dispatch(cleanTasks()), 
  fetchTasks: () => dispatch(fetchTasks(ownProps.match.params.id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoListShow);