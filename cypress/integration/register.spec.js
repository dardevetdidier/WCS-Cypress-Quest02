/// <reference types="cypress" />

// Load Fixtures


const { faker } = require('@faker-js/faker');
faker.locale = 'fr';

let firstName = faker.name.firstName();
let lastName =  faker.name.lastName();
let email = faker.internet.email();
let password = faker.internet.password();
let existingEmail = 'p.martin@test.co';

describe("Register Suite Tests", () => {
    beforeEach(() => {
        cy.visit('https://preprod.backmarket.fr/register');
        cy.get('[data-qa="accept-cta"]').click();
        cy.get('#firstName').type(firstName);
        cy.get('#lastName').type(lastName);       
    })

    it("should register user with valid credentials", () => {
        cy.get('#signup-email').type(email);
        cy.get('#signup-password').type(password);
        cy.get('[data-qa="signup-submit-button"]').click();
        cy.url().should('contain', '/orders');
        cy.get('[data-qa="dashboard-navigation-profil"]').should('be.visible')
    })

    it("Should not register with invalid credentials", () => {
        cy.get('#signup-email').type(email);
        cy.get('#signup-password').type("abc");
        cy.get('[data-qa="signup-submit-button"]').click();        
        cy.url().should('contain', '/register');
    })

    it("Should display error message if register with existing email", () => {        
        cy.get('#signup-email').type(existingEmail);
        cy.get('#signup-password').type(password);
        cy.get('[data-qa="signup-submit-button"]').click();
        cy.get('[class*="text-danger"]').should('contain', 'Un utilisateur avec cette adresse email existe déjà');
    })

    it("Should display register button if register fail", () => {
        cy.get('#signup-email').type(email);
        cy.get('#signup-password').type("abc");
        cy.get('[data-qa="signup-submit-button"]').click();
        cy.get('[data-qa="signup-submit-button"]').should('be.visible')
    })
})
