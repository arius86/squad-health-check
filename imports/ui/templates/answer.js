import { CheckCards } from '../../api/checkCards.js'

import './answer.html'
import '../components/card.html'

Template.answer.onCreated(() => {
    Meteor.subscribe('checkCards', FlowRouter.getParam('checkId'));
});

Template.answer.helpers({
    getNextCard() {
        return CheckCards.find({ checkId: FlowRouter.getParam('checkId'), active: true });
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
        
        $("input[name='state']").prop('checked', false);
        $("input[name='trend']").prop('checked', false);
        $('.carousel').carousel('next')
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
