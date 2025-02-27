class Dashboard{
    get roleLbl() {return cy.get("a p")}
    get nameLbl() {return cy.get("h6")}
    get userBTN() {return  cy.get("header button")}
    get logoutBtn() {return cy.contains("Logout")}
    }
export default new Dashboard()