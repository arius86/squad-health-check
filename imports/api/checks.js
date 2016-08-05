import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Checks = new Mongo.Collection('checks');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('checks', (checkId) => {
        return Checks.find({ _id: checkId });
    });
}

Meteor.methods({
    'checks.insert'() {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        return Checks.insert({
            open: false,
            finalized: false,
            createdAt: new Date(), // current time
            owner: this.userId
        }, (err, checkId) => {
            if (err) {
                throw new Meteor.Error(err);
            } else {
                const cards = Meteor.call('cards.getPublic');
                for (var i in cards) {
                    Meteor.call('checkCards.insert', checkId, cards[i].title, cards[i].pros, cards[i].cons);
                }
            }
        });
    },
    'checks.open'(checkId) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        return Checks.update(checkId, {
            $set: {
                open: true
            }
        }, (err) => {
            if (err) {
                throw new Meteor.Error(err);
            }
        });
    },
    'checks.finalize'(checkId) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        return Checks.update(checkId, {
            $set: {
                open: false,
                finalized: true
            }
        }, (err) => {
            if (err) {
                throw new Meteor.Error(err);
            }
        });
    }
});
