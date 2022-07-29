import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class UserArchivedStatusComponent extends Component {
  @action async toggleArchived() {
    const {
      args: { user },
    } = this;
    user.archived = !user.archived;
    user.save();
  }
}
