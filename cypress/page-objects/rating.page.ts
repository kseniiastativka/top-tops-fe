export const rating = {
  edit() {
    cy.contains("a", "Edit").click()
  },
  delete() {
    cy.contains("button", "Delete").click()
    cy.on("window:confirm", () => true)
  },
}
