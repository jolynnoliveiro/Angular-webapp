import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UploadFilesService} from 'src/app/services/upload-files.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  selectedFile: any;
  selectedPaperType: string = '';
  paperTypes: string[] = ['A4'];

  selectedInkType: string = '';
  inkTypesInteger: number = 0;
  inkTypes: string[] = ['Color','Black & White'];

  selectedBindingType: string = '';
  bindingTypesInteger: number = 0;
  bindingTypes: string[] = ['None', 'Black Tape Binding', 'Comb Binding'];

  selectedPaperFrontBackType: string = '';
  paperFrontBackTypesInteger: number = 0;
  paperFrontBackTypes: string[] = ['Front Only', 'Front & Back'];

  selectedCoverType: string = '';
  coverTypesInteger: number = 0;
  coverTypes: string[] = ['None', 'Transparent Hard Plastic Cover', 'Hard Cover'];

  message: string = '';

  constructor( public snackBar: MatSnackBar, 
               public router: Router,
               public accountService: AccountService,
               public uploadFilesService: UploadFilesService) { }

  ngOnInit(): void {
  }
  onFileSelected(e: any) {
    console.log(e);
    this.selectedFile = <File>e.target.files[0];
  }
  
  onUpload() {

    if (this.selectedInkType == '') {
      this.snackBar.open('Please choose your color', '', {
        duration: 2000,
      })
      return;
    }

    if (this.selectedPaperType == '') {
      this.snackBar.open('Please choose your paper type', '', {
        duration: 2000,
      })
      return;
    }

    if (this.selectedBindingType == '') {
      this.snackBar.open('Please choose your binding type', '', {
        duration: 2000,
      })
      return;
    }

    if (this.selectedCoverType == '') {
      this.snackBar.open('Please choose your cover type', '', {
        duration: 2000,
      })
      return;
    }

    if (this.selectedPaperFrontBackType == '') {
      this.snackBar.open('Please choose your to print Front only ot Front & Back type', '', {
        duration: 2000,
      })
      return;
    }

    if (this.selectedFile == null) {
      this,this.snackBar.open('Please input any file before upload', '',{
        duration: 2000,
      })
      return;
    }

    const createUploadFilesRecordObj = Object.assign({});
    createUploadFilesRecordObj.userId = this.accountService.currentUser.id;
    createUploadFilesRecordObj.paperType = this.selectedPaperType;
    createUploadFilesRecordObj.colored = this.inkTypesInteger;
    createUploadFilesRecordObj.binding = this.bindingTypesInteger;
    createUploadFilesRecordObj.cover = this.coverTypesInteger;
    createUploadFilesRecordObj.frontBack = this.paperFrontBackTypesInteger;
    createUploadFilesRecordObj.message = this.message;
    createUploadFilesRecordObj.fileName = this.selectedFile.name;
  
    this.uploadFilesService.createUploadFileRecord(createUploadFilesRecordObj).then(
      (res) => {
        console.log(res);
        console.log(res, length);
        if (res.length > 0) {

          if (this.selectedFile != null) {

            const userFile = Object.assign({});
            userFile.userId = this.accountService.currentUser.id;
            userFile.uploadId = res[0].unixTime;
            userFile.selectedFile = this.selectedFile;  

            this.uploadFilesService.httpUploadFileV2(userFile).then(
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
  
      }, rej => {
        this.snackBar.open(rej.error, '', {
          duration: 2000
        });
      }
    )


  
  }
  onSelectPaperType(event: any) {
    this.selectedPaperType = event.value;
  }

  onSelectInkType(event: any) {
    this.selectedInkType = event.value;

    if (event.value == 'Color') {
      this.inkTypesInteger = 1;
    } else {
        this.inkTypesInteger = 0;
    }
  }

  onSelectBindingType(event: any) {
    this.selectedBindingType = event.value;

    if (event.value == 'Black Tape Binding') {
      this.bindingTypesInteger = 1;

    } else if (event.value == 'Comb Binding') {
      this.bindingTypesInteger = 2;
    }

     else {
        this.bindingTypesInteger = 0;
    }
  }

  onSelectCoverType(event: any) {
    this.selectedCoverType = event.value;

    if (event.value == 'Transparent Hard Plastic Cover') {
      this.coverTypesInteger = 1;

    } else if (event.value == 'Hard Cover') {
      this.coverTypesInteger = 2;

    }else {
        this.coverTypesInteger = 0;
    }
  }

  onSelectFrontBack(event: any) {
    this.selectedPaperFrontBackType = event.value;

    if (event.value == 'Front & Back') {
      this.paperFrontBackTypesInteger = 1;

    } else {
        this.coverTypesInteger = 0;
    }
  }
}
