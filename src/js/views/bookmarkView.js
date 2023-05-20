import View from './view.js';
import Preview from './preview.js';
import icons from '../../img/icons.svg';

class BookMarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _ErrorMessage = 'No bookmarks yet, Find a new recipe and bookmark it ;)';

  _generateMarkup() {
    return this._data
      .map(function (bookMark) {
        return Preview.render(bookMark, false);
      })
      .join('');
  }

  addHandlerRenderer(handler) {
    window.addEventListener('load', handler);
  }
  // _generatePreview(result) {
  //   const id = window.location.hash.slice(1);
  //   return `<li class="preview ${
  //     result.id === id ? 'preview__link--active' : ''
  //   }">
  //   <a class="preview__link " href="#${result.id}">
  //     <figure class="preview__fig">
  //       <img src="${result.image}" alt="Test" />
  //     </figure>
  //     <div class="preview__data">
  //       <h4 class="preview__title">${result.title}</h4>
  //       <p class="preview__publisher">${result.publisher}</p>
  //       <div class="preview__user-generated">

  //       </div>
  //     </div>
  //   </a>
  // </li>`;
  // }
}

export default new BookMarkView();
