this.handleError = (error) => {
    if (error.error === 'not-authorized') {
        FlashMessages.sendError('You need to sign in!');
    } else {
        FlashMessages.sendError(error.message);
    }
};

this.showInfo = (message) => {
    FlashMessages.sendInfo(message);
};
