// @ts-check
const { test } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage');
const { MoviesPage } = require('../pages/MoviesPage');
const { Toast } = require('../pages/Components');

const data = require('./../support/fixtures/movies.json')

let loginPage;
let moviesPage;
let toast;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  moviesPage = new MoviesPage(page);
  toast = new Toast(page);
});

test('should add a new movie', async ({ page }) => {
  const movie = data.create;

  // Arrange
  await loginPage.visit();
  await loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123');
  await moviesPage.isLoggedIn();

  // Act
  await moviesPage.createMovie(movie.title, movie.overview, movie.company, movie.release_year);

  // Assert
  await toast.Message('UhullCadastro realizado com sucesso!');
});

test('should not add a duplicated movie', async ({ page }) => {
  const movie = data.duplicated;

  // Arrange
  await loginPage.visit();
  await loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123');
  await moviesPage.isLoggedIn();

  // Act
  await moviesPage.createMovie(movie.title, movie.overview, movie.company, movie.release_year);

  // Assert
  await toast.Message('Este conteúdo já encontra-se cadastrado no catálogo');
});