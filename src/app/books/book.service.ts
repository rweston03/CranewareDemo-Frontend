import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IBook } from "./book";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookService {
    /* getBooks(): IBook[] {
        return [
            {
                "id": 1,
                "title": "The Handmaid's Tale",
                "author": "Magaret Atwood"
            },
            {
                "id": 2,
                "title": "Good Omens",
                "author": "Neil Gaiman"
            },
            {
                "id": 3,
                "title": "1984",
                "author": "George Orwell"
            },
            {
                "id": 4,
                "title": "Frankenstein",
                "author": "Mary Shelley"
            },
            {
                "id": 5,
                "title": "The Gunslinger",
                "author": "Stephen King"
            },
            {
                "id": 6,
                "title": "The Martian Chronicles",
                "author": "Ray Bradbury"
            }
        ]
    } */



    private bookUrl = 'https://cranewaredemo20220712135732.azurewebsites.net/api/book';

    constructor(private http: HttpClient) {}

    getBooks(): Observable<IBook[]> {
        return this.http.get<IBook[]>(this.bookUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(()=>errorMessage);
    } 
}