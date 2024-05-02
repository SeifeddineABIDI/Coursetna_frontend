import { Component, OnInit } from '@angular/core';
declare var $: any;



@Component({
  selector: 'app-form-apply',
  templateUrl: './form-apply.component.html',
  styleUrls: ['./form-apply.component.scss']
})
export class FormApplyComponent implements OnInit{



  constructor() { }

  ngOnInit(): void {
  }

  open(): void {
    $('#myModal').modal('show'); // Show the modal using jQuery
  }
  close(): void {
    $('#myModal').modal('hide'); // Hide the modal using jQuery
  }

  submit(): void {
    // Implement form submission logic here (e.g., data validation, HTTP request)
    console.log('Form submitted');
    // Close the modal after form submission
    this.close();
  }






}
