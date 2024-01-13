import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { RecentfilesComponent } from './recentfiles/recentfiles.component';
import { RegisterComponent } from './register/register.component';
import { SharedAccessComponent } from './shared-access/shared-access.component';
import { SharedWithMeFileComponent } from './shared-with-me-file/shared-with-me-file.component';
import { ShowallfilesComponent } from './showallfiles/showallfiles.component';


const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'navigation',
    component:NavigationComponent
  }
  ,
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'otpverify',
    component:OtpverificationComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
  },
  {
    
    path:'forgotpassword',
    component:ForgotpasswordComponent
  },
  {
    path:'allfiles',
    component:ShowallfilesComponent
  },
  {
    
    path:'fileupload',
    component:FileuploadComponent
  },
  { 
    path:'sharewithme',
    component:SharedWithMeFileComponent
  },
  {
    path:'allfiles',
    component:ShowallfilesComponent
  },
  {
    path:'uploadedfiles',
    component:SharedAccessComponent
  },
  {
    path:'recentFiles',
    component:RecentfilesComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
