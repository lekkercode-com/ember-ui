import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as server } from '@ember/service';

export default class ArchiveUserComponent extends Component {
    @server store;

    @action
    archiveUser(userId) {
        this.store.findRecord('user', userId)
        .then(function(user) {
            user.archived;
            user.archived = true;
            user.save();
        });
    }
}
