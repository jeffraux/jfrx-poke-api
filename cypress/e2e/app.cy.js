describe('Home', () => {
  beforeEach(() => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
  })

  it('should render home page with default values for Pagination', () => {
    // Find Page number input with default value '1'
    cy.get('input').should('have.value', '1')
    // Find Page size selector
    cy.get('select').should('have.value', '10')
    // Find Next button
    cy.contains('Next').should('not.be.disabled')
    // Find disabled Previous button
    cy.contains('Previous').should('be.disabled')
  })

  it('should display the number of cards based on page size', () => {
    cy.get('select').as('pageSelector').should('have.value', '10')
    // Should display default number of items
    cy.get('.pokemon-card').should(($card) => {
      expect($card).to.have.length(10)
    })

    cy.get('@pageSelector').select('20')
    cy.get('.pokemon-card').should(($card) => {
      expect($card).to.have.length(20)
    })
  })

  it('should be able to go next/previous page', () => {
    cy.get('input').as('pageNumber').should('have.value', '1')
    cy.contains('Next').as('nextBtn').should('not.be.disabled')
    cy.contains('Previous').as('prevBtn').should('be.disabled')

    cy.get('@nextBtn').click()
    // Find Page number input with new value '2'
    cy.get('@pageNumber').should('have.value', '2')
    // Find Previous button now enabled
    cy.get('@prevBtn').should('not.be.disabled')

    cy.get('@prevBtn').click()
    cy.get('@pageNumber').should('have.value', '1')
    cy.get('@prevBtn').should('be.disabled')
  })

  it('should be able to jump to any page', () => {
    cy.get('input').as('pageNumber').should('have.value', '1')

    cy.get('@pageNumber').type('12')

    cy.get('.pokemon-card').should(($card) => {
      expect($card).to.have.length(10)
    })
  })

  it('should display Pokemon cards', () => {
    cy.get('.pokemon-card').as('card').should(($card) => {
      expect($card).to.have.length(10)
    })

    // A card should have an image
    cy.get('@card').children('img')
    // A card should have the pokemon's name + capitalized
    cy.get('@card').children('span').should('have.class', 'capitalize')
    // Name should not have hyphen
    cy.get('@card').children('span').should('not.contain', '-')
  })

  it('should display pokemon details', () => {
    cy.get('.pokemon-card').as('card').should(($card) => {
      expect($card).to.have.length(10)
    })

    cy.get('@card').first().click()

    cy.get('#pokemonDetailsModal').should('have.css', 'display')
  })
})
