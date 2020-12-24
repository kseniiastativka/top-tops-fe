import { Rick, UserWithInvalidPassword } from "../constants/users"
import { login } from "../page-objects/login.page"

describe("Login", () => {
  it("is successful with valid credentials ", () => {
    login.logIn(Rick)

    cy.contains("Profile")
    cy.url().should("not.include", "/login")
  })

  it("fails with invalid credentials", function () {
    login.logIn(UserWithInvalidPassword)

    cy.contains("Login failed")
    cy.url().should("include", "/login")
  })
})
