import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-app-public-sidenav',
  templateUrl: './app-public-sidenav.component.html',
  styleUrls: ['./app-public-sidenav.component.scss'],
})
export class AppPublicSidenavComponent implements OnInit {
  headeropened = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver //  @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {}
}
