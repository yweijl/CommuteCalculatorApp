import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root', })
export class JwtInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      var token = localStorage.getItem('token');

      if (!token) 
      {
          return next.handle(req);
      }
      
      const authReq = req.clone({
        headers: req.headers.set('Authorization', token)
      });

      return next.handle(authReq).pipe(tap({
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              localStorage.removeItem('token');
              this.router.navigate(['/auth']);
            } else {
              console.log(err);
            }
          }
        }
      }));
  }
}