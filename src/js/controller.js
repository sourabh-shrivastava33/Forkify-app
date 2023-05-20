import * as model from './model.js';
import { Modal_close_Sec } from './config.js';
import RecipeView from './views/recipeView.js';
import searchView from './views/searchControlView.js';
import ResultsView from './views/Results.js';
import Pagination from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import 'regenerator-runtime/runtime';
import 'core-js/stable';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    RecipeView.renderSpinner();
    ResultsView.update(model.getSearchResultsPage());
    // Rendring data of recipe on website
    // debugger;
    bookmarkView.update(model.state.bookMark);
    await model.loadRecipe(id);

    RecipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    RecipeView.renderError(`${err} 🚫🚫🚫`);
  }
};

const controlSearchRecipe = async function () {
  try {
    const query = searchView.getQuery();

    if (!query) return;
    ResultsView.renderSpinner();
    await model.getRecipeFromSearch(query);

    ResultsView.render(model.getSearchResultsPage());

    Pagination.render(model.state.search);
    // controlServins();
  } catch (err) {
    console.error(`${err} 🚫🚫`);
  }
};
const controlPagination = function (goto) {
  ResultsView.render(model.getSearchResultsPage(goto));

  Pagination.render(model.state.search);
};

const controlServings = function (newServing) {
  model.updateServigns(newServing);
  RecipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookMarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.deleteBookMark(model.state.recipe.id);
  }
  bookmarkView.render(model.state.bookMark);
  RecipeView.update(model.state.recipe);
};
const controlBookmarkRenderOnLoad = function () {
  bookmarkView.render(model.state.bookMark);
};

const controlRecipeData = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadNewRecipe(newRecipe);
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarkView.render(model.state.bookMark);
    // console.log(
    //   window.history.pushState(null, '', `#${model.state.recipe.id}`)
    // );

    setTimeout(function () {
      addRecipeView.toggelClass();
    }, Modal_close_Sec * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  addRecipeView.getFormData(controlRecipeData);
  bookmarkView.addHandlerRenderer(controlBookmarkRenderOnLoad);
  RecipeView.addHandlerRender(controlRecipe);
  RecipeView.addHandlerTOUpdateServings(controlServings);
  RecipeView.addHandlerToBookMark(controlBookmark);
  searchView.addHandlerSearch(controlSearchRecipe);
  paginationView.addHandlerPagination(controlPagination);
};
init();
