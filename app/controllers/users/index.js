import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class UsersIndexController extends Controller {
  queryParams = ['showArchivedUsers'];

  @tracked showArchivedUsers = false;
}
