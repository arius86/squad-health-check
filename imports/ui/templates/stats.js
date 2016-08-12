import { CheckCards } from '../../api/checkCards.js'
import { Checks } from '../../api/checks.js'
import { Answers } from '../../api/answers.js'

import './stats.html'

let returnMaxFromResultSet = (resultSet) => {
    let max = {
        _id: null,
        count: null
    };

    if (resultSet) {
        for (var i = 0; i < resultSet.length; i++) {
            if (max.count < resultSet[i].count) {
                max = resultSet[i];
            }
        }
    }

    return max;
};

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
    },

    getOverallIconClass(cardId) {
        const states = ReactiveMethod.call('getAnswersStateData', FlowRouter.getParam('checkId'), cardId);
        const trends = ReactiveMethod.call('getAnswersTrendData', FlowRouter.getParam('checkId'), cardId);

        let state = returnMaxFromResultSet(states);
        let trend = returnMaxFromResultSet(trends);

        return 'overall-' + state._id + '-' + trend._id;
    }
});
