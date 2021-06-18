import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../features/user/models/user.model';
import {CurrentUserService} from '../../../../features/core/services/current-user.service';
import {UserService} from '../../../../features/user/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {UserFriendRequestService} from '../../../../features/user/services/user-friend-request.service';
import {Video} from '../../../../features/video/models/video.model';
import {UserVideoService} from '../../../../features/user/services/user-video.service';
import {Playlist} from '../../../../features/playlist/models/playlist.model';
import {UserPlaylistService} from '../../../../features/user/services/user-playlist.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {
  user$: Observable<User>;
  videos$: Observable<Video[]>;
  playlists$: Observable<Playlist[]>;
  userId: number;
  currentUserId: number;

  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly userService: UserService,
    private readonly friendRequestService: UserFriendRequestService,
    private readonly userVideoService: UserVideoService,
    private readonly userPlaylistService: UserPlaylistService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.currentUserId = this.currentUserService.userId;
    this.user$ = this.userService.getUser(this.userId);
    this.videos$ = this.userVideoService.getAllVideos(this.userId);
    this.playlists$ = this.userPlaylistService.getAllPlaylists(this.userId);
  }

  addToFriend(): void {
    this.friendRequestService.addFriendRequest(this.userId, this.currentUserId).subscribe();
  }
}
