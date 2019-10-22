import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeURL = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'TU-API-KEY';
  private playlist = 'TU-PLAYLIST';
  private nextPage = '';

  constructor(private http: HttpClient) {}

  getVideos() {
    const url = `${this.youtubeURL}/playlistItems`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playlist)
      .set('key', this.apiKey);
    if (this.nextPage) {
      params.set('pageToken', this.nextPage);
    }

    console.log('parametros=>', params);

    return this.http.get(url, { params }).pipe(
      map((data: any) => {
        console.log(data);
        this.nextPage = data.nextPageToken;
        const snip: string[] = [];
        data.items.forEach((res) => {
          snip.push(res.snippet);
          // console.log(snip);
        });
        return snip;
      })
    );
  }
}
