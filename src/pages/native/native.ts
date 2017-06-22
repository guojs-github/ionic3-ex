/*
	本地功能演示
	2017.5.29 GuoJS
*/
import { Component } from '@angular/core';
import { AlertController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BatteryStatus, BatteryStatusResponse } from '@ionic-native/battery-status';
import { Network } from '@ionic-native/network';

declare var cordova: any;

@Component({
	templateUrl: 'template.html',
	providers: [
		AndroidFingerprintAuth
		, BarcodeScanner
		, InAppBrowser
		, BatteryStatus
		, Network
	]
})
export class NativePage {
	private _fingerprintConfig = {
		clientId:"sample3"
		, username:"GuoJS"
		, locale:"zh_CN"
		, disableBackup:true
		, maxAttempts:3
		, token:""		
	};
	private _fingerprintKey = "token";
	private _barcode = "OK!RKTZ-20170531-000001";
	private _batteryLevel:number = 100; // 电池状态
	private _batteryIsPlugin: boolean = false; // 电池插入状态
	private _connected:boolean = false; // 网络连接状态

	// Events
	private _connect: any = null;
	private _disconnect: any = null;
	private _batteryStatus: any = null;
	
	constructor(
		public nav: NavController // 导航控件
		, public platform: Platform
		, public alertCtrl: AlertController // 消息窗口
 		, public androidFingerprintAuth: AndroidFingerprintAuth // 指纹识别	
		, public storage: Storage // 存储对象
 		, public barcodeScanner: BarcodeScanner // 条码扫描
		, public iab: InAppBrowser // 内置浏览器
		, public batteryStatus: BatteryStatus // 电池状态
		, public network: Network // 网络对象
	) {		
		this.init();
	}
	
	init() { // initialize
		this.loadFingerprint(); // Read footprint
		
		// watch change in battery status
		this._batteryStatus = this.batteryStatus.onChange().subscribe(
			(status: BatteryStatusResponse) => {
				console.log(status.level, status.isPlugged);
				this._batteryLevel = status.level;
				this._batteryIsPlugin = status.isPlugged;
			}
		);
		
		// watch network
		this._disconnect = this.network.onDisconnect().subscribe(() => {
			this.alert("网络断开");
			this._connected = false;
		});
		this._connect = this.network.onConnect().subscribe(() => {
			this.alert("网络连接");
			// this.alert(this.network.type);
			if ("wifi" == this.network.type)
				this._connected = true;				
		});
				
		// Check connection status
		this.checkConnection();		
	}
	
	finalize() { // Release
		this._batteryStatus.unsubscribe();
		this._disconnect.unsubscribe();
		this._connect.unsubscribe();
	}
	
	onBack() { // 回退窗口
		// alert("Back");
		this.finalize();
		this.nav.pop();
	}
	
 	alert(message) { // 消息提示
		let alert = this.alertCtrl.create({
		  title: "提示",
		  message: message,
		  buttons: [
			{
				text: "朕知道了",
				handler: () => {
					console.log("朕知道了");
				}
			}
		  ]
		});
		alert.present()			
	}

  	resetFingerprint() { // Reset fingerprint
		this._fingerprintConfig = {
			clientId: "myionic2"
			, username: "guojs"
			, locale: "zh_CN"
			, disableBackup: true
			, maxAttempts: 3
			, token : ""
		};
	}
	
 	loadFingerprint() { // load fingerprint
		this.resetFingerprint();
		this.storage.get(this._fingerprintKey)
			.then((val) => {
				if (null != val) 
					this._fingerprintConfig.token = val;
			})
			.catch((error) => {
				this.alert("读取指纹记录失败");
			});		
	}

	detectFingerprint() { // 检测指纹支持
		let fpa = this.androidFingerprintAuth;
		fpa.isAvailable()
			.then((result)=> {
			if(result.isAvailable){
				// it is available
				this.alert("当前设备支持指纹检测");
			} else {
				// fingerprint auth isn't available
				this.alert("当前设备不支持指纹检测！");
			}
		})
		.catch(error => {
			console.error(error);
			this.alert("抱歉！发生错误【" + error + "】");
		});		
	}
	
