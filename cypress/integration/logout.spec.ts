import { MORTY, RICK } from "../constants/users"
import { navigationBar } from "../page-objects/navigation-bar.page"
import { profile } from "../page-objects/profile.page"
import { login } from "../page-objects/login.page"

describe("Logout", () => {
  it("returns user to the login page", () => {
    login.logIn(MORTY)
    cy.contains("Profile")
    navigationBar.navigateTo("Profile")
    profile.logout()
    cy.reload()

    cy.url().should("include", "/login")
  })
})
