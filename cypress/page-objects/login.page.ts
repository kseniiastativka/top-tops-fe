export const login = {
  logIn({ login, password }: { login: string; password: string }) {
    cy.visit("http://localhost:3000")
    cy.get("a").contains("Log in").click()
    cy.get("label").contains("Username").type("login")
    cy.get("label").contains("Password").type("password")
    cy.get("form").submit()
  },
}
