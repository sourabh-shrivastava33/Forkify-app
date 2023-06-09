import View from './view.js';
class SearchView extends View {
  _parentEL = document.querySelector('.search');
  getQuery() {
    const query = this._parentEL.querySelector('.search__field').value;

    this._clear();
    return query;
  }
  // clearing the input filed
  _clear() {
    this._parentEL.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this._parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
