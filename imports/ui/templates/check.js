import { Checks } from '../../api/checks.js'
import { CheckCards } from '../../api/checkCards.js'

import '../components/card.html'
import './check.html'

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
        CheckCards.update(this._id, {
            $set: { active: !this.active }
        });
    },
    'click .card .glyphicon-trash'(event) {
        event.preventDefault();
        CheckCards.remove(this._id);
    },
    'submit .new-card'(event) {
        event.preventDefault();
        
        const target = event.target;
        const title = target.title.value;
        const pros = target.pros.value;
        const cons = target.cons.value;

        CheckCards.insert({
            checkId: FlowRouter.getParam('checkId'),
            title,
            pros,
            cons,
            active: true,
            private: true,
            createdAt: new Date()
        });

        // clear form
        target.title.value = '';
        target.pros.value = '';
        target.cons.value = '';
    },
    'click #start-new-sqc'() {
        var checkId = FlowRouter.getParam('checkId');
        Checks.update(checkId, {
            $set: {
                open: true
            }
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                FlowRouter.go('finalize', { checkId: checkId });
            }
        });
    }
});
