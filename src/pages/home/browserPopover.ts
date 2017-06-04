/*
	浏览器弹出菜单
	GuoJS 2017.6.3
*/
import { Component } from '@angular/core';
import { ViewController, NavParams } from "ionic-angular";

@Component({
	template: `
		<ion-list>
			<button ion-item detail-none (click)="refresh()">刷新</button>
			<button ion-item detail-none (click)="share()" *ngIf="parentCallback.share">分享</button>
		</ion-list>
	`
})
export class BrowserPopoverPage {
	parentCallback: {refresh: () => void, share?: () => void, close: () => void};
	constructor(
		public viewCtrl: ViewController,
		public navParams: NavParams
	) {
		this.parentCallback = this.navParams.data.callback;
	}

	// 刷新
	refresh() {
		this.parentCallback.refresh();
		this.viewCtrl.dismiss();
	}

	// 分享
	share() {
		this.parentCallback.share();
		this.viewCtrl.dismiss();
	}
}

