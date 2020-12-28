export const profile = {
  logout() {
    cy.get("button").contains("Log out").click()
  },
}
