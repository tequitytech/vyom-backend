import moment from "moment";

export default class UserResource {
  constructor(data) {
    this._id = data._id;
    this.name = data?.name;
    this.email = data?.email;
    this.isGuestUser = data?.isGuestUser;
    this.joinedAt = moment(data?.joinedAt).unix();
  }
}
