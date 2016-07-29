import { Meteor } from 'meteor/meteor'
import { Checks } from '../../api/checks.js'
import { CheckCards } from '../../api/checkCards.js'

import '../components/card.html'
import './check.html'

Template.check.onCreated(() => {
    Meteor.subscribe('cards');
    Meteor.subscribe('checkCards', FlowRouter.getParam('checkId'));
});

Template.check.helpers({
    activeCardsCounter() {
        return CheckCards.find({ checkId: FlowRouter.getParam('checkId'), active: true }).count();
    },
    checkCards() {
        return CheckCards.find({ checkId: FlowRouter.getParam('checkId') });
    }
});

Template.check.events({
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
        Meteor.call('checks.update', FlowRouter.getParam('checkId'), true, 'finalize');
    }
});
