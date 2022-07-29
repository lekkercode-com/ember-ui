import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { tracked } from '@glimmer/tracking';

const SELECTORS = {
  COMPONENT_ROOT: 'cmp-user-archived-status',
  TEST_BLOCK: 'cmp-user-archived-status test-block',
  USER_ARCHIVED_STATUS: '[data-test-target=user-archived-status]',
  USER_ARCHIVE_BUTTON: '[data-test-target=user-archive-status-toggle-button]',
};

class UserStub {
  @tracked archived = false;
  @tracked saveCalled = false;
  constructor({ archived = false } = {}) {
    this.archived = archived;
  }
  async save() {
    this.saveCalled = true;
  }
}

module('Integration | Component | user-archived-status', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('user', new UserStub());

    await render(hbs`<UserArchivedStatus @user={{this.user}} />`);

    assert.dom(SELECTORS.COMPONENT_ROOT).exists();

    await render(hbs`
    <UserArchivedStatus>
      <test-block>template block text</test-block>
    </UserArchivedStatus>
    `);

    assert.dom(SELECTORS.TEST_BLOCK).exists();
    assert.dom(SELECTORS.TEST_BLOCK).hasText('template block text');
  });

  test('it proxies attributes to the root element', async function (assert) {
    this.set('user', new UserStub());
    await render(hbs`<UserArchivedStatus @user={{this.user}} data-test-attr="foo-bar" />`);
    assert.dom(SELECTORS.COMPONENT_ROOT).hasAttribute('data-test-attr');
    assert.equal(
      this.element
        .querySelector(SELECTORS.COMPONENT_ROOT)
        .getAttribute('data-test-attr'),
      'foo-bar'
    );
  });

  test('it shows a notice indicating if the user is archived', async function (assert) {
    this.set('user', new UserStub());
    await render(hbs`<UserArchivedStatus @user={{this.user}} />`);
    assert.dom(SELECTORS.USER_ARCHIVED_STATUS).hasText('active');
    this.set('user', new UserStub({ archived: true }));
    assert.dom(SELECTORS.USER_ARCHIVED_STATUS).hasText('archived');
  });

  test('it shows an Archive/Unarchive button depending on if the user is archived', async function (assert) {
    this.set('user', new UserStub());
    await render(hbs`<UserArchivedStatus @user={{this.user}} />`);
    assert.dom(SELECTORS.USER_ARCHIVE_BUTTON).hasText('Archive');
    this.set('user', new UserStub({ archived: true }));
    assert.dom(SELECTORS.USER_ARCHIVE_BUTTON).hasText('Unarchive');
  });

  test('archives the user when Archive button is clicked', async function (assert) {
    const userStub = new UserStub();
    this.set('user', userStub);
    await render(hbs`<UserArchivedStatus @user={{this.user}} />`);
    await click(SELECTORS.USER_ARCHIVE_BUTTON);
    assert.equal(userStub.archived, true, 'archived flag must be flipped');
    assert.equal(userStub.saveCalled, true, 'save method must be called');
    assert.dom(SELECTORS.USER_ARCHIVED_STATUS).hasText('archived');
    assert.dom(SELECTORS.USER_ARCHIVE_BUTTON).hasText('Unarchive');
  });

  test('unarchives the user when Unarchive button is clicked', async function (assert) {
    const userStub = new UserStub({ archived: true });
    this.set('user', userStub);
    await render(hbs`<UserArchivedStatus @user={{this.user}} />`);
    await click(SELECTORS.USER_ARCHIVE_BUTTON);
    assert.equal(userStub.archived, false, 'archived flag must be flipped');
    assert.equal(userStub.saveCalled, true, 'save method must be called');
    assert.dom(SELECTORS.USER_ARCHIVED_STATUS).hasText('active');
    assert.dom(SELECTORS.USER_ARCHIVE_BUTTON).hasText('Archive');
  });
});
