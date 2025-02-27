import loginPage from "../../pageObject/login.page";
import homePage from "../../pageObject/home.page";
import dashboardPage from "../../pageObject/dashboard.page";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
    // Click login button on homepage
    homePage.loginBtn.click();

    // Type in username/password
    loginPage.emailInput.type("admin@gmail.com");
    loginPage.passwordInput.type("DontTestMe");

    // Click login button
    loginPage.loginBtn.click();
  });

  it("Should log in with existing account as an admin", () => {
    // Verify admin role and title
    dashboardPage.roleLbl.should("have.text", "role: admin");
    cy.title().should("eq", "User: Profile | Delek Homes");
    dashboardPage.nameLbl.should("have.text", "Admin  Adminenko");
  });

  it("Should log out", () => {
    // log out
    dashboardPage.userBTN.click();
    dashboardPage.logoutBtn.click();
    cy.get("h4").should("have.text", "Sign in to Delek Homes");
    cy.title().should("eq", "Login | Delek Homes");
  });
});
