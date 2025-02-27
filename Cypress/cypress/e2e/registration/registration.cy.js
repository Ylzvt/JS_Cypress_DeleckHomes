import homePage from "../../pageObject/home.page";
import loginPage from "../../pageObject/login.page";
import dashboardPage from "../../pageObject/dashboard.page";
import registrationPage from "../../pageObject/registration.page";

describe("User Registration Test", () => {
  let user;

  before(() => {
    cy.generateUser().then((generatedUser) => {
      user = generatedUser; //Pulls from command.js Chance library
    });
  });
  beforeEach(() => {
    cy.visit("/");
    homePage.registerBtn.click();
  });

  it("Should register a new user account", () => {
    // Register
   
    registrationPage.firstName.type(user.firstName);
    registrationPage.lastName.type(user.lastName);
    registrationPage.emailInput.type(user.email);
    registrationPage.passwordInput.type(user.password);
    registrationPage.submitBtn.click();

    // Verify user role, name, and page title
    dashboardPage.roleLbl.should("have.text", "role: user");
    cy.get("h6").should("have.text", user.firstName +"  "+ user.lastName);

    // Logout
    dashboardPage.userBTN.click();
    dashboardPage.logoutBtn.click();
    cy.get("h4").should("have.text", "Sign in to Delek Homes");
    cy.title().should("eq", "Login | Delek Homes");

    // Type in username/password
   loginPage.emailInput.type(user.email)
   loginPage.passwordInput.type(user.password)
   loginPage.loginBtn.click()
    cy.get("h6").should("have.text", user.firstName +"  "+ user.lastName);
    dashboardPage.roleLbl.should("have.text", "role: user");
  });
  it("Should not register with an already existing email account", () => {
    // Register with same credentials
    
    registrationPage.firstName.type(user.firstName);
    registrationPage.lastName.type(user.lastName)
    registrationPage.emailInput.type(user.email);
    registrationPage.passwordInput.type(user.password);
    registrationPage.submitBtn.click();
    cy.get(".MuiAlert-message")
      .should("be.visible")
      .should("have.text", "Input data validation failed");
  });
  it("Should not register without filling in required fields", () => {
    // Register with no data
    registrationPage.submitBtn.click();
    cy.contains("First name required").should("be.visible");
    cy.contains("Last name required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });
});
