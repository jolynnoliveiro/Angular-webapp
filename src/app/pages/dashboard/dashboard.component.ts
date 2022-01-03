import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  uploadRecords = [];
  uploadRecordsColumns = ['id', 'paper_type', 'colored', 'binding', 'file_path', 'status', 'price'];

  bookedOrders = [];
  bookedOrdersColumns = ['booking_id', 'start_time', 'end_time', 'booking_date'];

  constructor(public adminService: AdminService, public accountService: AccountService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUploadRecordsByUserId();

    this.getBookedOrdersByUserId();
  }

  getUploadRecordsByUserId() {
    const obj = Object.assign({});
    obj.userId = this.accountService.currentUser.id;

    this.adminService.getUploadRecordsByUserId(obj).then(
      (res) => {
        this.uploadRecords = res;

      }, rej => {
        this.snackBar.open(rej.error, '', {
          duration: 2000, //2000 ms = 2 seconds
        })
      }
    )
  }

  onDownloadClick(fileName: string) {
    const obj = Object.assign({});
    obj.fileNamePath = fileName;

    console.log(obj);

    this.adminService.postDownloadPDFFile(fileName).then(
      (res) => {
        var blob = new Blob([res], { type: 'application/pdf' });
        var url = window.URL.createObjectURL(blob);
        window.open(url);

      }, rej => {
        this.snackBar.open(rej.error, '', {
          duration: 2000, //2000 ms = 2 seconds
        })
      }
    )
  }

  getBookedOrdersByUserId() {
    const obj = Object.assign({});
    obj.userId = this.accountService.currentUser.id;

    this.adminService.getBookedOrdersByUserId(obj).then(
      (res) => {
        this.bookedOrders = res;

      }, rej => {
        this.snackBar.open(rej.error, '', {
          duration: 2000, //2000 ms = 2 seconds
        })
      }
    )
  }

}
