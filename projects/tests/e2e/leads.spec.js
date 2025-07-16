// @ts-check
const { test } = require('@playwright/test')
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
  await landingPage.submitLeadForm('Nome Completo', 'email@exemplo.com');

  // Assert
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
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