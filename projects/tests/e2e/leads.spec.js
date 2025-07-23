// @ts-check
const { test, expect } = require('@playwright/test')
const { faker } = require('@faker-js/faker');
const { LandingPage } = require('../pages/LandingPage');
const { Toast } = require('../pages/Components');

let landingPage;
let toast;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
});

test('should sign in a lead in the waiting list', async ({ page }) => {
  // Arrange
  await landingPage.visit();
  await landingPage.openLeadModal();

  // Act
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  await landingPage.submitLeadForm(leadName, leadEmail);

  // Assert
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await toast.Message(message);
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
  await landingPage.visit();
  await landingPage.openLeadModal();

  // Act
  await landingPage.submitLeadForm(leadName, leadEmail);

  // Assert
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
  await toast.Message(message);
});

test('should not sign in a lead with invalid email', async ({ page }) => {
  // Arrange
  await landingPage.visit();
  await landingPage.openLeadModal();

  // Act
  await landingPage.submitLeadForm('Nome Completo', 'email.exemplo.com');

  // Assert
  await landingPage.alertMessage("Email incorreto");
});

test('should not sign in a lead with empty name', async ({ page }) => {
  // Arrange
  await landingPage.visit();
  await landingPage.openLeadModal();

  // Act
  await landingPage.submitLeadForm('', 'email@exemplo.com');

  // Assert
  await landingPage.alertMessage("Campo obrigatório");
});

test('should not sign in a lead with empty email', async ({ page }) => {
  // Arrange
  await landingPage.visit();
  await landingPage.openLeadModal();

  // Act
  await landingPage.submitLeadForm('Nome Completo', '');

  // Assert
  await landingPage.alertMessage("Campo obrigatório");
});

test('should not sign in a lead without filling name and email', async ({ page }) => {
  // Arrange
  await landingPage.visit();
  await landingPage.openLeadModal();

  // Act
  await landingPage.submitLeadForm('', '');

  // Assert
  await landingPage.alertMessage(['Campo obrigatório', 'Campo obrigatório']);
});