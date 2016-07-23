import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const CheckCards = new Mongo.Collection('checkCards');

Meteor.methods({
    'checkCards.insert'(checkId, title, pros, cons, private = false) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        
        check(checkId, String);
        check(title, String);
        check(pros, String);
        check(cons, String);
        
        CheckCards.insert({
            checkId,
            title,
            pros,
            cons,
            active: true,
            private,
            createdAt: new Date(),
            owner: this.userId
        });
    },
    'checkCards.update'(checkCardId, active) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        check(checkCardId, String);
        check(active, Boolean);

        CheckCards.update(checkCardId, {
            $set: { active: active }
        });
    },
    'checkCards.remove'(checkCardId) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        
        CheckCards.remove(checkCardId);
    }
});
