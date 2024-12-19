import { clearIndexedDB } from '../support/integration/indexDB'

describe('Homepage', () => {
  beforeEach(() => {
    cy.loginAndGoToHomepage()
  })

  afterEach(() => {
    clearIndexedDB()
  })

  it('Check Homepage Content Is Loaded', () => {
    cy.get('[data-cy="todos__tasker-count"]').contains('Tasks For Day')
  })
})
