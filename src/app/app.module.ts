import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/Material/materia.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { SharedWithMeFileComponent } from './shared-with-me-file/shared-with-me-file.component';
import { RecentfilesComponent } from './recentfiles/recentfiles.component';
import { ShowallfilesComponent } from './showallfiles/showallfiles.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SharedialogComponent } from './sharedialog/sharedialog.component';
import { SharedAccessComponent } from './shared-access/shared-access.component';
import { InfodialogeComponent } from './infodialoge/infodialoge.component';

@NgModule({
  declarations: [
AppComponent,
NavigationComponent,
LoginComponent,
RegisterComponent,
OtpverificationComponent,
DashboardComponent,
ForgotpasswordComponent,
FileuploadComponent,
SharedWithMeFileComponent,
RecentfilesComponent,
ShowallfilesComponent,
SharedialogComponent,
SharedAccessComponent,
InfodialogeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    NgOtpInputModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot() ,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
