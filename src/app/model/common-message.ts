export class CommonMessage {
    private _message: string;
    private _datetime: string;

    constructor(message: string, datetime: string) {
        this._message = message;
        this._datetime = datetime;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    get datetime(): string {
        return this._datetime;
    }

    set datetime(value: string) {
        this._datetime = value;
    }

    toString(): string {
        return this._message + "; " +
            this._datetime
    }
}
