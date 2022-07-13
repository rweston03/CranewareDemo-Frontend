import { Component, OnInit } from '@angular/core';
import { IBook } from './book';
import { BookService } from './book.service';

@Component({
    selector: 'book-list',
    templateUrl: './book-list.component.html',
    styleUrls:[ '../app.component.css']
})
export class BookListComponent implements OnInit{
    title = 'Book List';  
    books: IBook[] = [];
    filteredBooks: IBook[] = [];
    errorMessage = '';

    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredBooks = this.performFilter(value);
    }

    constructor (private bookService: BookService) {}

    performFilter(filterBy: string): IBook[] {
        filterBy = filterBy.toLocaleLowerCase();
        if(filterBy != "")
        {
            return this.books.filter((book: IBook) =>
            book.title.toLocaleLowerCase().includes(filterBy) ||
            book.author.toLocaleLowerCase().includes(filterBy)
        )
        }
        else {
            return this.books;
        }
    }

    ngOnInit(): void {
        this.books = this.bookService.getBooks();
        this.filteredBooks = this.books;

        /******************************************************* 
         * 
         * See note in book.service.cs explaining situation with 
         * CORS.
         * 
         * *****************************************************         
        this.bookService.getBooks().subscribe({
            next: books => {
                this.books = books;
                this.filteredBooks = this.books;
            },
            error: err => this.errorMessage = err
        }) */
    }
}