import { CheckCards } from '../../api/checkCards.js'
import { Answers } from '../../api/answers.js'

import './stats.html'

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
