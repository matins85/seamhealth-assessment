import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Register } from '../shared/form';
// Gsap module
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Subject, Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-doctor-table',
  templateUrl: './doctor-table.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./doctor-table.component.scss'],
})
export class DoctorTableComponent implements OnInit {
  @ViewChild('form', { static: true })
  form!: ElementRef<HTMLDivElement>;
  // table
  @ViewChild('table', { static: true })
  table!: ElementRef<HTMLDivElement>;

  // table
  dtOptions: DataTables.Settings = {};
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  loading = false;
  is_loading = false;
  disabled = true;
  error = false;

  clickEventSubscription?: Subscription;

  constructor(
    private httpService: HttpService,
    public sharedService: ToggleNavService
  ) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe((data: any) => {
      this.datas.unshift(this.sharedService.getMessage())
    })
  }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };

    this.loading = true;
    this.httpService.doctotsList().subscribe(
      (data: any) => {
        // add data to table
        this.datas = data;
        this.dtTrigger.next;
        this.loading = false;
        this.error = false;
        // initialize animation
        this.initAnimations2();
      },
      (err: any) => {
        this.loading = false;
        this.error = true;
      }
    );
  }

  initAnimations2() {
    gsap.from(this.table.nativeElement.children, {
      delay: 0.5,
      duration: 0.4,
      x: -40,
      opacity: 0,
      stagger: 0.15,
    });
  }

  reload() {
    this.is_loading = true;
    this.httpService.doctotsList().subscribe(
      (data: any) => {
        // add data to table
        this.datas = data;
        this.dtTrigger.next;
        this.loading = false;
        this.error = false;
        // initialize animation
        this.initAnimations2();
      },
      (err: any) => {
        this.is_loading = false;
        this.error = true;
      }
    );
  }

  initAnimations(): void {
    gsap.from(this.form.nativeElement.children, {
      delay: 0.5,
      duration: 0.4,
      x: -40,
      opacity: 0,
      stagger: 0.15,
    });
  }

  ngOnInit(): void {
    this.initAnimations();
    this.renderTable();
  }
}
