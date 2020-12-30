export const ratingForm = {
  fillOutAndSubmitForm(ratingName: string) {
    this.typeRatingName(ratingName)
    this.selectRatingType("Private")
    this.typeRatingItem("Item 1", 1)

    this.addNewRatingItem()

    this.typeRatingItem("Item 2", 2)

    this.submitForm()
  },

  submitForm() {
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

  editAndSubmitForm() {
    this.typeRatingName("Test updated")
    this.selectRatingType("Public")
    this.typeRatingItem("Item 1 updated", 1)
    this.removeRatingItem(2)
    this.submitForm()
  },
}
