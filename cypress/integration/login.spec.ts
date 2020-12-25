import { RICK, USER_WITH_INVALID_PASSWORD } from "../constants/users"
import { login } from "../page-objects/login.page"

describe("Login", () => {
  it("is successful with valid credentials ", () => {
    login.logIn(RICK)

    cy.contains("Profile")
    cy.url().should("not.include", "/login")
  })

  it("fails with invalid credentials", function () {
    login.logIn(USER_WITH_INVALID_PASSWORD)

    cy.contains("Login failed")
    cy.url().should("include", "/login")
  })
})
