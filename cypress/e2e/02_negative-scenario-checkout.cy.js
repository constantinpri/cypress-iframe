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

describe("Stripe Checkout Page - Negative Scenarios - Pay with Card", () => {
  beforeEach(() => {
    cy.visit("https://checkout.stripe.dev/preview");
  });

  it("Verify the user is not able to complete the checkout without all the payment details", () => {
    cy.get(iframe)
      .iframe()
      .then((iframes) => {
        /* Verify the Required Fields are highlighted if click on Pay button without filling the required details */
        cy.wrap(iframes).find(payBtn).should("be.visible").click();
        cy.wrap(iframes)
          .contains(emptyFiledError, "Required")
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");

        cy.wrap(iframes)
          .find(email)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");

        cy.wrap(iframes)
          .find(cardNumber)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");

        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");

        cy.wrap(iframes)
          .find(cardExpDate)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");

        cy.wrap(iframes)
          .find(cardCvs)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");

        cy.wrap(iframes)
          .contains(requiredBillingNameError, "Required")
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");

        cy.wrap(iframes)
          .find(billingName)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");

        cy.wrap(iframes)
          .find(zipCode)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");

        cy.wrap(iframes)
          .contains("span", "Processing")
          .should("have.attr", "aria-hidden", "true");
      });
  });

  it("Verify the user is not able to complete the checkout without the email", () => {
    cy.get(iframe)
      .iframe()
      .then((iframes) => {
        /* Fill in the Card Number - the Required card number warning should not exist */
        cy.wrap(iframes)
          .find(cardNumber)
          .type("4242424242424242")
          .should("have.value", "4242 4242 4242 4242");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the Card Expiration date */
        cy.wrap(iframes)
          .find(cardExpDate)
          .type("10/25")
          .should("have.value", "10 / 25");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the CVC */
        cy.wrap(iframes).find(cardCvs).type("123").should("have.value", "123");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the Name on the Card - the Name on the Card  should not exist */
        cy.wrap(iframes)
          .find(billingName)
          .type("Test")
          .should("have.value", "Test");
        cy.wrap(iframes)
          .contains(requiredBillingNameError, "Required")
          .should("not.exist");

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
          .should("have.attr", "aria-hidden", "true");

        /* Email Field Required */
        cy.wrap(iframes)
          .contains(emptyFiledError, "Required")
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");

        cy.wrap(iframes)
          .find(email)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");
      });
  });

  it("Verify the user is not able to complete the checkout without the card number", () => {
    cy.get(iframe)
      .iframe()
      .then((iframes) => {
        /* Fill in the email - the Required email warning should not exist */
        cy.wrap(iframes)
          .find(email)
          .type("test@email.com")
          .should("have.value", "test@email.com");
        cy.wrap(iframes)
          .contains(emptyFiledError, "Required")
          .should("not.exist");
        /* Fill in the Card Expiration date */
        cy.wrap(iframes)
          .find(cardExpDate)
          .type("10/25")
          .should("have.value", "10 / 25");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the CVC */
        cy.wrap(iframes).find(cardCvs).type("123").should("have.value", "123");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the Name on the Card - the Name on the Card  should not exist */
        cy.wrap(iframes)
          .find(billingName)
          .type("Test")
          .should("have.value", "Test");
        cy.wrap(iframes)
          .contains(requiredBillingNameError, "Required")
          .should("not.exist");

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
          .should("have.attr", "aria-hidden", "true");

        /* Card Number Required */
        cy.wrap(iframes)
          .find(cardNumber)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");
      });
  });

  it("Verify the user is not able to complete the checkout without the card expiration date", () => {
    cy.get(iframe)
      .iframe()
      .then((iframes) => {
        /* Fill in the email - the Required email warning should not exist */
        cy.wrap(iframes)
          .find(email)
          .type("test@email.com")
          .should("have.value", "test@email.com");
        cy.wrap(iframes)
          .contains(emptyFiledError, "Required")
          .should("not.exist");

        /* Fill in the Card Number - the Required card number warning should not exist */
        cy.wrap(iframes)
          .find(cardNumber)
          .type("4242424242424242")
          .should("have.value", "4242 4242 4242 4242");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the CVC */
        cy.wrap(iframes).find(cardCvs).type("123").should("have.value", "123");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the Name on the Card - the Name on the Card  should not exist */
        cy.wrap(iframes)
          .find(billingName)
          .type("Test")
          .should("have.value", "Test");
        cy.wrap(iframes)
          .contains(requiredBillingNameError, "Required")
          .should("not.exist");

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
          .should("have.attr", "aria-hidden", "true");

        /* Expiration Date Required */
        cy.wrap(iframes)
          .find(cardExpDate)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");
      });
  });

  it("Verify the user is not able to complete the checkout without the card cvc", () => {
    cy.get(iframe)
      .iframe()
      .then((iframes) => {
        /* Fill in the email - the Required email warning should not exist */
        cy.wrap(iframes)
          .find(email)
          .type("test@email.com")
          .should("have.value", "test@email.com");
        cy.wrap(iframes)
          .contains(emptyFiledError, "Required")
          .should("not.exist");

        /* Fill in the Card Number - the Required card number warning should not exist */
        cy.wrap(iframes)
          .find(cardNumber)
          .type("4242424242424242")
          .should("have.value", "4242 4242 4242 4242");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the Card Expiration date */
        cy.wrap(iframes)
          .find(cardExpDate)
          .type("10/25")
          .should("have.value", "10 / 25");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the Name on the Card - the Name on the Card  should not exist */
        cy.wrap(iframes)
          .find(billingName)
          .type("Test")
          .should("have.value", "Test");
        cy.wrap(iframes)
          .contains(requiredBillingNameError, "Required")
          .should("not.exist");

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
          .should("have.attr", "aria-hidden", "true");

        /* CVC Required */
        cy.wrap(iframes)
          .find(cardCvs)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");
      });
  });

  it("Verify the user is not able to complete the checkout without the name on the card", () => {
    cy.get(iframe)
      .iframe()
      .then((iframes) => {
        /* Fill in the email - the Required email warning should not exist */
        cy.wrap(iframes)
          .find(email)
          .type("test@email.com")
          .should("have.value", "test@email.com");
        cy.wrap(iframes)
          .contains(emptyFiledError, "Required")
          .should("not.exist");

        /* Fill in the Card Number - the Required card number warning should not exist */
        cy.wrap(iframes)
          .find(cardNumber)
          .type("4242424242424242")
          .should("have.value", "4242 4242 4242 4242");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the Card Expiration date */
        cy.wrap(iframes)
          .find(cardExpDate)
          .type("10/25")
          .should("have.value", "10 / 25");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the CVC */
        cy.wrap(iframes).find(cardCvs).type("123").should("have.value", "123");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

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
          .should("have.attr", "aria-hidden", "true");

        /* Card name Required */
        cy.wrap(iframes)
          .contains(requiredBillingNameError, "Required")
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");

        cy.wrap(iframes)
          .find(billingName)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");
      });
  });

  it("Verify the user is not able to complete the checkout without the zip code", () => {
    cy.get(iframe)
      .iframe()
      .then((iframes) => {
        /* Fill in the email - the Required email warning should not exist */
        cy.wrap(iframes)
          .find(email)
          .type("test@email.com")
          .should("have.value", "test@email.com");
        cy.wrap(iframes)
          .contains(emptyFiledError, "Required")
          .should("not.exist");

        /* Fill in the Card Number - the Required card number warning should not exist */
        cy.wrap(iframes)
          .find(cardNumber)
          .type("4242424242424242")
          .should("have.value", "4242 4242 4242 4242");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the Card Expiration date */
        cy.wrap(iframes)
          .find(cardExpDate)
          .type("10/25")
          .should("have.value", "10 / 25");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the CVC */
        cy.wrap(iframes).find(cardCvs).type("123").should("have.value", "123");
        cy.wrap(iframes)
          .contains(requiredCardNumberError, "Required")
          .should("not.exist");

        /* Fill in the Name on the Card - the Name on the Card  should not exist */
        cy.wrap(iframes)
          .find(billingName)
          .type("Test")
          .should("have.value", "Test");
        cy.wrap(iframes)
          .contains(requiredBillingNameError, "Required")
          .should("not.exist");

        cy.wrap(iframes).contains(payBtn, "Pay").should("be.visible").click();
        cy.wrap(iframes)
          .contains("span", "Processing")
          .should("have.attr", "aria-hidden", "true");

        /* Zip Code Required */
        cy.wrap(iframes)
          .find(zipCode)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");
      });
  });

  it("Verify the user is not able to complete the checkout without a valid card number", () => {
    cy.get(iframe)
      .iframe()
      .then((iframes) => {
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
          .type("1234 5678 9765 4312")
          .should("have.value", "1234 5678 9765 4312");
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
          .should("have.attr", "aria-hidden", "true");
        cy.wrap(iframes).contains(payBtn, "Pay").should("be.visible");

        /* Your card number is invalid. */
        cy.wrap(iframes)
          .contains("span", "Your card number is invalid.")
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");
        cy.wrap(iframes)
          .find(cardNumber)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");
      });
  });

  it("Verify the user is not able to complete the checkout without a valid expiration date", () => {
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
          .type("10/20")
          .should("have.value", "10 / 20");
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
          .should("have.attr", "aria-hidden", "true");
        cy.wrap(iframes).contains(payBtn, "Pay").should("be.visible");

        /* Your card's expiration year is in the past.*/
        cy.wrap(iframes)
          .contains("span", "Your card's expiration year is in the past.")
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");
        cy.wrap(iframes)
          .find(cardExpDate)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");
      });
  });

  it("Verify the user is not able to complete the checkout without a valid email", () => {
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
          .type("testemail.com")
          .should("have.value", "testemail.com");
        cy.wrap(iframes)
          .contains(emptyFiledError, "Required")
          .should("not.exist");

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
          .should("have.attr", "aria-hidden", "true");
        cy.wrap(iframes).contains(payBtn, "Pay").should("be.visible");

        /* Your email is incomplete.*/
        cy.wrap(iframes)
          .contains("span", "Your email is incomplete.")
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");
        cy.wrap(iframes)
          .find(email)
          .should("exist")
          .and("have.css", "color", "rgb(220, 39, 39)");
      });
  });
});
