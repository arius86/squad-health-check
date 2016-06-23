import { Checks } from '../../api/checks.js'
import { CheckCards } from '../../api/checkCards.js'
import { Answers } from '../../api/answers.js'

import './finalize.html'

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
        var checkId = FlowRouter.getParam('checkId');
        Checks.update(checkId, {
            $set: {
                open: false
            }
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                FlowRouter.go('stats', { checkId: checkId });
            }
        });
    }
});

Template.question.helpers({
    countAnswers(cardId) {
        return Answers.find({ checkCardId: cardId, checkId: FlowRouter.getParam('checkId') }).count();
    }
});
