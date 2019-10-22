import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../providers/youtube.service';
declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  videos: any[] = [];
  videoSel: any;
  constructor(public youtubeService: YoutubeService) {
    this.youtubeService.getVideos().subscribe((videos) => {
      this.videos = videos;
      console.log(videos);
    });
  }
  verVideo(video: any) {
    this.videoSel = video;
    $('#modelId').modal();
  }

  cerrrarModal(video: any) {
    this.videoSel = null;
    $('#modelId').modal('hide');
  }
  cargarMas() {
    this.youtubeService.getVideos().subscribe((videos) => {
      this.videos.push.apply(this.videos, videos);
      // console.log(videos);
    });
  }
  ngOnInit() {}
}
