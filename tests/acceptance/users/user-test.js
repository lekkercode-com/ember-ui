import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | users/user', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /users/:id', async function (assert) {
    await visit('/users/4');
    assert.equal(currentURL(), '/users/4');
    await visit('/users/5');
    assert.equal(currentURL(), '/users/5');
  });
});
