import {Doctype} from './Doctype';
import {Sender} from './Sender';

export class Document {
  private _id: number;
  private _num?: string;
  private _date: Date;
  private _title: string;
  private _doctype: Doctype;
  private _senders: Sender[];
  private _context?: string;

  constructor(id: number, date: Date, title: string, doctype: Doctype, senders: Sender[], num?: string, context?: string) {
    this._id = id;
    this._num = num;
    this._date = date;
    this._title = title;
    this._doctype = doctype;
    this._senders = senders;
    this._context = context;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get num(): string {
    return this._num;
  }

  set num(value: string) {
    this._num = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
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

  get context(): string {
    return this._context;
  }

  set context(value: string) {
    this._context = value;
  }
}
