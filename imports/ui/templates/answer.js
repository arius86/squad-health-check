import { Checks } from '../../api/checks'
import { CheckCards } from '../../api/checkCards.js'

import './answer.html'
import '../components/card.html'

Template.answer.onCreated(() => {
    const checkId = FlowRouter.getParam('checkId');
    Template.instance().answers = new ReactiveVar([]);

    Meteor.subscribe('check', checkId, () => {
        if (Checks.find({ _id: checkId, open: false }).count()) {
            FlowRouter.go('home');
        }
    });

    Meteor.subscribe('checkCards', checkId);
});

Template.answer.helpers({
    getNextCard() {
        return CheckCards.find({ checkId: FlowRouter.getParam('checkId'), active: true });
    },

    getAnswers() {
        return Template.instance().answers.get();
    }
});

Template.answer.events({
    'submit .answer-form'(event) {
        event.preventDefault();

        Meteor.call(
            'answers.insert',
            FlowRouter.getParam('checkId'),
            this._id,
            Number(this.state),
            Number(this.trend)
        );

        let answers = Template.instance().answers.get();

        answers.push({
            'title': this.title,
            'state': this.state,
            'trend': this.trend
        });

        Template.instance().answers.set(answers);
        
        $("input[name='state']").prop('checked', false);
        $("input[name='trend']").prop('checked', false);
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $('.carousel').carousel('next');
    },

    'change input[name=state]'() {
        this.state = $("input[name='state']:checked").val();
        $("input[name='state']").parent().removeClass('selected');
        $("input[name='state']:checked").parent().addClass('selected');
    },

    'change input[name=trend]'() {
        this.trend = $("input[name='trend']:checked").val();
        $("input[name='trend']").parent().removeClass('selected');
        $("input[name='trend']:checked").parent().addClass('selected');
    }
});
