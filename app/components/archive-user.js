import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ArchiveUserComponent extends Component {
    @service store;
    @action archieve(userId) {
            this.store.findRecord('user', userId)  
            .then(function(user) {
                user.archived; 
                user.archived = true;
                user.save();
            });
            
      }
}
