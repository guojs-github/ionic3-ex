import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HelloPage } from '../hello/hello';
import { AlertController} from 'ionic-angular';
import { Jsonp } from '@angular/http';

@Component({
	selector: 'page-example'
	, templateUrl: 'template.html'
})
export class ExamplePage {
	private _helloPage = HelloPage;

	constructor(
		public navCtrl: NavController
		, public alertCtrl: AlertController
		, public jsonp: Jsonp
	) {
	}
	
 	private alert(ctrl, message) { // 消息提示
		let alert = ctrl.create({
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

	private ajaxTest() { // AJAX测试
		var alert = this.alert;
		var alertCtrl = this.alertCtrl;
		var url = "http://api.map.baidu.com/geocoder/v2/?callback=JSONP_CALLBACK&output=json&address=故宫&ak=bxrk9NvT5ORyGv21aVUzSVrcn39DLpz6"; //请求地址
		this.jsonp
			.get(url)
			.subscribe(
				(data) => {					
					// console.log(JSON.stringify(data));
					alert(alertCtrl, JSON.stringify(data));
					var result = data.json().result;
					alert(alertCtrl, JSON.stringify(result));					
				}
				,(error) => {
					// console.log(error);
					alert(alertCtrl, error);
				}
			); 
	} // ajax test	
}
