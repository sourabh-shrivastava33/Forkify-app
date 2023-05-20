import View from './view';
import Preview from './preview';
import icons from '../../img/icons.svg';
class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _ErrorMessage = 'No result found of that query, Please try another one';

  _generateMarkup() {
    return this._data
      .map(function (bookMark) {
        return Preview.render(bookMark, false);
      })
      .join('');
  }
  // }
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

export default new ResultsView();
