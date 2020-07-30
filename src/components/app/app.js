import React, { Component } from 'react';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    items: [
      { id: 1, label: 'Learn English', important: false, done: false },
      { id: 2, label: 'Make a homework', important: true, done: false },
      { id: 3, label: 'Learn react', important: false, done: false }
    ],
    filter: 'all',
    search: ''
  };

  onItemAdded = (label) => {
    this.setState((state) => {
      const item = this.createItem(label);
      return { items: [...state.items, item] };
    })
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value } ;
    return [
      ...arr.slice(0, idx),
      item,
      ...arr.slice(idx + 1)
    ];
  };
  
  onDelete = (id) => {
    this.setState((state) => {
      const idx = state.items.findIndex((item) => item.id === id);
      const items = [
        ...state.items.slice(0, idx),
        ...state.items.slice(idx + 1)
      ];
      return { items };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onSearchChange = (search) => {
    this.setState({ search });
  };

  createItem(label) {
    return {
      id: ++this.maxId,
      label,
      important: false,
      done: false
    };
  }

  filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => (!item.done));
    } else if (filter === 'done') {
      return items.filter((item) => item.done);
    }
  }

  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  render() {
    const { items, filter, search } = this.state;
    const visibleItems = this.searchItems(this.filterItems(items, filter), search);

    return (
      <div className="todo-app">
        <div className="search-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange}/>
        </div>
        <TodoList
          items={ visibleItems }
          onDelete={this.onDelete} />

        <ItemAddForm
          onItemAdded={this.onItemAdded} />
      </div>
    );
  };
}
