import { Checks } from '../../api/checks.js';
import { CheckCards } from '../../api/checkCards.js';
import { Cards } from '../../api/cards.js';

import './home.html'

Template.home.events({
    'click #start-new-sqc'() {
        Checks.insert({
            open: false,
            createdAt: new Date() // current time
        }, (err, checkId) => {
            if (err) {
                console.log(err);
            } else {
                const cards = Cards.find({ private: false }).fetch();

                for (var i in cards) {
                    CheckCards.insert({
                        checkId: checkId,
                        title: cards[i].title,
                        pros: cards[i].pros,
                        cons: cards[i].cons,
                        active: true,
                        private: false,
                        createdAt: new Date()
                    });
                }

                FlowRouter.go('check', { checkId: checkId });
            }
        });
    }
});
