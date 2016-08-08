import { Checks } from '../../api/checks'

import './home.html'

Template.home.onCreated(() => {
    Meteor.subscribe('checks');
});

Template.home.helpers({
    checks() {
        return Checks.find({ finalized: true }, { sort: { createdAt: -1 }, limit: 15 });
    },
    parseIsoDate(isoDate) {
        return moment(isoDate).fromNow();
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
