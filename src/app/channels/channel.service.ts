import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Channel } from "./channel.model";
import { Subject } from "rxjs";
import { Observable, of as observableOf } from "rxjs";
import { identifierModuleUrl } from "@angular/compiler";

@Injectable({ providedIn: "root" })
export class ChannelService {
  private channels: Channel[] = [];
  private channelSelected = new Subject<Channel[]>();

  constructor(private http: HttpClient) {}

  getChannels() {
    this.http
      .get<{ message: string; channels: Channel[] }>(
        "http://localhost:3000/api/channels"
      )
      .subscribe(channelData => {
        this.channels = channelData.channels;
        this.channelSelected.next([...this.channels]);
      });
  }

  getChannel() {
    return this.http.get<{ message: string; channels: Channel[] }>(
      "http://localhost:3000/api/channels"
    );
  }

  getChannelUpdateListener() {
    return this.channelSelected.asObservable();
  }
}
