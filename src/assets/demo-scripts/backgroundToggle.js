export function initBackgroundToggle() {
    const contrastButton = document.getElementById('contrast');
    const sectionElements = document.querySelectorAll('section');

    let state = {
        active: 0,
    };

    let bgProps = [
        'none',
        'bg--primary-base',
        'bg--primary-light-1',
        'bg--primary-light-2',
        'bg--primary-light-3',
        'bg--primary-dark-1',
        'bg--primary-dark-2',
        'bg--secondary-base',
        'bg--secondary-light-1',
        'bg--secondary-light-2',
        'bg--secondary-light-3',
        'bg--secondary-dark-1',
        'bg--secondary-dark-2',
        'bg--tertiary-base',
        'bg--tertiary-light-1',
        'bg--tertiary-light-2',
        'bg--tertiary-dark-1',
        'bg--tertiary-dark-2',
        'bg--error-background',
        'bg--success-background',
        'bg--warning-background',
        'bg--info-background',
    ];

    for (let i = 0; i < sectionElements.length; i++) {
        sectionElements[i].classList.add(bgProps[state.active]);
    }

    contrastButton.addEventListener('click', (e) => {
        let prevActive = state.active;
        state.active = state.active < bgProps.length - 1 ? state.active + 1 : 0;

        for (let i = 0; i < sectionElements.length; i++) {
            if (sectionElements[i].classList.length !== 0) {
                sectionElements[i].classList.replace(bgProps[prevActive], bgProps[state.active]);
            } else {
                sectionElements[i].classList.add(bgProps[state.active]);
            }
        }
    });
}
