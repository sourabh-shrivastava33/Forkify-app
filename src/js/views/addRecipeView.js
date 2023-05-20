import View from './view';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  btnClose = document.querySelector('.btn--close-modal');
  btnOpen = document.querySelector('.nav__btn--add-recipe');
  _message = 'File successfully uploaded';

  constructor() {
    super();
    this.openUploadForm();
    this.closeUploadForm();
  }
  toggelClass() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  openUploadForm() {
    this.btnOpen.addEventListener('click', this.toggelClass.bind(this));
  }

  closeUploadForm() {
    this.btnClose.addEventListener('click', this.toggelClass.bind(this));
    this._overlay.addEventListener('click', this.toggelClass.bind(this));
  }

  getFormData(handler) {
    console.log(handler);
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
      // handler(data);
    });
  }
}

export default new AddRecipeView();
