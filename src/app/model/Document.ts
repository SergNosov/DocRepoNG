import {Doctype} from './Doctype';
import {Sender} from './Sender';

export class Document {
    private _id: number;
    private _number?: string;
    private _docDate: Date;
    private _title: string;
    private _doctype: Doctype;
    private _senders: Sender[];
    private _content?: string;

    constructor(id: number, date: Date, title: string, doctype: Doctype, senders: Sender[], num?: string, content?: string) {
        this._id = id;
        this._number = num;
        this._docDate = date;
        this._title = title;
        this._doctype = doctype;
        this._senders = senders;
        this._content = content;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get number(): string {
        return this._number;
    }

    set number(value: string) {
        this._number = value;
    }

    get docDate(): Date {
        return this._docDate;
    }

    set docDate(value: Date) {
        this._docDate = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get doctype(): Doctype {
        return this._doctype;
    }

    set doctype(value: Doctype) {
        this._doctype = value;
    }

    get senders(): Sender[] {
        return this._senders;
    }

    set senders(value: Sender[]) {
        this._senders = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    toString(): string {
        return "[Document]: \n"+"id: "+this.id + "; \n" +
            "number: "+this.number + "; \n" +
            "docDate: "+this.docDate + "; \n" +
            "title: "+this.title + "; \n" +
            "doctype.id: "+this.doctype.id + "; \n"+
            "doctype.title: "+this.doctype.title + "; \n"+
            "senders count: "+this.senders.length+";\n";
    }
}
