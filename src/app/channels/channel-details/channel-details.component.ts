import { Component, OnInit } from '@angular/core';
import { Channel } from '../channel.model';
import { ChannelService } from '../channel.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.component.html',
  styleUrls: ['./channel-details.component.css']
})
export class ChannelDetailsComponent implements OnInit {

  channel: Channel;
  id: number;

  constructor(
    private channelService: ChannelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.channelService.getChannel().subscribe(channelData => {
        this.channel = channelData.channels[this.id];
      })
    });
  }
}
