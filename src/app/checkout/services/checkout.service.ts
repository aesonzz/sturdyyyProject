import { Injectable, inject } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/products/product';
import { map } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  // inyectamos las dependencias

  private readonly _http = inject(HttpClient);
  private readonly _url = environment.serverURL;

  // Método para el pago

  onProceedToPay(products: Product[]): any {
    return this._http

    // Petición POST para el chenckout con los productos
      .post(`${this._url}/checkout`, { items: products })
      .pipe(
        map(async (res: any) => {
          // Caraga la librería y hace una llamada para el incio de sesión en strip
          const stripe = await loadStripe(environment.stripeAPIKey);
          stripe?.redirectToCheckout({ sessionId: res.id });
        })
      ).subscribe({
        // maneja el error de la suscripción
        error: (err) => console.error('Error', err),
      });
  }
}
