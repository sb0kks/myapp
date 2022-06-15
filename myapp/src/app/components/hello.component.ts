// hello.component.ts
import { Component } from '@angular/core';

// decoro la classe con component
@Component({
  selector: 'app-hello', // come vogliamo invocare questo componente dal nostro template html
  template: ` <h1>Hello</h1>

  `
})
export class HelloComponent { }
