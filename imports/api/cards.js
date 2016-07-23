import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Cards = new Mongo.Collection('cards');

Meteor.methods({
    'cards.getPublic'() {
        return Cards.find({ private: false }).fetch();
    }
});
