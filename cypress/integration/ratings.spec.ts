import { login } from "../page-objects/login.page"
import { RICK } from "../constants/users"
import { navigationBar } from "../page-objects/navigation-bar.page"
import { ratings } from "../page-objects/ratings.page"
import "@percy/cypress"
import { ratingForm } from "../page-objects/rating-input.page"
import { rating } from "../page-objects/rating.page"

describe("Rating", () => {
  it("can be created, edited and deleted", function () {
    login.logIn(RICK)
    navigationBar.navigateTo("My Rating")
    ratings.goToAddNewRating()
    ratingForm.fillOutAndSubmitForm("Test rating")

    cy.contains("a", "Edit")
    cy.percySnapshot("Added rating")

    rating.edit()
    ratingForm.editAndSubmitForm()

    cy.contains("a", "Edit")
    cy.percySnapshot("Edited rating")

    rating.delete()

    cy.contains("a", "Add new rating")
    cy.contains("Test rating").should("not.exist")
  })
})
