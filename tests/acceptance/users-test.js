import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

const SELECTORS = {
  CHECKBOX_TOGGLE_ARCHIVED: '[data-test-target=checkbox-toggle-archived-users]',
  USER_CARD_IN_LIST: '[data-test-target=user-card-in-list]',
  ARCHIVED_USER_CARD: '[data-test-target=user-card-in-list][data-user-id="5"]',
};

module('Acceptance | users', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /users', async function (assert) {
    await visit('/users');
    assert.equal(currentURL(), '/users');
  });

  test('archived users are not shown by default', async function (assert) {
    await visit('/users');
    assert.dom(SELECTORS.ARCHIVED_USER_CARD).doesNotExist();
  });

  test('checkbox "show archived users" is unchecked by default', async function (assert) {
    await visit('/users');
    assert.dom(SELECTORS.CHECKBOX_TOGGLE_ARCHIVED).isNotChecked();
  });

  test('checkbox "show archived users" is bound to query params', async function (assert) {
    await visit('/users?showArchivedUsers=true');
    assert.dom(SELECTORS.CHECKBOX_TOGGLE_ARCHIVED).isChecked();
    await visit('/users?showArchivedUsers=false');
    assert.dom(SELECTORS.CHECKBOX_TOGGLE_ARCHIVED).isNotChecked();
  });

  test('clicking "show archived users" updates query params', async function (assert) {
    const router = this.owner.router;

    await visit('/users');
    assert.notPropContains(router.currentRoute.queryParams, {
      showArchivedUsers: 'true',
    });
    await click(SELECTORS.CHECKBOX_TOGGLE_ARCHIVED);
    assert.propContains(router.currentRoute.queryParams, {
      showArchivedUsers: 'true',
    });
    await click(SELECTORS.CHECKBOX_TOGGLE_ARCHIVED);
    assert.notPropContains(router.currentRoute.queryParams, {
      showArchivedUsers: 'true',
    });
  });

  test('checkbox "show archived users" state changes after clicking', async function (assert) {
    await visit('/users');
    await click(SELECTORS.CHECKBOX_TOGGLE_ARCHIVED);
    assert.dom(SELECTORS.CHECKBOX_TOGGLE_ARCHIVED).isChecked();
    await click(SELECTORS.CHECKBOX_TOGGLE_ARCHIVED);
    assert.dom(SELECTORS.CHECKBOX_TOGGLE_ARCHIVED).isNotChecked();
  });

  test('clicking "show archived users" toggles archived users in the list', async function (assert) {
    await visit('/users');
    await click(SELECTORS.CHECKBOX_TOGGLE_ARCHIVED);
    assert.dom(SELECTORS.ARCHIVED_USER_CARD).exists();
    await click(SELECTORS.CHECKBOX_TOGGLE_ARCHIVED);
    assert.dom(SELECTORS.ARCHIVED_USER_CARD).doesNotExist();
  });
});
