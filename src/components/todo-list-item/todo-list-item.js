import React, { Component } from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {

  state = {
    done: false,
  };

  onLabelClick = () => {
    this.setState(({done}) => {
      return {
        done: !done
      };
    });
  }
  todoLabel = ({label}) => {
      return (
        <span
            className="todo-list-item-label"
            onClick={ this.onLabelClick }>
            {label}
      </span>)
    
  }


  render() {
    const { label, onDelete } = this.props;
    const { done } = this.state;

    let classNames = 'todo-list-item';
    if (done) {
      classNames += ' done' ;
    }
    return (
      <span className={classNames}>
      
        {!done 
        ? <span
            className="todo-list-item-label"
            onClick={ this.onLabelClick }>
            {label}
      </span>
      : <div>
          {<span
            className="todo-list-item-label"
            onClick={ this.onLabelClick }>
            {label}
          </span>}
          <button type="button"
            className="btn btn-outline-danger btn-sm float-right"
            onClick={onDelete}>
            Delete
          </button>
        </div>
        }
        
      </span>
    );
  };
}

