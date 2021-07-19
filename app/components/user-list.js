import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class UserListComponent extends Component {
    @tracked userData;
    @service store;
    @action searchName() {
        this.userData = this.store.findAll('user');
      }
    @action unarchive(userId) {
        this.store.findRecord('user', userId)  
        .then(function(user) {
            user.archived;
            user.archived = false;
            user.save();
        });
    }
}

