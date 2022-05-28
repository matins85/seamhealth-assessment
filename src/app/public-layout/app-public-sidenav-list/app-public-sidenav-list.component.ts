import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-app-public-sidenav-list',
  templateUrl: './app-public-sidenav-list.component.html',
  styleUrls: ['./app-public-sidenav-list.component.scss'],
})
export class AppPublicSidenavListComponent implements OnInit {
  @Output() public publicsidenavClose = new EventEmitter();

  clickEventSubscription?: Subscription;

  constructor() {}

  ngOnInit(): void {}

  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavClose.emit();
  };
}
