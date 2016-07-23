import { Meteor } from 'meteor/meteor'

import './home.html'

Template.home.events({
    'click #start-new-sqc'() {
        Meteor.call('checks.insert');
    }
});
