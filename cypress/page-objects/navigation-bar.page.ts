export const navigationBar = {
  navigateTo(tabName: string) {
    cy.contains("a", tabName).click()
  },
}
