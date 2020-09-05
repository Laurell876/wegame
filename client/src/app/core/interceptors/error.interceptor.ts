import { Router, NavigationExtras } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private snackBar: MatSnackBar) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error) {
                    // throw error back to component if its a validation error ie dont show a toast
                    if (error.status === 400) {
                        if (error.error.errors) { 
                            throw error.error;
                        } else {
                            this.snackBar.open(error.error.message, '', {
                                duration: 5000,
                            });
                        }
                    }

                    if (error.status === 401) {
                        this.snackBar.open(error.error.message, '', {
                            duration: 5000,
                        });
                    }

                    if (error.status === 404) {
                        this.router.navigateByUrl('/not-found');
                    }
                    if (error.status === 500) {
                        const navigationExtras: NavigationExtras = { state: { error: error.error } };
                        this.router.navigateByUrl('/server-error', navigationExtras);
                    }
                }
                return throwError(error);
            })
        );
    }
}
