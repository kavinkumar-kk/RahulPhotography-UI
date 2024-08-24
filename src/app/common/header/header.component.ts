import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderComponent, MatSidenavModule, MatIconModule, MatMenuModule, MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }

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
}
