import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';

import Item from './Item';

import Items from '../api/Items';

@autobind
class App extends Component {
  addItems(event) {
    event.preventDefault();
    const itemOne = this.refs.itemOne.value.trim();
    const itemTwo = this.refs.itemTwo.value.trim();
    if (itemOne !== '' && itemTwo !== '') {
      Meteor.call('insertNewItem', itemOne, itemTwo, (err, res) => {
        if(!err) {
          this.refs.itemOne.value = '';
          this.refs.itemTwo.value = '';
        }
      });
    }
  }

  showAll() {
    if(this.props.showAll) {
      Session.set('showAll', false);
    } else {
      Session.set('showAll', true);
    }

  }

  render() {
    if (!this.props.ready) {
        return <div>Loading</div>;
    }

    return (
      <main>
        <button onClick={this.showAll}>
          Show {this.props.showAll ? 'One' : 'All'}
        </button>
        <form className='new-items' onSubmit={this.addItems}>
          <input type='text' ref='itemOne' />
          <input type='text' ref='itemTwo'/>
          <button type='submit'>Add Items</button>
        </form>
        {this.props.items.map((item) => {
          return <Item item={item} key={item._id}/>
        })}
      </main>
    );
  }
}


export default createContainer(() => {
  let itemsSub = Meteor.subscribe('allItems');
  let showAll = Session.get('showAll');
  return {
    showAll,
    ready: itemsSub.ready(),
    items: Items.find({}, {
      limit: showAll ? 50 : 1,
      sort: { lastUpdated: 1 }
    }).fetch()
  }
}, App);
