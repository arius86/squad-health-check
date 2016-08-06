import { CheckCards } from '../../api/checkCards.js'
import { Checks } from '../../api/checks.js'
import { Answers } from '../../api/answers.js'

import './stats.html'

Template.stats.onCreated(() => {
    const checkId = FlowRouter.getParam('checkId');

    Meteor.subscribe('check', checkId, () => {
        if (!Checks.find({ _id: checkId, owner: Meteor.userId() }).count())
        {
            FlowRouter.go('home');
        }
    });
    
    Meteor.subscribe('checkCards', checkId);
    Meteor.subscribe('answers', checkId);
});

Template.stats.helpers({
    cards() {
        return CheckCards.find({ checkId: FlowRouter.getParam('checkId'), active: true });
    },
    
    countTrendByValue(cardId, value) {
        return Answers.find({ checkId: FlowRouter.getParam('checkId'), checkCardId: cardId, trend: value }).count();
    },
    
    countStateByValue(cardId, value) {
        return Answers.find({ checkId: FlowRouter.getParam('checkId'), checkCardId: cardId, state: value }).count();
    }
});
