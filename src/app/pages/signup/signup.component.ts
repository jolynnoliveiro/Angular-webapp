import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: any;
  get Username() { return this.signUpForm.get('Username')}
  get Password() { return this.signUpForm.get('Password')}
  get Contact() { return this.signUpForm.get('Contact')}

  constructor(public formBuilder: FormBuilder, public accountService: AccountService, public snackBar: MatSnackBar, public router: Router) { 
    this.signUpForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      Contact: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
   // console.log(this.signUpForm);
   console.log(this.signUpForm.value.Contact);

    if (this.signUpForm.valid) {
      const signUpObj = Object.assign({});
      signUpObj.username = this.signUpForm.value.Username.trim();
      signUpObj.password = this.signUpForm.value.Password;
      signUpObj.contact_number = this.signUpForm.value.Contact;

      this.accountService.signup(signUpObj).then(
        (res) => {
          this.snackBar.open(res[0].username, '', {
            duration: 2000
          })

          this.accountService.refreshSubject?.next(true);
          this.router.navigate(['/home']);

        }, rej => {
          this.snackBar.open(rej.error, '', {
            duration: 2000
          });
        }
      )

    } else {
      console.log('Please fill in all the requirement');

      this.snackBar.open('Please fill in all the requirement', '', {
        duration: 2000
      })
    }
  }

}
