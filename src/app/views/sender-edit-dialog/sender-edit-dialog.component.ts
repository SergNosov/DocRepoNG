import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Sender} from "../../model/Sender";

@Component({
    selector: 'app-sender-edit-dialog',
    templateUrl: './sender-edit-dialog.component.html',
    styleUrls: ['./sender-edit-dialog.component.css']
})
export class SenderEditDialogComponent implements OnInit {

    private tempSender: Sender = new Sender(0, '');
    private tempTitle: string = '';

    constructor(private dialogRef: MatDialogRef<SenderEditDialogComponent>,
                @Inject(MAT_DIALOG_DATA) private data: Sender
    ) {
    }

    ngOnInit() {
        if (this.data != undefined) {
            this.tempSender = new Sender(this.data.id, this.data.title);
            this.tempTitle = this.tempSender.title;
        }
    }

    onConfirm() {
        this.tempSender.title = this.tempTitle;
        this.dialogRef.close(this.tempSender);
    }

    onCancel() {
        this.dialogRef.close(null);
    }
}
