/**
 * Created by sagar on 2/8/17.
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'email',
  templateUrl: 'email.html'
})

export class EmailComponent implements OnInit {
  isComposeOpen : boolean;
  bindData : any;
  data:any;
  isVisible:boolean;
  constructor() {
    this.isComposeOpen=false;
    this.bindData ={
      "response": {
        "success": true,
        "message": "Fetching  Data  Request Succeeded: Profile",
        "data": [
          {
            "name": "Ketan Gote",
            "name_official": "Ketan Gote",
            "profile": "ketan.jpg"
          },
          {
            "name": "vrushabh kokil",
            "name_official": "vrushabh kokil",
            "profile": "vrushabh.jpg"
          },
          {
            "name": "Dattaram Gawas",
            "name_official": "Dattaram Gawas",
            "profile": "dats.jpg"
          },
          {
            "name": "Sagar Jadhav",
            "name_official": "Sagar Jadhav",
            "profile": "sagar.jpg"
          },
          {
            "name": "sandip mohite",
            "name_official": "sandip mohite",
            "profile": "sandip.jpg"
          },
          {
            "name": "vrushabh Jadhav",
            "name_official": "vrushabh Jadhav",
            "profile": "ahutosh.jpg"
          }
        ]
      }
    };
    this.isVisible=false;
  }
  onRowSelect(event:any){
    if(event.length>0){
      this.isVisible=true;
    }else{
      this.isVisible=false;
    }

  }
  onRowClick(event:any){

  }
  toggle(){
    this.isComposeOpen = !this.isComposeOpen;
  }
  ngOnInit() {

      this.data=[
        {
          "text": "Inbox",
          "expanded":false,
          "checked": false,
          "selected":true,
          "icon": "fa fa-inbox"
        },{
          "text": "Sent",
          "expanded": false,
          "checked": false,
          "icon": "fa fa-envelope-o"
        },{
          "text": "Trash",
          "expanded": false,
          "checked": false,
          "icon": "fa fa-trash-o"
        },
        {
          "text": "Labels",
          "expanded": false,
          "checked": false,
          "icon": "fa fa-tag",
          "children": [
            {
              "text": "High",
              "expanded": false,
              "checked": false,
              "icon": "fa fa-tag fa-lg"
            },{
              "text": "Medium",
              "expanded": false,
              "checked": false,
              "icon": "fa fa-tag fa-md"
            },{
              "text": "Low",
              "expanded": false,
              "checked": false,
              "icon": "fa fa-tag "
            }
          ]
        }
      ]

   }
}
