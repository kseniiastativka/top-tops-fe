import { MORTY } from "../constants/users"
import { navigation } from "../page-objects/navigation-bar.page"
import { profile } from "../page-objects/profile.page"
import { login } from "../page-objects/login.page"

describe("Logout", () => {
  it("returns user to the login page", () => {
    login.logInAs(MORTY)
    cy.contains("Profile")
    navigation.navigateToProfile()
    profile.logout()
    cy.reload()

    cy.url().should("include", "/login")
  })
})
