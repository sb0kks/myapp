import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `<div class="hello">ciao a tutti</div>
    <h1>{{gender == 'M' ? 'Uomo' : 'Donna'}}</h1>
    <button (click)="clickHandler($event)">Click me</button>
    <hr>
    <input type="text" (keydown)="inputHandler($event)">
    <hr>
    <input type="text" (keydown.enter)="inputHandler($event)">

    <hr>
    <button (click)="visible = !visible">toggle</button>
    <hr>
    <img *ngIf="visible" src="https://angular.io/assets/images/logos/angular/angular.png">


    <div>
      <button [disabled]="image" (click)="load()">load</button>
      <button [disabled]="!image" (click)="unload()">unload</button>
    </div>
    <img  *ngIf="image" [src]="image">

    <app-hello></app-hello>

    <h1>{{today}}</h1>
    <h1>{{today | date: 'dd MMMM YYYY'}}</h1>
    <h1>{{yourmoney | currency}}</h1>
    <h1>{{yourbitcoins | number: '2.2-4'}}</h1>
    <pre>{{yourJSON | json}}</pre>

    <div *ngIf="!users; else success">Loading...</div>

    <ng-template #success>
      <li *ngFor="let user of users; let i = index; let odd = odd; let last = last">
        {{i+1}}) {{user.name}}
        <button (click)="delete(user)">delete</button>
        <hr *ngIf="odd">

        <div *ngIf="last">END OF LIST</div>
    </ng-template>

    `,

  // inline
  styles: [`
    .hello { background-color: red}
  `]
  // styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{

  title = 'myapp';
  gender = 'M';

  visible = true;
  //users = ['Fabio', 'Simone', 'Lorenzo'];

  image: string;

  load() {
      this.image = 'https://angular.io/assets/images/logos/angular/angular.png';
  }

  unload() {
    this.image = null;
  }

  clickHandler(event: MouseEvent) {
    console.log('click');
    console.log(event);
  }

  inputHandler(event: KeyboardEvent) {
    console.log('press', event);
  }

  today = Date.now();
  yourmoney = 1200;
  yourbitcoins = 0.12343242;
  yourJSON = { id: 1, name: 'Fabio' };


  users: User[]; // tipizzo users come un array di utenti

  constructor(private http: HttpClient) { }
  ngOnInit() {
    setTimeout(() => {
      this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
        .subscribe((res: User[]) => this.users = res);
    }, 2000);
    // senza <User[]>(per specificare che il risultato di ritorno è un array di User) mi tornerebbe un oggetto generico da assegnare ad users che è un array di User(eccezione)
  }

  delete(user: User) {
    const index = this.users.indexOf(user);
    this.users.splice(index, 1); // start da quale elemento voglio rimuovere - quanti elementi voglio rimuovere
    // approccio immutabile
    //this.users.filter(item => item.id !== user.id);
  }
}
