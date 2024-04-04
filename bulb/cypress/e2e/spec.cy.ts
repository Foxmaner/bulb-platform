/// <reference types = "cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('should display the home page', () => {
    cy.contains('Welcome to Bulb platform!')
  })
})

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000') // change URL to match your dev URL

    cy.contains('Meetings').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/meetings')
  })
})

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000') // change URL to match your dev URL

    cy.contains('Documents').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/documents')
  })
})

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000') // change URL to match your dev URL

    cy.contains('Templates').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/templates')
  })
})