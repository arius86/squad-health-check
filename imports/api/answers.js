import { Mongo } from 'meteor/mongo';

export const Answers = new Mongo.Collection('checkCardAnswers');

Meteor.methods({
    'answers.insert'(checkId, checkCardId, state, trend) {
        Answers.insert({
            checkId: checkId,
            checkCardId: checkCardId,
            state: state,
            trend: trend,
            createdAt: new Date()
        });
    }
});
