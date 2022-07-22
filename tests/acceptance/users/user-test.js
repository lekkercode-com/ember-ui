import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

const SELECTORS = {
  USER_ARCHIVED_STATUS: '[data-test-target=user-archived-status]',
  USER_ARCHIVE_BUTTON: '[data-test-target=user-archive-status-toggle-button]',
  UNARCHIVED_USER_CARD: '[data-test-target=user-card-in-list][data-user-id="4"]',
  ARCHIVED_USER_CARD: '[data-test-target=user-card-in-list][data-user-id="5"]',
};

module('Acceptance | users/user', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /users/:id', async function (assert) {
    await visit('/users/4');
    assert.equal(currentURL(), '/users/4');
    await visit('/users/5');
    assert.equal(currentURL(), '/users/5');
  });

  module('Archiving', function () {
    test('a notice is displayed indicating if the user is archived', async function (assert) {
      await visit('/users/4');
      assert.dom(SELECTORS.USER_ARCHIVED_STATUS).hasText('active');
      await visit('/users/5');
      assert.dom(SELECTORS.USER_ARCHIVED_STATUS).hasText('archived');
    });
    test('an Archive/Unarchive button is displayed depending on if the user is archived', async function (assert) {
      await visit('/users/4');
      assert.dom(SELECTORS.USER_ARCHIVE_BUTTON).hasText('Archive');
      await visit('/users/5');
      assert.dom(SELECTORS.USER_ARCHIVE_BUTTON).hasText('Unarchive');
    });
    test('clicking Archive button archives the user', async function (assert) {
      await visit('/users/4');
      await click(SELECTORS.USER_ARCHIVE_BUTTON);
      assert.dom(SELECTORS.USER_ARCHIVED_STATUS).hasText('archived');
      assert.dom(SELECTORS.USER_ARCHIVE_BUTTON).hasText('Unarchive');
    });
    test('clicking Unarchive button unarchives the user', async function (assert) {
      await visit('/users/5');
      await click(SELECTORS.USER_ARCHIVE_BUTTON);
      assert.dom(SELECTORS.USER_ARCHIVED_STATUS).hasText('active');
      assert.dom(SELECTORS.USER_ARCHIVE_BUTTON).hasText('Archive');
    });
    test('after Archiving a user is hidden from the list', async function (assert) {
      await visit('/users');
      assert.dom(SELECTORS.UNARCHIVED_USER_CARD).exists();
      await visit('/users/4');
      await click(SELECTORS.USER_ARCHIVE_BUTTON);
      await visit('/users');
      assert.dom(SELECTORS.UNARCHIVED_USER_CARD).doesNotExist();
    });
    test('after Unarchiving a user is shown in the list', async function (assert) {
      await visit('/users');
      assert.dom(SELECTORS.ARCHIVED_USER_CARD).doesNotExist();
      await visit('/users/5');
      await click(SELECTORS.USER_ARCHIVE_BUTTON);
      await visit('/users');
      assert.dom(SELECTORS.ARCHIVED_USER_CARD).exists();
    });
  });
});
