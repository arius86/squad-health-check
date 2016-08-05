import { Checks } from '../../api/checks.js'
import { CheckCards } from '../../api/checkCards.js'
import { Answers } from '../../api/answers.js'

import './finalize.html'

let generateAnswerUrl = (checkId) => {
    return window.location.protocol + '//' + window.location.host + '/answer/' + checkId;
}

Template.finalize.onCreated(() => {
    const checkId = FlowRouter.getParam('checkId');

    Meteor.subscribe('checks', checkId, () => {
        if (Checks.find({ finalized: true }).count()) {
            FlowRouter.go('home');
        }
    });

    Meteor.subscribe('checkCards', checkId);
    Meteor.subscribe('answers', checkId);
});

Template.finalize.onRendered(() => {
    $('.qr-code').qrcode({
        "size": 100,
        "color": "#000",
        "text":  generateAnswerUrl(FlowRouter.getParam('checkId'))
    });
});

Template.finalize.helpers({
    getActiveCards() {
        return CheckCards.find({ checkId: FlowRouter.getParam('checkId'), active: true });
    },
    getAnswerUrl() {
        return generateAnswerUrl(FlowRouter.getParam('checkId'))
    }
});

Template.finalize.events({
    'click #close-sqc'() {
        const checkId = FlowRouter.getParam('checkId');
        Meteor.call('checks.finalize', checkId, (error) => {
            if (error) {
                handleError(error);
            } else {
                FlowRouter.go('stats', { checkId });
            }
        });
    }
});

Template.question.helpers({
    countAnswers(cardId) {
        return Answers.find({ checkCardId: cardId, checkId: FlowRouter.getParam('checkId') }).count();
    }
});
