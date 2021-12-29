import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  apple = '0';

  selectedFile: any;

  constructor(private snackBar: MatSnackBar, private testService: TestService) { }

  ngOnInit(): void {
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
