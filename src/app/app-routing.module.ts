import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChannelListComponent } from "./channels/channel-list/channel-list.component";
import { ChannelDetailsComponent } from "./channels/channel-details/channel-details.component";

const routes: Routes = [{ path: ":id", component: ChannelDetailsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