	deleteFingerprint() { // Remove fingerprint
		if ("" == this._fingerprintConfig.token) {
			this.alert("指纹记录为空，不能删除。");
			return;
		}
		let fpa = this.androidFingerprintAuth;
		fpa.delete(this._fingerprintConfig)
			.then((result)=> {
				this.resetFingerprint();
				this.storage.remove(this._fingerprintKey);				
				this.alert("指纹记录删除");
			})
			.catch(error => {
				console.error(error);
				this.alert("抱歉！发生错误【" + error + "】");
			});		
	}

	createFingerprint() { // create fingerprint
		if ("" != this._fingerprintConfig.token) {
			this.alert("删除已存在指纹，才能创建新指纹。");
			return;
		}
		
		var config = {
			clientId: this._fingerprintConfig.clientId
			, username: this._fingerprintConfig.username
			, locale: this._fingerprintConfig.locale
			, disableBackup: this._fingerprintConfig.disableBackup
			, maxAttempts: this._fingerprintConfig.maxAttempts
			, password: "1234567809"
		};		
		let fpa = this.androidFingerprintAuth;
		fpa.encrypt(config)
			.then((result) => {
				this.alert("指纹创建【" + JSON.stringify(result) + "】");
				if (result.withFingerprint) {
					this._fingerprintConfig.token = result.token;
					this.storage.set(this._fingerprintKey, this._fingerprintConfig.token);				
				}
			})
			.catch((error) => {
				console.error(error);
				this.alert("抱歉！发生错误【" + error + "】");
			});		
	}
	
	checkFingerprint() { // check fingerprint
		var config = {
			clientId: this._fingerprintConfig.clientId
			, username: this._fingerprintConfig.username
			, locale: this._fingerprintConfig.locale
			, disableBackup: this._fingerprintConfig.disableBackup
			, maxAttempts: this._fingerprintConfig.maxAttempts
			, token: this._fingerprintConfig.token
		};		
		let fpa = this.androidFingerprintAuth;
		fpa.decrypt(config)
			.then((result) => {
				this.alert("指纹认证通过【" + JSON.stringify(result) + "】");
				if (result.withFingerprint) {
					this.alert("<p>认证通过</p><p><b>密码</b>" + result.password + "</p>");					
				}
			})
			.catch((error) => {
				console.error(error);
				this.alert("抱歉！发生错误【" + error + "】");
			});		
	}
	
	scanBarcode() { // 扫描二维码
		let scan = this.barcodeScanner;
		scan.scan().then((barcodeData) => {
			// Success! Barcode data is here
			this.alert(
				"<p><b>内容：</b>" + barcodeData.text + "</p>" 
				+ "<p><b>格式：</b>" + barcodeData.format + "</p>" 
				+ "<p><b>取消？</b>" + barcodeData.cancelled + "</p>" 
			);
		}
		, (error) => {
			// An error occurred
			console.error(error);
			this.alert("抱歉！发生错误【" + error + "】");
		}
		);		
	}
	
	cordovaNavigate(url) { // 内置浏览器
		var ref = cordova.InAppBrowser.open(url, "_blank", "location=no");
		let barcode = this._barcode;
		ref.addEventListener('loadstart', function(event) { alert("开始加载" + event.url); });		
		ref.addEventListener('exit', function(event) { alert("浏览器退出"); alert("测试获取barcode的值" + barcode)});		
	} 

	navigate(url) { // 内置浏览器	 
 		let browser = this.iab.create( url, "_blank", "location=yes");
	} 
	
	checkConnection() { // 检查当前网络状态
		// alert(this.network.type);
		if ("wifi" == this.network.type)
			this._connected = true;				
	}	
}