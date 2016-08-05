this.handleError = (error) => {
    if (error.error === 'not-authorized') {
        alertify.error('You need to sign in!');
    } else {
        alertify.error(error.message);
    }
};
