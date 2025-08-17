const { test } = require('../support')

const data = require('./../support/fixtures/movies.json');
const { executeQuery } = require('../support/database.js');

test('should add a new movie', async ({ page }) => {
  const movie = data.create;
  await executeQuery('DELETE FROM movies WHERE title = $1;', [movie.title]);

  // Arrange
  await page.login.doLogin('admin@zombieplus.com', 'pwd123');

  // Act
  await page.movies.createMovie(movie.title, movie.overview, movie.company, movie.release_year);

  // Assert
  await page.toast.Message('UhullCadastro realizado com sucesso!');
});

test('should not add a duplicated movie', async ({ page }) => {
  const movie = data.duplicated;

  // Arrange
  await page.login.doLogin('admin@zombieplus.com', 'pwd123');

  // Act
  await page.movies.createMovie(movie.title, movie.overview, movie.company, movie.release_year);

  // Assert
  await page.toast.Message('Este conteúdo já encontra-se cadastrado no catálogo');
});

test('should not add a new movie without filling the required fields', async ({ page }) => {
  // Arrange
  await page.login.doLogin('admin@zombieplus.com', 'pwd123');

  // Act
  await page.movies.openMovieRegisterForm();
  await page.movies.submitMovieForm();

  // Assert
  await page.alert.Message([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.'
  ]);
});