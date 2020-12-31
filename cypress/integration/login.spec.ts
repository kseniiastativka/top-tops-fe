import { RICK, USER_WITH_INVALID_PASSWORD } from "../constants/users"
import { login } from "../page-objects/login.page"

describe("Login", () => {
  it("is successful with valid credentials ", () => {
    login.logInAs(RICK)

    cy.contains("Profile")

    cy.reload()

    cy.url().should("not.include", "/login")
  })

  it("fails with invalid credentials", function () {
    login.logInAs(USER_WITH_INVALID_PASSWORD)

    cy.contains("Login failed")

    cy.reload()

    cy.url().should("include", "/login")
  })
})
