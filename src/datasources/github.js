const { RESTDataSource } = require('apollo-datasource-rest');

class GitHubAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.github.com/';
    console.log('constructor')
    this.auth = '?client_id=28ddb00e958e20e80330&client_secret=f2604eaafb3dc9afca773c76f8e0e84bb9591363'
    this.numResults = '&per_page=3';
  }

  // leaving this inside the class to make the class easier to test
  async userReducer(user) {
    const detailedUser = await this.get(user.url+this.auth);
    return {
      id: detailedUser.id || -1,
      login: detailedUser.login || 'not found',
      email: detailedUser.email,
      url: detailedUser.html_url,
      company: detailedUser.company,
      blog: detailedUser.blog,
      followers: detailedUser.followers,
      avatar_url: detailedUser.avatar_url
    };
  }

  async getAllUsers() {
    const response = await this.get('users'+this.auth+this.numResults);
    // transform the raw launches to a more friendly
    return Array.isArray(response)
      ? response.map(launch => this.userReducer(launch)) : [];
  }

  async getUser({ login }) {
    const res = await this.get('users/'+login +this.auth);
    return this.userReducer(res);
  }

  async getUsersAtLocation({location}) {
    const res = await this.get('search/users?q=location:'+location+this.numResults);
    return Array.isArray(res.items)
      ? res.items.map(user => this.userReducer(user)) : [];
  }

}

module.exports = GitHubAPI;
