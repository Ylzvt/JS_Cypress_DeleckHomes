import loginPage from "../../pageObject/login.page";
import homePage from "../../pageObject/home.page";
import dashboardPage from "../../pageObject/dashboard.page";
import userCreds from "../../fixtures/userCreds.json"

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
    // Click login button on homepage
    homePage.loginBtn.click();
});

  it("Should log in with existing account as an admin", () => {
   // Type in username/password
    loginPage.emailInput.type(userCreds.admin.email);
    loginPage.passwordInput.type(userCreds.admin.password);
    loginPage.loginBtn.click();
    // Verify admin role and title
    dashboardPage.roleLbl.should("have.text", userCreds.admin.labelRoleUser);
    cy.title().should("eq", "User: Profile | Delek Homes");
    dashboardPage.nameLbl.should("have.text", userCreds.admin.labelFirstNameLastName);
  });

  it("Should log in with existing account as a user", () => {
    // Type in username/password
    loginPage.emailInput.type(userCreds.user.email);
    loginPage.passwordInput.type(userCreds.user.password);
    loginPage.loginBtn.click();
    // Verify admin role and title
    dashboardPage.roleLbl.should("have.text", userCreds.user.labelRoleUser);
    cy.title().should("eq", "User: Profile | Delek Homes");
    dashboardPage.nameLbl.should("have.text", userCreds.user.labelFirstNameLastName);
  });

  it("Should log in with existing account as realtor", () => {
    // Type in username/password
    loginPage.emailInput.type(userCreds.realtor.email);
    loginPage.passwordInput.type(userCreds.realtor.password);
    loginPage.loginBtn.click();
    // Verify admin role and title
    dashboardPage.roleLbl.should("have.text", userCreds.realtor.labelRoleUser);
    cy.title().should("eq", "User: Profile | Delek Homes");
    dashboardPage.nameLbl.should("have.text", userCreds.realtor.labelFirstNameLastName);
  });

  it("Should not log in with invalid Password", () => {
    // Type in username/password
    loginPage.emailInput.type(userCreds.user.email);
    loginPage.passwordInput.type(userCreds.invaliduser.password);
    loginPage.loginBtn.click();
    loginPage.errorM.should("be.visible")
    
  });

  it("Should not log in with invalid email", () => {
    // Type in username/password
    loginPage.emailInput.type(userCreds.invaliduser.email);
    loginPage.passwordInput.type(userCreds.admin.password);
    loginPage.loginBtn.click();
    loginPage.errorM.should("be.visible")
    
  });

  it("Should log out", () => {
    // Type in username/password
    loginPage.emailInput.type(userCreds.admin.email);
    loginPage.passwordInput.type(userCreds.admin.password);
    loginPage.loginBtn.click();
    // log out
    dashboardPage.userBTN.click();
    dashboardPage.logoutBtn.click();
    cy.get("h4").should("have.text", "Sign in to Delek Homes");
    cy.title().should("eq", "Login | Delek Homes");
  });
});
