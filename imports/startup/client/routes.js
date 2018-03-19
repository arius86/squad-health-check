import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/mainLayout.html';
import '../../ui/layouts/notFound.html';

import '../../ui/templates/home.js';
import '../../ui/templates/prepare.js';
import '../../ui/templates/finalize.js';
import '../../ui/templates/answer.js';
import '../../ui/templates/stats.js';
import '../../ui/templates/privacy.js';

FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('mainLayout', { content: 'home' });
    }
});

FlowRouter.route('/prepare/:checkId', {
    name: 'prepare',
    action() {
        BlazeLayout.render('mainLayout', { content: 'prepare' });
    }
});

FlowRouter.route('/finalize/:checkId', {
    name: 'finalize',
    action() {
        BlazeLayout.render('mainLayout', { content: 'finalize' });
    }
});

FlowRouter.route('/answer/:checkId', {
    name: 'answer',
    action() {
        BlazeLayout.render('mainLayout', { content: 'answer' });
    }
});

FlowRouter.route('/stats/:checkId', {
    name: 'stats',
    action() {
        BlazeLayout.render('mainLayout', { content: 'stats' });
    }
});

FlowRouter.route('/privacy', {
    name: 'privacy',
    action() {
        BlazeLayout.render('mainLayout', { content: 'privacy'});
    }
});

FlowRouter.notFound = {
    action() {
        BlazeLayout.render('notFound');
    }
};
