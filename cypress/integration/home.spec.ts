describe("Home", () => {
  it("contains proper h1", () => {
    cy.visit("http://localhost:3000")
    cy.get("h1")
      .should("have.length", 1)
      .contains("ratings", { matchCase: false })
  })
})
