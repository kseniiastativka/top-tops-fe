export const ratings = {
  goToAddNewRating() {
    cy.contains("a", "Add new rating").click()
  },
  assertIsOpen() {
    cy.contains("a", "Add new rating")
  },
}
