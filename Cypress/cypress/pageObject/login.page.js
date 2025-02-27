class LoginPage{
    get emailInput() {return cy.get('[name="email"]')}
    get passwordInput() {return cy.get('[name="password"]')}
    get loginBtn() {return cy.contains('Login')}


    login(email, password) {
      this.emailInput.type('admin@gmail.com'); // Types in the email
      this.passwordInput.type('DontTestMe'); // Types in the password
      this.loginBtn.click(); // Clicks the login button
    }
}
  
  export default new LoginPage();
