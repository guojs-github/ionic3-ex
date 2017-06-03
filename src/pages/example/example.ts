import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HelloPage } from '../hello/hello';

@Component({
  selector: 'page-example',
  templateUrl: 'template.html'
})
export class ExamplePage {
	private _helloPage = HelloPage;

  constructor(public navCtrl: NavController) {

  }

}
