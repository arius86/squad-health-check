import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Checks = new Mongo.Collection('checks');

if (Meteor.isServer) {
    Meteor.publish('check', (checkId) => {
        return Checks.find({ _id: checkId });
    });

    Meteor.publish('checks', (userId) => {
        if (userId) {
            return Checks.find({ owner: userId });    
        }
        return [];
    });
}

Meteor.methods({
    'checks.insert'() {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        return Checks.insert({
            name: 'My Squad Health Check',
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
    },
    'checks.updateName'(checkId, name) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        return Checks.update(checkId, {
            $set: {
                name
            }
        }, (err) => {
            if (err) {
                throw new Meteor.Error(err);
            }
        });
    }
});
