import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Data } from '../shared/form';
// Gsap module
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Subject } from 'rxjs';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-doctor-table',
  templateUrl: './doctor-table.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./doctor-table.component.scss']
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

  constructor() { }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.datas = Data;
    this.dtTrigger.next;
  }

  initAnimations(): void {
    gsap.from(this.form.nativeElement.children, {
      delay: 0.5,
      duration: 0.4,
      x: -40,
      opacity: 0,
      stagger: 0.15,
    });
    gsap.from(this.table.nativeElement.children, {
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
