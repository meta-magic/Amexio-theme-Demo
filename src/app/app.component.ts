import {Component, ViewChild, Inject, PlatformRef} from '@angular/core';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';
import { HTTPService } from './service/http.service';
import {AmexioNavBarComponent} from "amexio-ng-extensions";
import {HttpClient} from "@angular/common/http";
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data: any = [];
  httpResponse: any;
  menuData: any[] = [];
  topMenuData : any[];
  flag: boolean;
  newThemePath: string;
  msgList: any = [];
  amexioThemeArray: any;
  materialThemeArray: any;
  hasThemeInit : boolean;
  isRouteLoading : boolean = false;

  @ViewChild(AmexioNavBarComponent) amexioNav;

  routeToLink(data: any) {
    if (!data.hasOwnProperty('children') && data.link) this._router.navigate([data.link]);
  }

  constructor(@Inject(DOCUMENT) public document: any, private httpService: HTTPService, private platform:PlatformRef, public _http: HttpClient, private _router: Router, private cookieService: CookieService) {
    this.flag = false;
    this.topMenuData = JSON.parse(`[
      {
        "text": "Products",
        "icon": "fa fa-snowflake-o fa-fw",
        "submenus": [{
          "text": "Amexio API",
          "link": "https://amexio.tech/amexio-api"
        }, 
        {
          "text": "Amexio API Docs",
          "link": "http://api.amexio.tech/"
        },
        {
          "text": "Amexio Canvas",
          "link": "https://amexio.tech/amexio-canvas"
        },
        {
          "text": "Amexio Colors",
          "link": "https://amexio.tech/amexio-colors"
        }]
      },
      {
      "text": "Case Studies",
      "icon": "fa fa-clone fa-fw",
      "submenus": [
        {"text":"Shopping Portal","link":"https://sedemo.amexio.org/se/shoppingportal/#/home"},
        {"text":"US Election Results","link":"https://sedemo.amexio.org/se/us-election/"},
        {"text":"Insurance Portal","link":"https://sedemo.amexio.org/se/insuranceportal/"},
        {"text":"Movie Portal","link":"https://cedemo.amexio.org/tecmflix/"},
        { "text": "NpmStats", "link": "https://www.npmstats.com/" },
        {"text":"Creative Demo","link":"https://eedemo.amexio.org/#/login"}

      ]
    }, {
      "text": "About Us",
      "icon": "fa fa-address-book-o fa-fw",
      "submenus": [{
        "text": "Contact",
        "link": "https://metamagicglobal.com/contact"
      }, {
        "text": "Company",
        "link": "http://www.metamagicglobal.com/company"
      }, {
        "text": "MetaMagic",
        "link": "https://www.metamagicglobal.com/"
      }]
    }
  ]
  `);

    this._http.get('assets/data/menus/topmenu.json').subscribe(response => {
      this.httpResponse = response;
    }, error => {
      //prompt on error
    }, () => {
      this.menuData = this.httpResponse.menus;
    });

    if (this.cookieService.get('theme_name_v4')) {
      let currentTheme = document.head.querySelectorAll(`link[rel="stylesheet"]`);
      this.removeExistingTheme(currentTheme);
      let linkEl = document.createElement('link');
      linkEl.onload = ()=> {
        this.hasThemeInit = true;
      };
      linkEl.setAttribute('rel', 'stylesheet');
      linkEl.id = 'themeid';
      linkEl.href = 'assets/themes/at-md-black.css';
      document.head.appendChild(linkEl);
    } else {
      let linkEl = document.createElement('link');
      linkEl.onload = ()=> {
        this.hasThemeInit = true;
      };
      linkEl.setAttribute('rel', 'stylesheet');
      linkEl.id = 'themeid';
      linkEl.href = 'assets/themes/at-md-rasberry-sangria.css';
      document.head.appendChild(linkEl);
    }
    //Get Data of Themes
    this.getTheThemesData();
  }

  externalLink(event:any){
    if(event.data.node.link)
      //this.document.location.href=event.data.node.link;
      window.open(event.data.node.link,'_blank');
  }

  ngOnInit(){
    this._router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.isRouteLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isRouteLoading = false;
      }
    });
  }

  onNodeClick(node : any){
    if(node.hasOwnProperty('link'))
      this._router.navigate([node.link])
  }

  getTheThemesData() {
    let amexioThemeRepsonse: any;
    let materialThemeResponse: any;
    //HTML FILE
    this._http.get('assets/material.json').subscribe(data => {
      materialThemeResponse = data;
    }, error => {
    }, () => {
      this.materialThemeArray = materialThemeResponse;
    });
  }

  onClick(link:any){
   // this.document.location.href=link;
   window.open(link,'_blank');
  }

  onUserClick(){
    this.amexioNav.close();
  }
  onHomeClick(){
    this._router.navigate(['home']);
    this.amexioNav.close();
  }
  //Window Open
  toggle() {
    this.flag = !this.flag;
  }

  themeChange(theme: any) {
    let response:any;
    debugger;
    this.httpService.fetch('https://api.amexio.org/api/mda/'+theme.themeJSONFile).subscribe(data => {
      response = data;
    }, error => {
    }, () => {
      let themeColor = response.themeColor;
      let appColor = response.appColor;
      let compColor = response.compColor;
     themeColor.forEach((style:any) => {
       let value=style.value.replace(';','');
      document.documentElement.style.setProperty(style.key,value);
      
      });
  
      appColor.forEach((style:any) => {
        let value=style.value.replace(';','');
       document.documentElement.style.setProperty(style.key,value);
         
       });
  
       compColor.forEach((style:any) => {
       document.documentElement.style.setProperty(style.key,style.value);
         
       });
  
  
    });
    }

  addNewTheme(newTheme: any,existingTheme : any) {
    let linkEl = document.createElement('link');
    linkEl.onload = ()=>{
      this.removeExistingTheme(existingTheme);
      this.isRouteLoading = false;
    };
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.id = 'themeid';
    linkEl.href = newTheme;
    document.head.appendChild(linkEl);
  }

  //removed old theme css
  removeExistingTheme(keyList: any) {
    if (keyList != null && keyList && keyList.length != 0) {
      for (let i=0; i<keyList.length; i++) {
        let key = keyList[i];
        if (key.id == 'themeid') {
          document.head.removeChild(key);
        }
      }     
    }
  }

  event : any;

  showfloatplanel: boolean = false;
  onFloatingClick(eventobject : any){
    this.showfloatplanel=!this.showfloatplanel;
    this.event = eventobject.event;
  }
}
