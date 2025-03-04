import moment from "moment";
import { baseUrl } from "../../../common/constants/configConstants";

export default class UserResource {
  constructor(data) {
    this._id = data._id;
    this.name = data?.name;
    this.email = data?.email;
    this.joinedAt = moment(data?.joinedAt).unix();
  }
}
