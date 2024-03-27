/// <reference types = "cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('should display the home page', () => {
    cy.get('H1').should('have.text', 'Welcome to nextJS!')
  })
})