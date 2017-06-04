/*
	内嵌页面
	GuoJS 2017.6.3
*/
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { DomSanitizer } from "@angular/platform-browser";
import { BrowserPopoverPage } from "./browserPopover";

@Component({
	selector: 'home-page',
	templateUrl: 'template.html'
})
export class HomePage {
	private _browser: any = {
		isLoaded: false, // 网页是否被加载
		progressbar: null, // 进度条对象
		progress: 0, // 网页访问的进度条
		secUrl: '', // 安全链接
		title: '加载中',
		url: '',
		share: null // 是否具有分享功能（传递一个分享对象ShareModel过来）
	};
	_shareConfig: any = {
		isShow: false
	}; // 分享控制的配置	
	
	constructor(
		public navCtrl: NavController
		, public params: NavParams
		, public sanitizer: DomSanitizer
		, public popoverCtrl: PopoverController
	) {
		this._browser.title = "百度搜索";
		this._browser.url = "http://www.baidu.com";
		// this._browser.url = "http://api.map.baidu.com/geocoder/v2/?callback=JSONP_CALLBACK&output=json&address=故宫&ak=bxrk9NvT5ORyGv21aVUzSVrcn39DLpz6";
		this._browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._browser.url);
		
		this.reload(); // 强制加载
	}
	
	// 如果iframe页面加载成功后
	private loaded() {
		this._browser.isLoaded = true;
	}

	// 生成随机数
	private random(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
  
	// 网页访问进度
	private onProgress() {
		// 随机时间
		let timeout = this.random(10, 30);

		let timer = setTimeout(() => {
			if (this._browser.isLoaded) {
				this._browser.progressbar.style.width = '100%';
				clearTimeout(timer); // 停时钟
				return;
			}

			// 随机进度
			this._browser.progress += 10;

			// 随机进度不能超过 90%，以免页面还没加载完毕，进度已经 100% 了
			if (this._browser.progress > 90){
				this._browser.progress = 90;
			}

			this._browser.progressbar.style.width = this._browser.progress + '%';
			this.onProgress();
		}, timeout);
	}
	
	// 重新加载页面
	private reload() {
		let title = this._browser.title;
		let url = this._browser.secUrl;
		this._browser.title = "加载中";
		this._browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl("");

		setTimeout(() => {
			this._browser.isLoaded = false;
			this._browser.progress = 0; // 初始化进度条
			if (!this._browser.progressbar) { // 获取进度条对象
				this._browser.progressbar = document.getElementById('progress'); 
			}
			this.onProgress();
			this._browser.title = title;
			this._browser.secUrl = url;
		}, 10);
	}

	// 显示Popver选项
	presentPopover(myEvent) {
		let cb = {
			refresh: () => {
				this.reload();
			}
			, share: null
		};

		if (this._browser.share) { // 分享功能设定
			cb.share = () => {
				this._browser.share();
			}
		}

		let popover = this.popoverCtrl.create(BrowserPopoverPage, {callback: cb});
		popover.present({ev: myEvent}); // 显示popover
	}	
}


