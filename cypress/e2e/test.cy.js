describe('template spec', () => {
    it('passes', () => {
      cy.visit('https://app.tubegrow.com/#/sign-in')
      cy.get('#email').type('test@tubegrow.com')
      cy.get('#password').type('root')
      cy.get('#kt_sign_in_submit').click()
      cy.wait(2000)
      cy.visit('https://app.tubegrow.com/#/tools/video-inspiration')
      cy.wait(4000)
      // API isteğini yap
      cy.get('#keyword_new').type('makyaj')
      cy.get('.row > .btn').click()
      cy.request({
        method: 'GET',
        url: 'https://api.tubegrow.com:3030/api/getengaged/UCkLXELm63_pH7L-r-548kig',
      }).then((response) => {
        const chatId = -1002023776112
        if (response.status === 200) {
          cy.log('Datalar geldi ')
        } else {
          sendMessageToTelegram('Datalar gelmedi', error, chatId)
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
  