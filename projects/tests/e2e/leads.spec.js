const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('should sign in a lead in the waiting list', async ({ page }) => {
  // Arrange
  await page.landing.visit();
  await page.landing.openLeadModal();

  // Act
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  await page.landing.submitLeadForm(leadName, leadEmail);

  // Assert
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await page.toast.Message(message);
});

test('should not sign in a lead with duplicated email', async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  // Create a lead directly via API to ensure it exists
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail,
    },
  });
  expect(newLead.ok()).toBeTruthy();

  // Arrange
  await page.landing.visit();
  await page.landing.openLeadModal();

  // Act
  await page.landing.submitLeadForm(leadName, leadEmail);

  // Assert
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
  await page.toast.Message(message);
});

test('should not sign in a lead with invalid email', async ({ page }) => {
  // Arrange
  await page.landing.visit();
  await page.landing.openLeadModal();

  // Act
  await page.landing.submitLeadForm('Nome Completo', 'email.exemplo.com');

  // Assert
  await page.landing.alertMessage("Email incorreto");
});

test('should not sign in a lead with empty name', async ({ page }) => {
  // Arrange
  await page.landing.visit();
  await page.landing.openLeadModal();

  // Act
  await page.landing.submitLeadForm('', 'email@exemplo.com');

  // Assert
  await page.landing.alertMessage("Campo obrigatório");
});

test('should not sign in a lead with empty email', async ({ page }) => {
  // Arrange
  await page.landing.visit();
  await page.landing.openLeadModal();

  // Act
  await page.landing.submitLeadForm('Nome Completo', '');

  // Assert
  await page.landing.alertMessage("Campo obrigatório");
});

test('should not sign in a lead without filling name and email', async ({ page }) => {
  // Arrange
  await page.landing.visit();
  await page.landing.openLeadModal();

  // Act
  await page.landing.submitLeadForm('', '');

  // Assert
  await page.landing.alertMessage(['Campo obrigatório', 'Campo obrigatório']);
});