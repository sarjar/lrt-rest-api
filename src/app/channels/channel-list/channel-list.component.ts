import { Component, OnInit } from '@angular/core';
import { Channel } from '../channel.model';
import { Subscription } from 'rxjs';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {

  channels: Channel[];
  private channelsSub: Subscription;

  constructor(private channelService: ChannelService) {}

  ngOnInit() {
    this.channelService.getChannels();
    this.channelsSub = this.channelService
      .getChannelUpdateListener()
      .subscribe((channels: Channel[]) => {
        this.channels = channels;
      });
  }

  ngOnDestroy() {
    this.channelsSub.unsubscribe();
  }
}
