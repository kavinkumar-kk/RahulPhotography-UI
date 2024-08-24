import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ServiceofferedComponent } from './serviceoffered/serviceoffered.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MembershipComponent } from './membership/membership.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'membership', component: MembershipComponent },
    { path: 'serviceoffered', component: ServiceofferedComponent },
    { path: 'contactus', component: ContactusComponent },
];
