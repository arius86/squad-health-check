import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Answers = new Mongo.Collection('checkCardAnswers');

Meteor.methods({
    'answers.insert'(checkId, checkCardId, state, trend) {
        check(checkId, String);
        check(checkCardId, String);
        check(state, Number);
        check(trend, Number);

        Answers.insert({
            checkId,
            checkCardId,
            state,
            trend,
            createdAt: new Date()
        });
    }
});
