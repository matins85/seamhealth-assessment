import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
// Gsap module
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Subject, Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { ToggleNavService } from '../sharedService/toggle-nav.service';
import { FormBuilder } from '@angular/forms';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-doctor-table',
  templateUrl: './doctor-table.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./doctor-table.component.scss'],
})
export class DoctorTableComponent implements OnInit {
  @ViewChild('card', { static: true })
  card!: ElementRef<HTMLDivElement>;
  // table
  @ViewChild('table', { static: true })
  table!: ElementRef<HTMLDivElement>;

  // table
  dtOptions: DataTables.Settings = {};
  datas2: any[] = [];
  datas: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  loading = false;
  is_loading = false;
  disabled = true;
  error = false;
  search: string = '';

  clickEventSubscription?: Subscription;

  constructor(
    private httpService: HttpService,
    public sharedService: ToggleNavService,
    private fb: FormBuilder
  ) {
    this.sharedService.setMessage('')
    this.clickEventSubscription = this.sharedService
      .getClickEvent()
      .subscribe((data: any) => {
        this.datas.unshift(this.sharedService.getMessage());
        this.datas2.unshift(this.sharedService.getMessage());
      });
  }

  // search form
  modelChange(search: any) {
    const data = this.datas2?.filter((data: any) => {
      return (
        data.name.toLowerCase().startsWith(search.toLowerCase()) ||
        data.username.toLowerCase().startsWith(search.toLowerCase()) ||
        data.email.toLowerCase().startsWith(search.toLowerCase()) ||
        data.phone.toLowerCase().startsWith(search.toLowerCase()) ||
        data.address.city.toLowerCase().startsWith(search.toLowerCase()) ||
        data.website.toLowerCase().startsWith(search.toLowerCase())
      );
    });
    this.datas = data;
  }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.loading = true;
    this.httpService.doctotsList().subscribe(
      (data: any) => {
        // add data to table
        this.datas = data;
        this.datas2 = data;
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
        this.datas2 = data;
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
    gsap.from(this.card.nativeElement.children, {
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
