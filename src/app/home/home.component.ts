import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isMuted = true;

  constructor() { }

  ngOnInit(): void {
  }

  // Método para mutear el vídeo
  toggleMute() {
    const video: HTMLVideoElement | null = document.querySelector('.background-video');
    if (video) {
      this.isMuted = !this.isMuted;
      video.muted = this.isMuted;
    }
  }
}
