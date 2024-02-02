describe('template spec', () => {
    it('passes', () => {
      cy.visit('https://app.tubegrow.com/#/sign-in')
        .get('#email').type('test@tubegrow.com')
        .get('#password').type('root')
        .get('#kt_sign_in_submit').click();
  
      cy.visit('https://app.tubegrow.com/#/tools/video-inspiration');
  
      // API isteğini yap
      cy.get('#keyword_new').should('exist').type('makyaj')
        .get('.row > .btn').click();
  
      cy.intercept({
        method: 'GET',
        url: 'https://api.tubegrow.com:3030/api/getengaged/UCkLXELm63_pH7L-r-548kig',
      }).as('apiRequest');
  
      cy.wait('@apiRequest').then((interception) => {
        const chatId = -1002023776112;
  
        if (interception.response.statusCode === 200) {
          cy.log('Datalar geldi');
        } else {
          // Hata durumunda Telegram'a mesaj gönder
          const errorMessage = 'Datalar gelmedi';
          sendMessageToTelegram(errorMessage, chatId);
  
          // Cypress testini başarısız yap
          throw new Error(errorMessage);
        }
      });
    });
  });
  
  function sendMessageToTelegram(message, chatId) {
    const telegramApiUrl = `https://api.telegram.org/bot6932228424:AAF4BdZDRSTaVWefaDsbNUf5ykm6XRf9BpQ/sendMessage`;
  
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
          throw new Error(`HTTP hata: ${response.status}`);
        }
  
        console.log('Mesaj başarıyla gönderildi.');
      })
      .catch((error) => {
        console.error('Mesaj gönderme hatası:', error.message);
      });
  }
  