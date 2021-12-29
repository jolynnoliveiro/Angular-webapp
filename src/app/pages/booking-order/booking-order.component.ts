import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { TestService} from 'src/app/services/test.service';

declare let $: any;
declare let M: any;

@Component({
  selector: 'app-booking-order',
  templateUrl: './booking-order.component.html',
  styleUrls: ['./booking-order.component.scss']
})
export class BookingOrderComponent implements OnInit {

  bookingDate: any[] = [];
  contentDate: string = '';
  contentStartTime: string = '';
  contentEndTime: string = '';
  dateSelection: any = [];
  timeSelection: any = [];
  selected_time: string = "";

  isTodayDate: boolean = false;

  selectedTimeArray: number = 0;
  endTimeArray: any = [];

  selectedFile: any;

  constructor(public bookingService: BookingService, 
              public snackBar: MatSnackBar, 
              public router: Router,
              public accountService: AccountService,
              public testService: TestService) { }

  ngOnInit(): void {
    //this.getBookingDateTime(); 
    $('.modal').modal({ preventScrolling: false});

    this.initDatePicker();
    this.initTimePicker();
  }

getBookingDateTime() {
  var currentDate = new Date();
  var currentDateTime = currentDate.toISOString();

  var nextDay = new Date();
  nextDay.setDate(currentDate.getDate() + 1);
  var nextDayDateTime = nextDay.toISOString();

  var next7Day = new Date();
  next7Day.setDate(currentDate.getDate() + 7);
  var next7DayDateTime = next7Day.toISOString();

  console.log(next7DayDateTime.substring(0, 10))

    const dateObj = Object.assign({});
    dateObj.startDate = nextDayDateTime.substring(0, 10);
    dateObj.endDate = next7DayDateTime.substring(0, 10);
    this.bookingService.getBookingDateTime(dateObj).then(
      (res) => {
        console.log(res);
        console.log(res, length);
        if (res.length > 0) {
        this.bookingDate = res;
        }

      }, rej => {
        this.snackBar.open(rej.error, '', {
          duration: 2000
        });
      }
    )
  }

onConfirm() {
  if (this.contentStartTime == '') {
    this.snackBar.open('Please choose your booking time', '', {
      duration: 2000
    });
    return;
  }


  const createBookingObj = Object.assign({});
  createBookingObj.userId = this.accountService.currentUser.id;
  createBookingObj.bookingDate = this.contentDate;
  createBookingObj.startTime = this.contentStartTime;
  createBookingObj.endTime = this.contentEndTime;
  this.bookingService.createBookingOrder(createBookingObj).then(
    (res) => {
      console.log(res);
      console.log(res, length);
      if (res.length > 0) {
        this.snackBar.open('Your booking is successfully created', '', {
          duration: 2000
        });
      }

    }, rej => {
      this.snackBar.open(rej.error, '', {
        duration: 2000
      });
    }
  )
}
onClose() {

  }
  
  onDateClickV2(x: any){
    console.log(x);

    this.contentStartTime = '';

    var myDate = new Date(x);

    this.isTodayDate = this.isToday(myDate);
    console.log(this.isTodayDate);

    this.contentDate = x;
    M.Modal.getInstance($('#modal1')).open();

    this.initTimePicker();
  }

  initDatePicker() {
    let d = new Date ();
    this.dateSelection = [];

    for (let i = 0; i < 7; i++) {
      const ymd = this.getYMD(d);

      const blockedDate = ['2021-08-16', '2021-08-20'];

      if (!blockedDate.includes(ymd)) {
        this.dateSelection.push(ymd); //['2021-08-15', '2021-07-17', '2021-08-18];
      }
      d.setTime(d.getTime() + 86400000);
    }
  }

  getYMD(date: Date): string {
    const dt = date || new Date();
    return dt.getFullYear() + '-' + ('00' + (dt.getMonth() + 1)).substr(-2) + '-' + ('00' + dt.getDate()).substr(-2);
  }

  initTimePicker() {
    var x = 15; // minutes interval
    var times = []; // time array
    var start_time = 540; // start time
    var end_time = 1380; // end time

    var currentTimeHours = 0;
    var currentTimeMinutes = 0;

    var addedMinutes = 30; //booking time duration in minutes

    var d = new Date();
    if (this.isTodayDate) {
      currentTimeHours = d.getHours();
      currentTimeMinutes = d.getMinutes();
      start_time = ((d.getHours()) * 60);

      // if current time = 9:13
      // 9:00 + 45 = 9:45

      // if current time = 9:24
      // 9:00 +60 = 10:00

      // if current time = 9:43
      // 9:00 + 75 = 10:15

      if (currentTimeMinutes < 15) {
        start_time =  start_time + 45;

      } else {
        if (currentTimeMinutes < 30) {
          start_time = start_time + 60;

        } else {
          if (currentTimeMinutes < 45) {
            start_time = start_time + 75;

          } else {
            start_time = start_time + 90;
          }
        }
      }
    }

    //loop to increment the time and push results in array
    for (var i = 0; start_time <= end_time; i++) {
      var hh =  Math.floor(start_time / 60);  // getting hours of day in 0-24 format
      var mm = (start_time % 60);  // geting minutes 0-55 format

      var newHH = Math.floor((start_time + addedMinutes) / 60);
      var newMM = ((start_time + addedMinutes) % 60);

      times[i] = ("0" + (hh)).slice(-2) + ":" + ("0" + mm).slice(-2);
      this.endTimeArray[i] = ("0" + (newHH)).slice(-2) + ':' + ("0" + newMM).slice(-2);

      start_time = start_time + x;
    }
    //console.log(times);
    this.timeSelection = times;
  }

  onTimeChange(event: any) {
    const value = event.target.value;
    this.selected_time = value;

    this.selectedTimeArray = event.currentTarget.options.selectedIndex;

    this.contentStartTime = this.selected_time;
    this.contentEndTime = this.endTimeArray[this.selectedTimeArray];

    console.log(this.selected_time);
  }
 
  isToday(someDate: any) {
    const today = new Date();
    return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  }
}
  


