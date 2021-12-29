import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestService } from 'src/app/services/test.service';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  apple = '0';

  selectedFile: any;

  constructor(
    private snackBar: MatSnackBar, 
    private testService: TestService, 
    private accountService: AccountService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    console.log(f.value);

    const credentials = { username: f.value.username, password: f.value.password }

    if (f.valid) {
      this.accountService.login(credentials).then(
        (res) => {
          this.accountService.refreshSubject?.next(true);
          //this.router.navigate(['/home']);

          if (res[0].role_id == 1) {
            this.router.navigate(['/admin']);
          }

          if (res[0].role_id == 0) {
            this.router.navigate(['/home']);
          }

        }, rej => {
          this.snackBar.open(rej.error, '', {
            duration: 2000,
         })
        }
      )
    } else {
      this.snackBar.open('Please fill in all input', '',{
        duration: 2000,
      })
    }
  }

  testClick() {
    this.testService.testHttpGet().then(
      res => {
        this.snackBar.open(res.username, '', {
        duration: 2000,
      })
      }, rej => {
        this.snackBar.open(rej.statusText, '', {
          duration: 2000,
       })
      }
    )
}
onFileSelected(e: any) {
  console.log(e);
  this.selectedFile = <File>e.target.files[0];
}

onUpload() {
if (this.selectedFile != null) {
  this.testService.httpUploadFile(this.selectedFile).then(
    res => {
      this.snackBar.open(res, '', {
      duration: 2000,
    })

    }, rej => {
      this.snackBar.open(rej, '', {
        duration: 2000,
     })
    }
  )

}
else {
  this.snackBar.open('Please input any file before upload', '', {
    duration: 2000,
  })
}

}
}
