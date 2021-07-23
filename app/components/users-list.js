import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UsersListComponent extends Component {
    @tracked userData;

    @service store;

    @action
    allUsers() {
        this.userData = this.store.findAll('user');
    }

    @action
    unarchivedUser(userId) {
        this.store.findRecord('user', userId)
        .then(function(user) {
            user.archived;
            user.archived = false;
            user.save();
        })
    }
}
