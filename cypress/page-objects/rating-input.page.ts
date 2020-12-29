export const ratingForm = {
  fillOutAndSubmitForm(ratingName: string) {
    this.typeRatingName(ratingName)
    this.selectRatingType("Private")
    this.typeRatingItem("Item 1")

    this.addNewRatingItem()

    cy.get("ol > li:nth-child(2)")
      .contains("label", "Item name")
      .click()
      .type("Item 2")

    cy.get("form").submit()
  },

  addNewRatingItem() {
    cy.get("button").contains("Add new rating item").click()
  },
  typeRatingName(text: string) {
    cy.contains("label", "Rating name").find("input").clear().type(text)
  },
  selectRatingType(option: "Public" | "Private") {
    cy.contains("label", "Visibility").find("select").select(option)
  },
  typeRatingItem(text: string) {
    cy.contains("label", "Item name").find("input").clear().type(text)
  },

  editAndSubmitForm() {
    this.typeRatingName("Test updated")
    this.selectRatingType("Public")
    this.typeRatingItem("Item 1 updated")
    cy.get("ol > li:nth-child(2)")
      .contains("button", "Remove rating item")
      .click()
    cy.get("form").submit()
  },
}
