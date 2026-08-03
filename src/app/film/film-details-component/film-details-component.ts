import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FilmDetailsService } from '../../core/services/film-details-service';
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-film-details-component',
  imports: [MatInputModule, MatCardModule],
  templateUrl: './film-details-component.html',
  styleUrl: './film-details-component.scss',
})
export class FilmDetailsComponent {

  private readonly _filmDetailsService = inject(FilmDetailsService);
  protected filmDetails: string[] = [];
  protected detailsVisible = false;
  private readonly _cdr = inject(ChangeDetectorRef);

  onSearch(title: string, apiKey: string): void {
    if (!title.trim() || !apiKey.trim()) {
      return;
    }

    console.log("Searching for film : ", title);
    this._filmDetailsService.getData(title, apiKey).subscribe({
      next: (response) => {
        console.log('API response : ', response);
        this.detailsVisible = true;
        this.filmDetails = [response.Title, 
          response.Poster,
          response.Year, 
          response.Ratings?.[1]?.Value ?? 'N/A',
          response.Released, 
          response.Runtime, 
          response.Genre, 
          response.Director, 
          response.Writer, 
          response.Actors, 
          response.Plot];
        console.log('Film details set : ', this.filmDetails);
        this._cdr.detectChanges();
      },
      error: (error) => console.error('API error : ', error),
      complete: () => console.log('API call completed')
    });
  }

}
