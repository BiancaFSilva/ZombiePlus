const { test } = require('../support');

test('should log in using an admin account', async ({ page }) => {
  // Arrange
  await page.login.visit();

  // Act
  await page.login.submitLoginForm('admin@zombieplus.com', 'pwd123');

  // Assert
  await page.movies.isLoggedIn();
});

test('should not log in with invalid email', async ({ page }) => {
  // Arrange
  await page.login.visit();

  // Act
  await page.login.submitLoginForm('zombieplus.com', 'pwd123');

  // Assert
  await page.login.alertMessage('Email incorreto');
});

test('should not log in with invalid password', async ({ page }) => {
  // Arrange
  await page.login.visit();

  // Act
  await page.login.submitLoginForm('admin@zombieplus.com', 'abc123');

  // Assert
  await page.toast.Message("Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.");
});

test('should not log in with empty email', async ({ page }) => {
  // Arrange
  await page.login.visit();

  // Act
  await page.login.submitLoginForm('', 'pwd123');

  // Assert
  await page.login.alertMessage('Campo obrigatório');
});

test('should not log in with empty password', async ({ page }) => {
  // Arrange
  await page.login.visit();

  // Act
  await page.login.submitLoginForm('admin@zombieplus.com', '');

  // Assert
  await page.login.alertMessage('Campo obrigatório');
});

test('should not log in without filling email and password', async ({ page }) => {
  // Arrange
  await page.login.visit();

  // Act
  await page.login.submitLoginForm('', '');

  // Assert
  await page.login.alertMessage(['Campo obrigatório', 'Campo obrigatório']);
});