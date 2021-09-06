import { Component, OnInit } from '@angular/core';

declare var FB: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // needed for reload after navigation
    if (FB != null && FB.XFBML != null) {
      FB.XFBML.parse();
    }
  }

}
