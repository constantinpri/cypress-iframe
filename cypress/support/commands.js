const iFrame = "iFrame";

/**
 * Will check if an iframe is ready for DOM manipulation. Just listening for the
 * load event will only work if the iframe is not already loaded. If so, it is
 * necessary to observe the readyState. The issue here is that Chrome initialises
 * iframes with "about:blank" and sets their readyState to complete. So it is
 * also necessary to check if it's the readyState of the correct target document.
 *
 * Some hints taken and adapted from:
 * https://stackoverflow.com/questions/17158932/how-to-detect-when-an-iframe-has-already-been-loaded/36155560
 *
 * @param $iframe - The iframe element
 */
const isIframeLoaded = ($iframe) => {
  const contentWindow = $iframe.contentWindow;

  const src = $iframe.attributes.src;
  const href = contentWindow.location.href;
  if (contentWindow.document.readyState === "complete") {
    return href !== "about:blank" || src === "about:blank" || src === "";
  }

  return false;
};

/**
 * Wait for iframe to load, and call callback
 *
 * Some hints taken and adapted from:
 * https://gitlab.com/kgroat/cypress-iframe/-/blob/master/src/index.ts
 */
Cypress.Commands.add(
  "iframe",
  { prevSubject: "element" },
  ($iframes) =>
    new Cypress.Promise((resolve) => {
      const loaded = [];

      $iframes.each((_, $iframe) => {
        loaded.push(
          new Promise((subResolve) => {
            if (isIframeLoaded($iframe)) {
              subResolve($iframe.contentDocument.body);
            } else {
              Cypress.$($iframe).on("load.appearHere", () => {
                if (isIframeLoaded($iframe)) {
                  subResolve($iframe.contentDocument.body);
                  Cypress.$($iframe).off("load.appearHere");
                }
              });
            }
          })
        );
      });

      return Promise.all(loaded).then(resolve);
    })
);

Cypress.Commands.add("fillOutCreditCardForm", (details) => {
  cy.get(iFrame)
    .iframe()
    .then((iframes) => {
      cy.wrap(iframes)
        .find("[name='email']")
        .first()
        .type(details.email)
        .should("have.value", details.email);
      cy.wrap(iframes)
        .find("[id='cardNumber']")
        .first()
        .type(details.number)
        .should("have.value", details.number);
      cy.wrap(iframes)
        .find("[id='cardExpiry']")
        .type(details.expiration)
        .should("have.value", details.expiration);
      cy.wrap(iframes)
        .find("[id='cardCvc']")
        .first()
        .type(details.code)
        .should("have.value", details.code);
      cy.wrap(iframes)
        .find("[id='billingName']")
        .first()
        .type(details.name)
        .should("have.value", details.name);
      cy.wrap(iframes)
        .find("[id='billingPostalCode']")
        .type(details.zipCode)
        .should("have.value", details.zipCode);
      cy.wrap(iframes).contains("button", "Pay").should("be.visible").click();
      cy.wrap(iframes)
        .contains("span", "Processing")
        .should("have.attr", "aria-hidden", "false");
      cy.wrap(iframes).contains("button", "Pay").should("not.exist");
    });
});

// This is a command to verify that the header components are displayed
Cypress.Commands.add("verifyCheckoutHeader", () => {
  cy.url().should("include", "checkout.stripe.dev/preview");
  cy.get("header>a")
    .should("be.visible")
    .and("have.attr", "href")
    .and("contain", "https://stripe.com/payments/checkout");
  cy.contains("header>div>a:first", "Sign in")
    .should("be.visible")
    .and("have.attr", "href")
    .and("contain", "https://dashboard.stripe.com/login");
  cy.contains("header>div>a:last", "Explore the docs")
    .should("be.visible")
    .and("have.attr", "href")
    .and("contain", "https://stripe.com/docs/payments/checkout");
  cy.contains("h1", "Explore Checkout").should("be.visible");
  cy.contains("[class='Breadcrumb-LinkAnimator'] > a", "Try it out")
    .should("be.visible")
    .and("have.attr", "href")
    .and("contain", "/configure");
  cy.contains("span", "3 of 3").should("be.visible");
  cy.get('[class="ViewToggle"]>button:first').should("be.visible");
  cy.get('[class="ViewToggle"]>button:last').should("be.visible");
  cy.contains("span", "Wallet").should("be.visible");
  cy.get('[id="Layer_1"]').should("be.visible");
  cy.contains("span", "Customer location").should("be.visible");
  cy.contains("div", "United States").should("be.visible");
});
