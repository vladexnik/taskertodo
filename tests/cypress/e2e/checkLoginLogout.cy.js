import { clearIndexedDB } from '../support/integration/indexDB'

describe('Homepage', () => {
  afterEach(() => {
    clearIndexedDB()
  })

  it('Check Homepage', () => {
    cy.loginAndGoToHomepage()
    cy.get('[data-cy="todos__tasker-count"]').contains('Tasks For Day')
  })
})
