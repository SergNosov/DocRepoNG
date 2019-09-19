export class RepoCategory {
    private _id: number;
    private _title: string;
    private _link: string;

    constructor(id: number, title: string, link: string) {
        this._id = id;
        this._title = title;
        this._link = link;
    }

    get link(): string {
        return this._link;
    }

    set link(value: string) {
        this._link = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }
}
