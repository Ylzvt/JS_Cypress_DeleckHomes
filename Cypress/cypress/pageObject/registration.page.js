class RegistrationPage{
    get firstName() {return cy.get('[name="firstName"]')}
    get lastName() {return cy.get('[name="lastName"]')}
    get emailInput() {return cy.get('[name="email"]')}
    get passwordInput() {return  cy.get('[name="password"]')}
    get submitBtn() {return  cy.get('[type="submit"]')}
}
export default new RegistrationPage()