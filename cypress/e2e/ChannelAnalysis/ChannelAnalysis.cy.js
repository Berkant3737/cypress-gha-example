describe('template spec', () => {
    it('passes', () => {
      cy.visit('https://app.tubegrow.com/#/sign-in')
      cy.get('#email').type('test@tubegrow.com')
      cy.get('#password').type('root')
      cy.get('#kt_sign_in_submit').click()
      cy.wait(5000)
      cy.scrollTo(0,2000)
      cy.get(':nth-child(3) > .row > :nth-child(1) > .card > .card-body').should(
        'exist',
      )
  
      cy.get(':nth-child(3) > .row > :nth-child(1) > .card > .card-body').then(
        () => {
          try {
            cy.log(`Grafikler başarıyla yüklendi`)
          } catch (error) {
            const chatId = -1002023776112
            sendMessageToTelegram('Grafikler yüklenmedi', error, chatId)
          }
        },
      )
      cy.get(':nth-child(1) > .card > .card-header > .card-title > .card-label')
        .invoke('text')
        .then((subscribersText) => {
          const chatId = -1002023776112
          try {
            cy.log(`Grafik başlığı ${subscribersText}`)
          } catch (error) {
            sendMessageToTelegram('Grafik başlığı yüklenmedi', error, chatId)
          }
        })
      //Grafik 2
      cy.get(':nth-child(3) > .row > :nth-child(2) > .card > .card-body').should(
        'exist',
      )
      cy.get(':nth-child(2) > .card > .card-header > .card-title > .card-label')
        .invoke('text')
        .then((subscribersText) => {
          const chatId = -1002023776112
          try {
            cy.log(`Grafik başlığı ${subscribersText}`)
          } catch (error) {
            sendMessageToTelegram('Grafik başlığı yüklenmedi', error, chatId)
          }
        })
    })
  })
  
  function sendMessageToTelegram(message, chatId) {
    const telegramApiUrl = `https://api.telegram.org/bot6932228424:AAF4BdZDRSTaVWefaDsbNUf5ykm6XRf9BpQ/sendMessage`
  
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
  }
  