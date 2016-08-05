import { Meteor } from 'meteor/meteor'

import './home.html'

Template.home.onCreated(() => {
    Meteor.subscribe('checks');
});

Template.home.events({
    'click #start-new-sqc'() {
        Meteor.call('checks.insert', (error, result) => {
            if (error) {
                handleError(error);
            } else if (result) {
                FlowRouter.go('prepare', { checkId: result });
            }
        });
    }
});
