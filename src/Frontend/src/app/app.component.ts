import { Component } from '@angular/core';
import { Auth } from './Services/auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Auth]
})
export class AppComponent {
  constructor(private auth: Auth){}
  title = 'Todo!';
}
