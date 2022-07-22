import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class UsersUserController extends Controller {
  @action async toggleArchived (user) {
    user.archived = !user.archived;
    user.save();
  }
}
