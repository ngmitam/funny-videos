import BaseClient from './baseClient';

export default class VideoClient extends BaseClient {
  constructor(baseUrl = '/api/v1/video/') {
    super(baseUrl);
  }

  share(trip) {
    return super.post(['share'], trip);
  }
  getList() {
    return super.get(['list']);
  }
}
