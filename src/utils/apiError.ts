export default class ApiError extends Error {
    public status : number;

    public message: string;

    public constructor( {status, message} : {status:number, message:string}) {
        super();
        this.status = status;
        this.message = message;

    }

    public toObject() : object {
        return { status : this.status, message : this.message };
    }
}