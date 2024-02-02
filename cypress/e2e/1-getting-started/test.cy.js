describe('template spec', () => {
  it('passes', () => {
    // Giriş
    cy.visit('https://app.tubegrow.com/#/sign-in');
    cy.get('#email').type('test@tubegrow.com');
    cy.get('#password').type('root');
    cy.get('#kt_sign_in_submit').click();
    
    // Giriş sonrası bekleme
    cy.wait(2000);

    // Ana sayfaya gidip anahtar kelime araması yapma
    cy.visit('https://app.tubegrow.com/#/tools/keyword-search');
    cy.wait(10000);
    cy.get('#keyword_new').type('makyaj');
    cy.get('.row > .btn').click();
    cy.wait(10000);

    // chatId tanımlama
    const chatId = -1002023776112;

    // İlk kartın metnini al ve logla, hata durumunda telegrama mesaj gönder
    cy.get(':nth-child(1) > .card > .card-body > :nth-child(2) > .col-4')
      .invoke('text')
      .then((text) => {
        try {
          cy.log(text);
        } catch (error) {
          sendMessageToTelegram('Hata', error, chatId);
        }
      });

    // İkinci kartın metnini al ve logla, hata durumunda telegrama mesaj gönder
    cy.get(':nth-child(2) > .card > .card-body > :nth-child(2) > .col-4')
      .invoke('text')
      .then((text) => {
        try {
          cy.log('Makyaj', text);
        } catch (error) {
          sendMessageToTelegram('Hata', error, chatId);
        }
      });
  });
});

function sendMessageToTelegram(message, error, chatId) {
  const errorMessage = error ? error.message : '';
  const telegramApiUrl = `https://api.telegram.org/bot6932228424:AAF4BdZDRSTaVWefaDsbNUf5ykm6XRf9BpQ/sendMessage`;

  return fetch(telegramApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: `${message}\n${errorMessage}`,
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
