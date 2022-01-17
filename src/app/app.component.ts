import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isIframe = false;
  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
  }
}
