export default class ApiError extends Error {
    status;
    message;
    constructor({ status, message }) {
        super();
        this.status = status;
        this.message = message;
    }
    toObject() {
        return { status: this.status, message: this.message };
    }
}
