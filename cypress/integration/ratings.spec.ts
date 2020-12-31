import { login } from "../page-objects/login.page"
import { RICK } from "../constants/users"
import { navigation } from "../page-objects/navigation-bar.page"
import { ratings } from "../page-objects/ratings.page"
import { ratingForm } from "../page-objects/rating-form.page"
import { rating } from "../page-objects/rating.page"

describe("Rating", () => {
  it("can be created, edited and deleted", function () {
    login.logInAs(RICK)
    navigation.navigateToMyRatings()
    ratings.goToAddNewRating()
    ratingForm.typeRatingName("Test rating")
    ratingForm.selectRatingVisibility("Private")
    ratingForm.typeRatingItem("Item 1", 1)
    ratingForm.addNewRatingItem()
    ratingForm.typeRatingItem("Item 2", 2)
    ratingForm.submit()

    cy.contains("h1", "Test rating")
    cy.percySnapshot("Added rating")

    rating.edit()
    ratingForm.typeRatingName("Test updated")
    ratingForm.selectRatingVisibility("Public")
    ratingForm.typeRatingItem("Item 1 updated", 1)
    ratingForm.removeRatingItem(2)
    ratingForm.submit()

    cy.contains("h1", "Test updated")
    cy.percySnapshot("Edited rating")

    rating.delete()

    ratings.assertIsOpen()
    cy.contains("Test rating").should("not.exist")
  })
})
