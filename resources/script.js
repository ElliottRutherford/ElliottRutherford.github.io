const projectsScrollContainer = document.getElementById('projects-carousel-track');
const leftArrowButton = document.querySelector('#projects > div > button:first-of-type');
const rightArrowButton = document.querySelector('#projects > div > button:last-of-type');
const firstProjectCard = document.querySelector('#projects-carousel-track > div');

let projectCardWidth = 0;
let scrollAmount = 0;
let numOriginalProjects = 6;
let numClonedProjects = 3;

function calculateDimensionsAndSetInitialScroll() {
    if (firstProjectCard && projectsScrollContainer) {
        projectCardWidth = firstProjectCard.offsetWidth;
        scrollAmount = projectsScrollContainer.offsetWidth;

        const initialOriginalProject = projectsScrollContainer.children[numClonedProjects];
        if (initialOriginalProject) {
            projectsScrollContainer.scrollLeft = initialOriginalProject.offsetLeft;
        }
    }
}

function handleLoopingScroll() {
    const currentScrollLeft = projectsScrollContainer.scrollLeft;
    const totalOriginalContentWidth = numOriginalProjects * projectCardWidth + (numOriginalProjects * 20);
    const clonedStartWidth = numClonedProjects * projectCardWidth + (numClonedProjects * 20);

    if (currentScrollLeft >= clonedStartWidth + totalOriginalContentWidth) {
        projectsScrollContainer.style.scrollBehavior = 'auto';
        projectsScrollContainer.scrollLeft = clonedStartWidth;
        setTimeout(() => {
            projectsScrollContainer.style.scrollBehavior = 'smooth';
        }, 50);
    } else if (currentScrollLeft <= 0) {
        projectsScrollContainer.style.scrollBehavior = 'auto';
        projectsScrollContainer.scrollLeft = totalOriginalContentWidth;
        setTimeout(() => {
            projectsScrollContainer.style.scrollBehavior = 'smooth';
        }, 50);
    }
}

rightArrowButton.addEventListener('click', () => {
    projectsScrollContainer.scrollLeft += scrollAmount;
});

leftArrowButton.addEventListener('click', () => {
    projectsScrollContainer.scrollLeft -= scrollAmount;
});

projectsScrollContainer.addEventListener('scroll', handleLoopingScroll);

calculateDimensionsAndSetInitialScroll();

window.addEventListener('resize', calculateDimensionsAndSetInitialScroll);

projectsScrollContainer.style.scrollBehavior = 'smooth';