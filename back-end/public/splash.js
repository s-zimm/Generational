const MAIN_IMG_TITLE = document.querySelector('[data-title-text]');
const MAIN_IMG_MEM = document.querySelector('[data-memory-text]');
const MAIN_IMG_BOOK = document.querySelector('[data-book-text]');

let bookAnimation = () => {
    MAIN_IMG_BOOK.classList.add('bookText');
    MAIN_IMG_BOOK.classList.remove('hidden');
};

let titleAnimation = () => {
    MAIN_IMG_TITLE.classList.add('generationalOnImage');
    MAIN_IMG_TITLE.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(bookAnimation, 2000);
    setTimeout(titleAnimation, 4000);
})