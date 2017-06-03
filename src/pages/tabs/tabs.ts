import { Component } from '@angular/core';

import { ExamplePage } from '../example/example';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'template.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ExamplePage;
  tab3Root = ContactPage;

  constructor() {

  }
}
