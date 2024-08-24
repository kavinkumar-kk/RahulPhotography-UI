import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { style } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MatSidenavModule, MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit{
  mode = "over" ;
  slideIndex = 1;
  slides: any;
  @ViewChild('mySlides') el:ElementRef;
  constructor(private router: Router) {
    
   }

   ngOnInit(){
    //this.showSlides(this.slideIndex);
   }

   ngAfterViewInit() {
    this.slides = document.querySelectorAll(".mySlides");
    console.log(this.slides, '::::::::::slides in ngafterviewinit')
    //console.log(slide, '::::::::::slide')
    this.showSlides(this.slideIndex);
   }

  callAboutus(){
    this.router.navigate(['./aboutus']);
  }
  callMembership(){
    this.router.navigate(['./membership']);
  }
  callService(){
    this.router.navigate(['./serviceoffered']);
  }
  callContactus(){
    this.router.navigate(['./contactus']);
  }
  
  // Next/previous controls
   plusSlides(n: any) {
    this.showSlides(this.slideIndex += n);
  }
  
  // Thumbnail image controls
   currentSlide(n:any) {
    this.showSlides(this.slideIndex = n);
  }
  
  showSlides(n:any) {
    let i;
    console.log(this.slides, 'slides in showslides')
    if (n > this.slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = this.slides.length}
    for (i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = "none";
      //(this.slides[i] as HTMLElement).style.display = "block";
    }
    // for (i = 0; i < dots.length; i++) {
    //   dots[i].className = dots[i].className.replace(" active", "");
    // }
    this.slides[this.slideIndex-1].style.display = "block";
    //slides[i].setAttribute('display','block');
    // dots[this.slideIndex-1].className += " active";
  }
}
