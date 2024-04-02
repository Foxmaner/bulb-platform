/// <reference types = "cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('should display the home page', () => {
    cy.contains('Welcome to Bulb platform!')
  })
})