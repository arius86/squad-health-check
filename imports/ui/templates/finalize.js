import { CheckCards } from '../../api/checkCards.js'
import { Answers } from '../../api/answers.js'

import './finalize.html'

Template.finalize.onCreated(() => {
    Meteor.subscribe('checkCards', FlowRouter.getParam('checkId'));
});

Template.question.onCreated(() => {
    Meteor.subscribe('answers', FlowRouter.getParam('checkId'));
});

Template.finalize.onRendered(() => {
    $('.qr-code').qrcode({
        "size": 100,
        "color": "#000",
        "text": window.location.protocol + '//' + window.location.host + '/answer/' + FlowRouter.getParam('checkId')
    });
});

Template.finalize.helpers({
    getActiveCards() {
        return CheckCards.find({ checkId: FlowRouter.getParam('checkId'), active: true });
    },
    getAnswerUrl() {
        return window.location.protocol + '//' + window.location.host + '/answer/' + FlowRouter.getParam('checkId');
    }
});

Template.finalize.events({
    'click #close-sqc'() {
        Meteor.call('checks.update', FlowRouter.getParam('checkId'), false, 'stats');
    }
});

Template.question.helpers({
    countAnswers(cardId) {
        return Answers.find({ checkCardId: cardId, checkId: FlowRouter.getParam('checkId') }).count();
    }
});
