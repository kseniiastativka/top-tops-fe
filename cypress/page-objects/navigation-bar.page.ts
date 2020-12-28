export const navigationBar = {
  navigateTo(tabName: string) {
    cy.get("a").contains(tabName).click()
  },
}
