/// <reference types="cypress" />
///<reference types="cypress-iframe" />

const iframe = '[name="checkout-demo"]';
const payBtn = "[data-testid='hosted-payment-submit-button']";
const email = "[name='email']";
const cardNumber = "[id='cardNumber']";
const cardExpDate = "[id='cardExpiry']";
const cardCvs = "[id='cardCvc']";
const billingName = "[id='billingName']";
const zipCode = "[id='billingPostalCode']";
const emptyFiledError = "[data-qa='EmptyFieldError']";
const requiredCardNumberError = "[id='required-cardNumber-fieldset']";
const requiredBillingNameError = "[id='required-billingName-fieldset']";
const paymentSuccessDialog = "[class='ChromeDialog-Dialog']";
const applePayBtn = "[alt='applePay']";

describe("Stripe Checkout Page - Pay with Card", () => {
  beforeEach(() => {
    cy.visit("https://checkout.stripe.dev/preview");
  });

  it("Verify Stripe Iframe Checkout Page", () => {
    /* Verify the checkout header */
    cy.verifyCheckoutHeader();
  });

  it("Verify the user is able to complete the payment", () => {
    cy.fillOutCreditCardForm({
      email: "test@email.com",
      number: "4242 4242 4242 4242",
      expiration: "10 / 25",
      code: "123",
      name: "Test",
      zipCode: "92612",
    });

    /* Verify the Modal Payment Success is displayed */
    cy.get(iframe)
      .iframe()
      .then((iframes) => {
        cy.wrap(iframes).find(paymentSuccessDialog).should("be.visible");
        cy.wrap(iframes).contains("h2", "Payment success").should("be.visible");
        cy.wrap(iframes)
          .contains(
            "h2",
            "After a successful payment, the customer returns to your website."
          )
          .should("be.visible");
        cy.wrap(iframes)
          .contains("button", "Restart demo")
          .should("be.visible");
        cy.wrap(iframes)
          .contains("button", "Explore the docs")
          .should("be.visible");
      });
  });

  it("Verify the user is able to complete the checkout only after adding all the payment details", () => {
    cy.get(iframe)
      .iframe()
      .then((iframes) => {
        /* Verify the Required Fields are highlighted if click on Pay button without filling the required details */
        cy.wrap(iframes).find(payBtn).should("be.visible").click();
        cy.wrap(iframes).contains(emptyFiledError, "Required").should("exist");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("exist");
        cy.wrap(iframes)
          .contains(requiredBillingNameError, "Required")
          .should("exist");

        /* Fill in the email - the Required email warning should not exist */
        cy.wrap(iframes)
          .find(email)
          .type("test@email.com")
          .should("have.value", "test@email.com");
        cy.wrap(iframes)
          .contains(emptyFiledError, "Required")
          .should("not.exist");
        cy.wrap(iframes).find(payBtn).should("be.visible").click();

        /* Fill in the Card Number - the Required card number warning should not exist */
        cy.wrap(iframes)
          .find(cardNumber)
          .type("4242424242424242")
          .should("have.value", "4242 4242 4242 4242");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");
        cy.wrap(iframes).find(payBtn).should("be.visible").click();

        /* Fill in the Card Expiration date */
        cy.wrap(iframes)
          .find(cardExpDate)
          .type("10/25")
          .should("have.value", "10 / 25");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");
        cy.wrap(iframes).find(payBtn).should("be.visible").click();

        /* Fill in the CVC */
        cy.wrap(iframes).find(cardCvs).type("123").should("have.value", "123");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");
        cy.wrap(iframes).find(payBtn).should("be.visible").click();

        /* Fill in the Name on the Card - the Name on the Card  should not exist */
        cy.wrap(iframes)
          .find(billingName)
          .type("Test")
          .should("have.value", "Test");
        cy.wrap(iframes)
          .contains(requiredBillingNameError, "Required")
          .should("not.exist");
        cy.wrap(iframes).find(payBtn).should("be.visible").click();

        /* Fill in the Zip code */
        cy.wrap(iframes)
          .find(zipCode)
          .type("92612")
          .should("have.value", "92612");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");
        cy.wrap(iframes).contains(payBtn, "Pay").should("be.visible").click();
        cy.wrap(iframes)
          .contains("span", "Processing")
          .should("have.attr", "aria-hidden", "false");
        cy.wrap(iframes).contains(payBtn, "Pay").should("not.exist");

        /* Verify the Modal Payment Success is displayed */
        cy.get(iframe)
          .iframe()
          .then((iframes) => {
            cy.wrap(iframes).find(paymentSuccessDialog).should("be.visible");
            cy.wrap(iframes)
              .contains("h2", "Payment success")
              .should("be.visible");
            cy.wrap(iframes)
              .contains(
                "h2",
                "After a successful payment, the customer returns to your website."
              )
              .should("be.visible");
            cy.wrap(iframes)
              .contains("button", "Restart demo")
              .should("be.visible");
            cy.wrap(iframes)
              .contains("button", "Explore the docs")
              .should("be.visible");
          });
      });
  });
});
