describe("template spec", () => {
  it("passes", () => {
    //Giriş
    cy.visit("https://app.tubegrow.com/#/sign-in");
    cy.get("#email").type("test@tubegrow.com");
    cy.get("#password").type("root");
    cy.get("#kt_sign_in_submit").click();
    //Giriş
    cy.get("div.align-items-center > .text-gray-800")
      .invoke("text")
      .then((text) => {
        const chatId = -1002023776112;
        try {
          cy.log(text);
        } catch (error) {
          sendMessageToTelegram(`Hata`, error, chatId);
        }
      });
  });
});
