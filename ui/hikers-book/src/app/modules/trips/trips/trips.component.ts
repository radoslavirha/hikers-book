import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TripsGQL, TripsQuery } from './trips.generated';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnDestroy {
  destroyed = new Subject<void>();
  trips: Observable<TripsQuery['Trips']>;
  cols = 3;

  constructor(tripsGQL: TripsGQL, breakpointObserver: BreakpointObserver) {
    this.trips = tripsGQL.watch().valueChanges.pipe(map((result) => result.data.Trips));

    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
        // Breakpoints.Handset,
        // Breakpoints.Tablet,
        // Breakpoints.Web,
        // Breakpoints.HandsetPortrait,
        // Breakpoints.TabletPortrait,
        // Breakpoints.WebPortrait,
        // Breakpoints.HandsetLandscape,
        // Breakpoints.TabletLandscape,
        // Breakpoints.WebLandscape
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.setCols(breakpointObserver);
      });
  }

  private setCols(breakpointObserver: BreakpointObserver) {
    if (breakpointObserver.isMatched(Breakpoints.XSmall)) {
      this.cols = 1;
    } else if (breakpointObserver.isMatched(Breakpoints.Small)) {
      this.cols = 2;
    } else if (breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.cols = 3;
    } else if (breakpointObserver.isMatched(Breakpoints.Large)) {
      this.cols = 4;
    } else if (breakpointObserver.isMatched(Breakpoints.XLarge)) {
      this.cols = 5;
    } else {
      this.cols = 5;
    }
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
