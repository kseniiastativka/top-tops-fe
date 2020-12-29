export const login = {
  logIn({ login, password }: { login: string; password: string }) {
    cy.visit("/")
    cy.contains("a", "Log in").click()
    cy.contains("label", "Username").type(login)
    cy.contains("label", "Password").type(password)
    cy.get("form").submit()
  },
}
