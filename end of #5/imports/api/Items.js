import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Items = new Mongo.Collection('items');

const ItemsSchema = new SimpleSchema({
  itemOne: {
    type: Object
  },
  'itemOne.text': {
    type: String
  },
  'itemOne.value': {
    type: SimpleSchema.Integer,
  },
  itemTwo: {
    type: Object
  },
  'itemTwo.text': {
    type: String
  },
  'itemTwo.value': {
    type: SimpleSchema.Integer,
  },
  lastUpdated: {
    type: Date,
    optional: true
  }
});

Items.attachSchema(ItemsSchema);



if (Meteor.isServer) {

  Meteor.publish('allItems', function() {
    return Items.find({}, {
      limit: 50,
      sort: { lastUpdated: 1 }
    });
  });


  Meteor.methods({
    insertNewItem(itemOne, itemTwo) {
      Items.insert({
        itemOne: {
          text: itemOne,
          value: 0,
        },
        itemTwo: {
          text: itemTwo,
          value: 0,
        }
      });
    },

    voteOnItem(item, position) {
      check(item, Object);
      let lastUpdated = new Date();
      if(Meteor.userId()) {
        if(position === 'itemOne') {
          Items.update(item._id, {
            $inc: {
              'itemOne.value': 1
            },
            $set: {
              lastUpdated
            }
          })
        } else {
          Items.update(item._id, {
            $inc: {
              'itemTwo.value': 1
            },
            $set: {
              lastUpdated
            }
          })
        }
      }
    }
  });
}



export default Items;
