import { Meteor } from 'meteor/meteor'
import { Checks } from '../../api/checks.js'
import { CheckCards } from '../../api/checkCards.js'

import '../components/card.html'
import './prepare.html'

const optimalNbOfCards = 10;

let activeCardsCount = () => {
    return CheckCards.find({ checkId: FlowRouter.getParam('checkId'), active: true }).count();
}

Template.prepare.onCreated(() => {
    const checkId = FlowRouter.getParam('checkId');

    Meteor.subscribe('checks', checkId, () => {
        if (Checks.find({ $or: [{ open: true}, { finalized: true }] }).count()) {
            FlowRouter.go('home');
        }
    });
    
    Meteor.subscribe('cards');
    Meteor.subscribe('checkCards', checkId);
});

Template.prepare.helpers({
    activeCardsCounter() {
        return activeCardsCount();
    },
    getCounterCssClass() {
        return activeCardsCount() > optimalNbOfCards ? 'warning' : '';
    },
    checkCards() {
        return CheckCards.find({ checkId: FlowRouter.getParam('checkId') });
    }
});

Template.prepare.events({
    'click .card'() {
        if (this._id !== undefined) {
            Meteor.call('checkCards.update', this._id, !this.active);
        }
    },
    'click .card .glyphicon-trash'(event) {
        event.preventDefault();
        Meteor.call('checkCards.remove', this._id);
    },
    'submit .new-card'(event) {
        event.preventDefault();
        
        const target = event.target;
        const title = target.title.value;
        const pros = target.pros.value;
        const cons = target.cons.value;

        Meteor.call('checkCards.insert', FlowRouter.getParam('checkId'), title, pros, cons, true);

        // clear form
        target.title.value = '';
        target.pros.value = '';
        target.cons.value = '';
    },
    'click #start-new-sqc'() {
        let forwardCall = () => {
            const checkId = FlowRouter.getParam('checkId');
            Meteor.call('checks.open', checkId, (error) => {
                if (error) {
                    handleError(error);
                } else {
                    FlowRouter.go('finalize', { checkId });
                }
            });
        };

        if (activeCardsCount() !== optimalNbOfCards) {
            alertify.confirm(
                'You have ' + activeCardsCount() + ' from optimal numbe of ' + optimalNbOfCards + ' cards selected. Are you sure?',
                (e) => {
                    if (e) {
                        forwardCall();
                    }
                }
            );
        } else {
            forwardCall();
        }
    }
});
