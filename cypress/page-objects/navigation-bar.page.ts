export const navigation = {
  navigateToMyRatings() {
    cy.contains("a", "My Rating").click()
  },

  navigateToProfile() {
    cy.contains("a", "Profile").click()
  },
}
