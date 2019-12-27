import { CheckCards } from '../../api/checkCards.js'
import { Checks } from '../../api/checks.js'
import { Answers } from '../../api/answers.js'

import './stats.html'

let returnMax = (data) => {
    let max = {
        key: null,
        count: null
    };

    if (data) {
       for (let key in data) {
           if (data[key] > max.count) {
               max.key = key;
               max.count = data[key];
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
        const answers = Answers.find({ checkId: FlowRouter.getParam('checkId'), checkCardId: cardId });
        let states = { "-1": 0, "0": 0, "1": 0 };
        let trends = { "-1": 0, "0": 0, "1": 0 };

        answers.forEach(function (answer) {
            states[answer.state]++;
            trends[answer.trend]++;
        });

        let state = returnMax(states);
        let trend = returnMax(trends);

        return 'overall-' + state.key + '-' + trend.key;
    }
});
