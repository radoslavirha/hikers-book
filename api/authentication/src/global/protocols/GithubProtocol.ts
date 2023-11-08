import { Req } from '@tsed/common';
import { Inject } from '@tsed/di';
import { Args, BeforeInstall, OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { Profile, Strategy, StrategyOptions } from 'passport-github2';
import { ConfigService } from '../services/ConfigService';
import { ProtocolAuthService } from '../services/ProtocolAuthService';

// {
//   id: '23722745',
//   nodeId: 'MDQ6VXNlcjIzNzIyNzQ1',
//   displayName: 'Radoslav Irha',
//   username: 'radoslavirha',
//   profileUrl: 'https://github.com/radoslavirha',
//   emails: [ { value: 'radoslav.irha@gmail.com' } ],
//   photos: [ { value: 'https://avatars.githubusercontent.com/u/23722745?v=4' } ],
//   provider: 'github',
//   _raw: '{"login":"radoslavirha","id":23722745,"node_id":"MDQ6VXNlcjIzNzIyNzQ1","avatar_url":"https://avatars.githubusercontent.com/u/23722745?v=4","gravatar_id":"","url":"https://api.github.com/users/radoslavirha","html_url":"https://github.com/radoslavirha","followers_url":"https://api.github.com/users/radoslavirha/followers","following_url":"https://api.github.com/users/radoslavirha/following{/other_user}","gists_url":"https://api.github.com/users/radoslavirha/gists{/gist_id}","starred_url":"https://api.github.com/users/radoslavirha/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/radoslavirha/subscriptions","organizations_url":"https://api.github.com/users/radoslavirha/orgs","repos_url":"https://api.github.com/users/radoslavirha/repos","events_url":"https://api.github.com/users/radoslavirha/events{/privacy}","received_events_url":"https://api.github.com/users/radoslavirha/received_events","type":"User","site_admin":false,"name":"Radoslav Irha","company":null,"blog":"","location":"Prague","email":"radoslav.irha@gmail.com","hireable":null,"bio":null,"twitter_username":null,"public_repos":17,"public_gists":0,"followers":1,"following":9,"created_at":"2016-11-24T13:55:20Z","updated_at":"2023-10-25T13:58:46Z","private_gists":0,"total_private_repos":11,"owned_private_repos":10,"disk_usage":27013,"collaborators":0,"two_factor_authentication":true,"plan":{"name":"free","space":976562499,"collaborators":0,"private_repos":10000}}',
//   _json: {
//     login: 'radoslavirha',
//     id: 23722745,
//     node_id: 'MDQ6VXNlcjIzNzIyNzQ1',
//     avatar_url: 'https://avatars.githubusercontent.com/u/23722745?v=4',
//     gravatar_id: '',
//     url: 'https://api.github.com/users/radoslavirha',
//     html_url: 'https://github.com/radoslavirha',
//     followers_url: 'https://api.github.com/users/radoslavirha/followers',
//     following_url: 'https://api.github.com/users/radoslavirha/following{/other_user}',
//     gists_url: 'https://api.github.com/users/radoslavirha/gists{/gist_id}',
//     starred_url: 'https://api.github.com/users/radoslavirha/starred{/owner}{/repo}',
//     subscriptions_url: 'https://api.github.com/users/radoslavirha/subscriptions',
//     organizations_url: 'https://api.github.com/users/radoslavirha/orgs',
//     repos_url: 'https://api.github.com/users/radoslavirha/repos',
//     events_url: 'https://api.github.com/users/radoslavirha/events{/privacy}',
//     received_events_url: 'https://api.github.com/users/radoslavirha/received_events',
//     type: 'User',
//     site_admin: false,
//     name: 'Radoslav Irha',
//     company: null,
//     blog: '',
//     location: 'Prague',
//     email: 'radoslav.irha@gmail.com',
//     hireable: null,
//     bio: null,
//     twitter_username: null,
//     public_repos: 17,
//     public_gists: 0,
//     followers: 1,
//     following: 9,
//     created_at: '2016-11-24T13:55:20Z',
//     updated_at: '2023-10-25T13:58:46Z',
//     private_gists: 0,
//     total_private_repos: 11,
//     owned_private_repos: 10,
//     disk_usage: 27013,
//     collaborators: 0,
//     two_factor_authentication: true,
//     plan: {
//       name: 'free',
//       space: 976562499,
//       collaborators: 0,
//       private_repos: 10000
//     }
//   }
// }

@Protocol<StrategyOptions>({
  name: 'github',
  useStrategy: Strategy,
  settings: {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
    scope: ['user']
  }
})
export class GithubProtocol implements OnVerify, OnInstall, BeforeInstall {
  @Inject()
  private configService!: ConfigService;

  @Inject()
  private authService!: ProtocolAuthService;

  async $beforeInstall(settings: StrategyOptions): Promise<StrategyOptions> {
    settings.clientID = this.configService.config.auth.github.clientID;
    settings.clientSecret = this.configService.config.auth.github.clientSecret;
    settings.callbackURL = this.configService.config.auth.github.callbackURL;
    return settings;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $onInstall(strategy: Strategy): void {}

  async $onVerify(@Req() _request: Req, @Args() [accessToken, refreshToken, body]: [string, string, Profile]) {
    return this.authService.github(body, accessToken, refreshToken);
  }
}
