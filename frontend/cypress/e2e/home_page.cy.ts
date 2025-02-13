/// <reference types = "cypress" />
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  it('should display the login page', () => {
    cy.screenshot('my-screenshot'); // Take a screenshot

    cy.get('button').contains('Login with Google')
    cy.screenshot('my-screenshot2'); // Take a screenshot

  })
})

/** 



describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/') // change URL to match your dev URL

    cy.contains('Meetings').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/meetings')
  })
})

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/') // change URL to match your dev URL

    cy.contains('Documents').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/documents')
  })
})

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000/') // change URL to match your dev URL

    cy.contains('Templates').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/')
  })
  
})
*/