describe('template spec', () => {
    it('passes', () => {
      //Giriş
      cy.visit('https://app.tubegrow.com/#/sign-in')
      cy.get('#email').type('test@tubegrow.com')
      cy.get('#password').type('root')
      cy.get('#kt_sign_in_submit').click()
      //Giriş
      cy.wait(2000)
      cy.visit('https://app.tubegrow.com/#/tools/keyword-search')
      cy.wait(4000)
      cy.get('#keyword_new').type('makyaj')
      cy.get('.row > .btn').click()
      cy.wait(10000)
      cy.get(':nth-child(1) > .card > .card-body > :nth-child(2) > .col-4')
        .invoke('text')
        .then((text) => {
          const chatId = -1002023776112
          try {
            cy.log( text)
          } catch (error) {
            sendMessageToTelegram(`Hata`,error, chatId)
          }
        })
      cy.get(':nth-child(2) > .card > .card-body > :nth-child(2) > .col-4')
        .invoke('text')
        .then((text) => {
          try {
            cy.log('Makyaj', text)
          } catch (error) {
            sendMessageToTelegram(`Hata`,error, chatId)
          }
        })
        
    })
  })
  