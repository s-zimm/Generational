const MAIN_IMG_TITLE = document.querySelector('[data-title-text]');
const MAIN_IMG_MEM = document.querySelector('[data-memory-text]');
const MAIN_IMG_BOOK = document.querySelector('[data-book-text]');
const SECTION_HEADING = document.querySelectorAll('[data-section-heading]');
const PROMPT_ELEMENT = document.querySelector('[data-prompt]');
const RIGHT_ARROW = document.querySelector('[data-arrow-right]');
const LEFT_ARROW = document.querySelector('[data-left-arrow]');
const NAV_ABOUT = document.querySelector('[data-nav-about]');
const NAV_EXAMPLES = document.querySelector('[data-nav-examples]');

const prompts =['Write about your favorite place in your home town.', 'What is the meaning of your name?', 'Write about your favorite memory with your sibling(s).', 'What was a major news event from the year you were born?', 'How did your parents meet?'];
let i = 0;

let bookAnimation = () => {
    MAIN_IMG_BOOK.classList.add('bookText');
    MAIN_IMG_BOOK.classList.remove('hidden');
};

let titleAnimation = () => {
    MAIN_IMG_TITLE.classList.add('generationalOnImage');
    MAIN_IMG_TITLE.classList.remove('hidden');
}

RIGHT_ARROW.addEventListener('click', () => {
    if (i !== prompts.length - 1) {
        i = i + 1;
    } else {
        i = 0
    }
    PROMPT_ELEMENT.textContent = prompts[i];
});

LEFT_ARROW.addEventListener('click', () => {
    if (i !== 0) {
        i = i - 1;
    } else {
        i = prompts.length - 1;
    }
    PROMPT_ELEMENT.textContent = prompts[i];
});


NAV_ABOUT.addEventListener('click', () => {
    document.querySelector('.about1').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

NAV_EXAMPLES.addEventListener('click', () => {
    document.querySelector('#example-prompts').scrollIntoView({ 
        behavior: 'smooth' 
    });
});


document.addEventListener('DOMContentLoaded', () => {
    PROMPT_ELEMENT.textContent = prompts[i];
    setTimeout(bookAnimation, 2000);
    setTimeout(titleAnimation, 4000);
});