import { Component, inject, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { Auth } from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Projet 3 - Formation Angular');
  protected readonly modif = signal('Modification des utilisateurs désactivée');
  private readonly _auth = inject(Auth);

  toggleUsers(checked: boolean): void {
    console.log('Autorisation de modification : ', checked);
    if (checked) {
      this.modif.set('Modification des utilisateurs activée');
      this._auth.setEditionAuthorization(true);
    } else {
      this.modif.set('Modification des utilisateurs désactivée');
      this._auth.setEditionAuthorization(false);
    }
  }
}
