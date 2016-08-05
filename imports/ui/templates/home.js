import { Checks } from '../../api/checks'

import './home.html'

Template.home.onCreated(() => {
    Meteor.subscribe('checks', Meteor.userId());
});

Template.home.helpers({
    checks() {
        return Checks.find({ owner: Meteor.userId(), finalized: true }, { sort: { createdAt: -1 }, limit: 5 });
    },
    getStatsUrl(checkId) {
       return FlowRouter.path('stats', { checkId }); 
    }
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
