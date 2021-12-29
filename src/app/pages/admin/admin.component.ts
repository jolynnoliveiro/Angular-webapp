import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public onOff = false;

  uploadRecords = [];
  uploadRecordsColumns = ['id', 'paper_type', 'colored', 'binding', 'username', 'contact_number', 'file_path', 'create_order'];

  bookedOrders = [];
  bookedOrdersColumns = ['booking_id', 'username', 'contact_number', 'start_time', 'end_time', 'booking_date'];

  constructor(public adminService: AdminService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getBusinessHourOnOff();

    this.getUploadRecords();

    this.getBookedOrders();
  }

  getBusinessHourOnOff() {
    this.adminService.getBusinessHourOnOff({}).then (
      (res) => {
        this.onOff = res[0].is_open;

      }, rej => {
        this.snackBar.open(rej.error, '', {
          duration: 2000,
        })
      }
    )
  }

  onChange(onOff: any){
    //console.log(onOff);
    this.adminService.updateBusinessHourOnOff({ onOff: onOff}).then (
      (res) => {
        this.onOff = res[0].is_open;

      }, rej => {
        this.snackBar.open(rej.error, '', {
          duration: 2000,
        })
      }
    )

  }

  getUploadRecords() {
    this.adminService.getUploadRecords({}).then(
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

  getBookedOrders() {
    this.adminService.getBookedOrders({}).then(
      (res) => {
        this.bookedOrders = res;

      }, rej => {
        this.snackBar.open(rej.error, '', {
          duration: 2000, //2000 ms = 2 seconds
        })
      }
    )
  }

onCreateOrderClick(upload_order_id: number, paper_type :string, colored: number, binding: number) {
  console.log(upload_order_id);

  const obj = Object.assign({});
    obj.upload_files_id = upload_order_id;
    obj.paperType = paper_type;
    obj.colored = colored;
    obj.binding = binding;
  
    this.adminService.createOrder(obj).then(
      (res) => {

        this.snackBar.open('Success', '', {
          duration: 2000,
        })

      }, rej => {
        this.snackBar.open(rej.error, '', {
          duration: 2000, //2000 ms = 2 seconds
        })
      }
    )
  
}

}
