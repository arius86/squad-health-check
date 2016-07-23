import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Checks = new Mongo.Collection('checks');

Meteor.methods({
    'checks.insert'() {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Checks.insert({
            open: false,
            createdAt: new Date(), // current time
            owner: this.userId
        }, (err, checkId) => {
            if (err) {
                console.log(err);
            } else {
                const cards = Meteor.call('cards.getPublic');

                for (var i in cards) {
                    Meteor.call('checkCards.insert', checkId, cards[i].title, cards[i].pros, cards[i].cons);
                }

                FlowRouter.go('check', { checkId: checkId });
            }
        });
    },
    'checks.update'(checkId, open, action) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        check(open, Boolean);
        check(action, String);
        
        Checks.update(checkId, {
            $set: {
                open
            }
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                FlowRouter.go(action, { checkId: checkId });
            }
        });
    }
});
