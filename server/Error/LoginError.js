class LoginError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'LoginError';
        this.status = status;
    }
}

export default LoginError;
