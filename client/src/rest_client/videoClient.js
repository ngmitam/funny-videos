import BaseClient from './baseClient';

export default class VideoClient extends BaseClient {
  constructor(baseUrl = '/api/v1/video/') {
    super(baseUrl);
  }

  share(url) {
    return super.post(['share'], { url });
  }
  getList() {
    return super.get(['list']);
  }
}
