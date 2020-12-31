export const ratingForm = {
  submit() {
    cy.get("form").submit()
  },

  addNewRatingItem() {
    cy.contains("button", "Add new rating item").click()
  },
  typeRatingName(text: string) {
    cy.contains("label", "Rating name").find("input").clear().type(text)
  },
  selectRatingVisibility(option: "Public" | "Private") {
    cy.contains("label", "Visibility").find("select").select(option)
  },
  typeRatingItem(text: string, index: 1 | 2) {
    cy.get(`ol > li:nth-child(${index})`)
      .contains("label", "Item name")
      .find("input")
      .clear()
      .type(text)
  },
  removeRatingItem(index: 1 | 2) {
    cy.get(`ol > li:nth-child(${index})`)
      .contains("button", "Remove rating item")
      .click()
  },
}
