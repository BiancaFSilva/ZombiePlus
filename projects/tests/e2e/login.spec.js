// @ts-check
const { test } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage');
const { MoviesPage } = require('../pages/MoviesPage');
const { Toast } = require('../pages/Components');

let loginPage;
let moviesPage;
let toast;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  moviesPage = new MoviesPage(page);
  toast = new Toast(page);
});

test('should log in using an admin account', async ({ page }) => {
  // Arrange
  await loginPage.visit();

  // Act
  await loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123');

  // Assert
  await moviesPage.isLoggedIn();
});

test('should not log in with invalid email', async ({ page }) => {
  // Arrange
  await loginPage.visit();

  // Act
  await loginPage.submitLoginForm('zombieplus.com', 'pwd123');

  // Assert
  await loginPage.alertMessage('Email incorreto');
});

test('should not log in with invalid password', async ({ page }) => {
  // Arrange
  await loginPage.visit();

  // Act
  await loginPage.submitLoginForm('admin@zombieplus.com', 'abc123');

  // Assert
  await toast.Message("Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.");
});

test('should not log in with empty email', async ({ page }) => {
  // Arrange
  await loginPage.visit();

  // Act
  await loginPage.submitLoginForm('', 'pwd123');

  // Assert
  await loginPage.alertMessage('Campo obrigatório');
});

test('should not log in with empty password', async ({ page }) => {
  // Arrange
  await loginPage.visit();

  // Act
  await loginPage.submitLoginForm('admin@zombieplus.com', '');

  // Assert
  await loginPage.alertMessage('Campo obrigatório');
});

test('should not log in without filling email and password', async ({ page }) => {
  // Arrange
  await loginPage.visit();

  // Act
  await loginPage.submitLoginForm('', '');

  // Assert
  await loginPage.alertMessage(['Campo obrigatório', 'Campo obrigatório']);
});