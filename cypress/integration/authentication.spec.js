/// <reference types="cypress" />

let validEmail = 'p.martin@test.co';
let validPassword = '19Testqa';

describe("authentication suite tests", () => {
    beforeEach(() => {
        cy.visit('https://preprod.backmarket.fr/register');
        cy.get('[data-qa="accept-cta"]').click();     
    })

    it("Should authenticate user with valid credentials", () => {
        cy.get('#signin-email').type(validEmail);
        cy.get('#signin-password').type(validPassword);
        cy.get('[data-qa=signin-submit-button]').click();
        cy.url().should('contain', '/orders');   
    })

    it("Should stay at register page if login with invalid credentials", () => {
        cy.get('#signin-email').type('invalidemail@test.co');
        cy.get('#signin-password').type('invalidPassword1234');
        cy.get('[data-qa=signin-submit-button]').click();
        cy.url().should('contain', '/register');
    })

    it("Should display an error message if login with invalid credentials", () => {
        cy.get('#signin-email').type('invalidemail@test.co');
        cy.get('#signin-password').type('invalidPassword1234');
        cy.get('[data-qa=signin-submit-button]').click();
        cy.contains("Informations d'identification erronées").should('be.visible');
    })

    it("Should display email form field with red border if email format is invalid", () => {
        cy.get('#signin-email').type('invalidemailformat');
        cy.get('#signin-password').type(validPassword);
        cy.get('[data-qa=signin-submit-button]').click();
        cy.get('[class*="border-danger"]').should('exist')
    })

    it.only("Should display password form field with red border if password format is invalid", () => {
        cy.get('#signin-email').type('invalidemailformat');
        cy.get('#signin-password').type(validPassword);
        cy.get('[data-qa=signin-submit-button]').click();
        cy.get('#signin-email').should('have.class', "border-danger");
    })
})