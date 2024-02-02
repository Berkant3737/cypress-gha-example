describe('template spec', () => {
    it('passes', () => {
      cy.visit('https://app.tubegrow.com/#/sign-in')
      cy.get('#email').type('test@tubegrow.com')
      cy.get('#password').type('root')
      cy.get('#kt_sign_in_submit').click()
  
      cy.wait(7000)
      cy.get('.multiselect-input').click()
      cy.get('.multiselect-options #Hepsiburada').click()
      cy.wait(7000)
      cy.get('.multiselect-input').click()
      cy.get('.multiselect-options #Hepsiburada').click()
      cy.get('.symbol-100px img')
        .should('exist')
        .then(() => {
          const chatId = -1002023776112
          try {
            cy.log('test')
          } catch (error) {
            sendMessageToTelegram('Kanal resmi yüklenmedi', error, chatId)
          }
        })
      cy.get('div.align-items-center > .text-gray-800')
        .invoke('text')
        .then((subscribersText) => {
          const chatId = -1002023776112
          try {
            cy.log(`Kanal ismi başarıyla yüklendi.Kanal ismi: ${subscribersText}`)
          } catch (error) {
            sendMessageToTelegram('Kanal ismi yüklenmedi', error, chatId)
          }
        })
      cy.get('.mb-5 > .text-primary').click()
      cy.get('#channelname').type('CNN')
      cy.wait(1000)
      cy.get('.row > .justify-content-center > :nth-child(2)').click()
      cy.wait(2000)
      cy.get('.btn-dark').click()
      cy.wait(7000)
      cy.get('.multiselect-input').click()
      cy.wait(3000)
  
      //Kanal eklendikten sonra accordion kontrolü
      cy.get('.multiselect-options #CNN')
        .click()
        .invoke('text')
        .then((subscribersText) => {
          const chatId = -1002023776112
          try {
            cy.log(`Kanal ismi başarıyla yüklendi.Kanal ismi: ${subscribersText}`)
          } catch (error) {
            sendMessageToTelegram('Kanal ismi yüklenmedi', error, chatId)
          }
        })
      cy.get('.symbol-100px img')
        .should('exist')
        .then(() => {
          const chatId = -1002023776112
          try {
            cy.log('test')
          } catch (error) {
            sendMessageToTelegram('Kanal resmi yüklenmedi', error, chatId)
          }
        })
      cy.get('div.align-items-center > .text-gray-800')
        .invoke('text')
        .then((subscribersText) => {
          const chatId = -1002023776112
          try {
            cy.log(`Kanal ismi başarıyla yüklendi.Kanal ismi: ${subscribersText}`)
          } catch (error) {
            sendMessageToTelegram('Kanal ismi yüklenmedi', error, chatId)
          }
        })
      //Kanal eklendikten sonra accordion kontrolü
  
      //Kanal Silme
      cy.get('.multiselect-input').click()
      cy.get(
        ':nth-child(4) > .channel-dropdown-item > .trash-element > img',
      ).click()
    })
  })
  
  function sendMessageToTelegram(message, error, chatId) {
    const telegramApiUrl = `https://api.telegram.org/bot6932228424:AAF4BdZDRSTaVWefaDsbNUf5ykm6XRf9BpQ/sendMessage`
  
    // Cypress'te bekleme yap
    cy.wait(0).then(() => {
      // Fetch işlemi Cypress bekleme mekanizmasına uyacak şekilde yapılıyor
      return fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP hata: ${response.status}`)
          }
  
          console.log('Mesaj başarıyla gönderildi.')
        })
        .catch((error) => {
          console.error('Mesaj gönderme hatası:', error.message)
        })
    })
  }
  