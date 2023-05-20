import View from './view';
import icons from '../../img/icons.svg';

class Pagination extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    if (this._data.results.length === 0) return (this._parentEl.innerHTML = '');

    const curPage = this._data.curpage;
    const totalPage = Math.ceil(this._data.results.length / this._data.page);

    // console.log(this._data.results);
    // we are in first page and have more than one page
    if (curPage === 1 && totalPage > 1) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // we are in last page
    if (curPage === totalPage && totalPage > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page  ${curPage - 1}</span>
    </button>`;
    }
    // we are in other page
    if (curPage < totalPage) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page  ${curPage - 1}</span>
    </button>
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // query have only one page
    if (totalPage === 1) {
      return '';
    }
  }

  addHandlerPagination(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTO = +btn.dataset.goto;
      console.log(goTO);
      handler(goTO);
    });
  }
}

export default new Pagination();
