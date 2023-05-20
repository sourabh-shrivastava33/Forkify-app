import { API_URL, KEY, getResultPerPage } from './config.js';
import { GetAjax } from './helpers.js';
// import { getJson, sendJson } from './helpers.js';

export const state = {
  recipe: {},
  search: { query: '', results: [], curpage: 1, page: getResultPerPage },
  bookMark: [],
};
const createRecipeObject = function (data) {
  let { recipe } = data.data;
  return (state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  });
};

export const loadRecipe = async function (id) {
  try {
    // fetching/loading data of recipe
    const data = await GetAjax(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);
    // debugger;
    if (state.bookMark.some(bookmark => bookmark.id === state.recipe.id)) {
      state.recipe.bookMarked = true;
    } else {
      state.recipe.bookMarked = false;
    }
  } catch (err) {
    throw err;
  }
  // https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
};
export const getRecipeFromSearch = async function (query) {
  try {
    state.search.query = query;
    const data = await GetAjax(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    return state.results;
  } catch {
    throw err;
  }
};

export const getSearchResultsPage = function (page = 1) {
  state.search.curpage = page;
  const start = (page - 1) * state.search.page;
  const end = page * state.search.page;

  return state.search.results.slice(start, end);
};

export const updateServigns = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServing / state.recipe.servings);
  });
  state.recipe.servings = newServing;
};
const persistBookMark = function () {
  localStorage.setItem('booksmarks', JSON.stringify(state.bookMark));
};

export const addBookMark = function (recipe) {
  state.bookMark.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true;

  persistBookMark();
};
export const deleteBookMark = function (id) {
  const index = state.bookMark.findIndex(function (el) {
    return el.id === id;
  });

  state.bookMark.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookMarked = false;
  persistBookMark();
};

const init = function () {
  const storage = localStorage.getItem('booksmarks');

  if (!storage) return;
  state.bookMark = JSON.parse(storage);
};
init();

const clearBookMarks = function () {
  localStorage.clear();
};
// clearBookMarks();

export const uploadNewRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(',', ',').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format !Please use the correct format'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: newRecipe.cookingTime,
      servings: newRecipe.servings,
      ingredients,
    };

    const data = await GetAjax(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
    // setTimeout(function () {
    //   addRecipeView.renderError();
    // });
  } catch (error) {
    throw error;
  }
};
