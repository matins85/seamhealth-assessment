import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// Gsap module
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { Register } from '../shared/form';
import { ToggleNavService } from '../sharedService/toggle-nav.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('card', { static: true })
  card!: ElementRef<HTMLDivElement>;
  // card2
  @ViewChild('card2', { static: true })
  card2!: ElementRef<HTMLDivElement>;

  // form
  loading = false;
  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  feedback!: Register;
  disabled = false;

  clickEventSubscription?: Subscription;

  formErrors: any = {
    name: '',
    username: '',
    email: '',
    phone: '',
    city: '',
    website: '',
  };

  validationMessages: any = {
    name: {
      required: 'name is required.',
    },
    username: {
      required: 'username is required.',
    },
    email: {
      required: 'email is required.',
      email: 'email not valid.',
    },
    phone: {
      required: 'phone is required.',
    },
    city: {
      required: 'city is required.',
    },
    website: {
      required: 'website is required.',
    },
  };

  constructor(
    // private httpService: HttpService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public sharedService: ToggleNavService
  ) {
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      website: ['', [Validators.required]],
    });

    this.feedbackForm.valueChanges.subscribe((data: any) =>
      this.onValueChanged(data)
    );
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  nameError = false;
  usernameError = false;
  emailError = false;
  phoneError = false;
  cityError = false;
  websiteError = false;

  // validate form fields to check if any is empty
  checkFormValidity() {
    const feed = this.feedbackFormDirective.invalid;
    const control = this.feedbackFormDirective.form.controls;
    console.log(control);
    if (feed) {
      if (control.name.status == 'INVALID') {
        this.nameError = true;
        this.formErrors['name'] = 'name is required.';
      } else {
        this.nameError = false;
      }
      if (control.username.status == 'INVALID') {
        this.usernameError = true;
        this.formErrors['username'] = 'username is required.';
      } else {
        this.usernameError = false;
      }
      if (control.email.status == 'INVALID') {
        this.emailError = true;
        this.formErrors['email'] = 'email is required.';
      } else {
        this.emailError = false;
      }
      if (control.phone.status == 'INVALID') {
        this.phoneError = true;
        this.formErrors['phone'] = 'phone is required.';
      } else {
        this.phoneError = false;
      }
      if (control.city.status == 'INVALID') {
        this.cityError = true;
        this.formErrors['city'] = 'city is required.';
      } else {
        this.cityError = false;
      }
      if (control.website.status == 'INVALID') {
        this.websiteError = true;
        this.formErrors['website'] = 'website is required.';
      } else {
        this.websiteError = false;
      }
    } else {
      this.nameError = false;
      this.usernameError = false;
      this.emailError = false;
      this.phoneError = false;
      this.cityError = false;
      this.websiteError = false;
    }
  }

  // add doctor
  addDoctor() {
    this.checkFormValidity();
    const feed = this.feedbackFormDirective.invalid;

    if (feed) {
    } else {
      this.loading = true;
      this.disabled = true;
      this.feedback = this.feedbackForm.value;
      const data = {
        name: this.feedback.name,
        username: this.feedback.username,
        email: this.feedback.email,
        phone: this.feedback.phone,
        address: { city: this.feedback.city },
        website: this.feedback.website,
      };
      setTimeout(() => {
        this.sharedService.setMessage(data);
        this.loading = false;
        this.disabled = false;
        this.feedbackFormDirective.resetForm();
        this.snackBar.open('Registration successful!', '', {
          duration: 3000,
          panelClass: 'success',
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.sharedService.sendClickEvent();
      }, 3000);

      // this.httpService.doctotsList(data).subscribe(
      //   (data: any) => {
      //     this.loading = false;
      //     this.snackBar.open('Registration successful!', "", {
      //       duration: 3000,
      //       panelClass: "sucess",
      //       horizontalPosition: "center",
      //       verticalPosition: "top",
      //     });
      //   },
      //   (err: any) => {
      //     this.loading = false;
      //     this.snackBar.open('An error occured!', "", {
      //       duration: 3000,
      //       panelClass: "error",
      //       horizontalPosition: "center",
      //       verticalPosition: "top",
      //     });
      //   }
      // )
    }
  }

  initAnimations(): void {
    gsap.from(this.card.nativeElement.children, {
      delay: 0.5,
      duration: 0.4,
      y: 40,
      opacity: 0,
      stagger: 0.15,
    });
    // card2
    gsap.from(this.card2.nativeElement.children, {
      delay: 0.5,
      duration: 0.4,
      y: 40,
      opacity: 0,
      stagger: 0.15,
    });
  }

  ngOnInit(): void {
    this.initAnimations();
  }
}
