import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Cards = new Mongo.Collection('cards');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('cards', () => {
        return Cards.find();
    });
}

Meteor.methods({
    'cards.getPublic'() {
        return Cards.find({ private: false }).fetch();
    }
});
