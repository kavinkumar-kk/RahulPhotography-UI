import { Component } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [HeaderComponent, HomeComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {

}
