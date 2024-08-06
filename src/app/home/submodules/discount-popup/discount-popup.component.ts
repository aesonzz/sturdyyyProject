import { Component } from '@angular/core';
import { EmailService } from './email.service';

@Component({
  selector: 'app-discount-popup',
  templateUrl: './discount-popup.component.html',
  styleUrls: ['./discount-popup.component.scss']
})
export class DiscountPopupComponent {
  showPopup = true;
  showModal = false;
  email = '';

  constructor(private emailService: EmailService) { }

  // Métodos para enseñar y cerrar el pop-up

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  closePopup() {
    this.showPopup = false;
  }


  // Métodos para enseñar y cerrar el modal del pop up
  openModal() {
    this.showPopup = false;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // Método para ejecutar el servicio del envío del mail y el manejo de la respuesta en caso de error o éxito

  unlockCode() {
    this.emailService.sendEmail(this.email).subscribe({
      next: (response) => {
        alert(response.message);
        this.closeModal();
      },
      error: (err) => {
        console.error('Error:', err);
        alert('There was an error sending the email');
      }
    });
  }
}
