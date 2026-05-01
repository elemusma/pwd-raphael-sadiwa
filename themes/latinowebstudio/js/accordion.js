let expertWitnessTitle = document.querySelector('.accordion-nav.expert-witness');
let expertWitnessContent = document.querySelector('.expert-witness .accordion-nav-content');
let expertWitnessContentInner = document.querySelector('.expert-witness .accordion-nav-content-inner');

expertWitnessTitle.addEventListener('click',function() {
    if (this.classList.contains('open')) {
        this.classList.remove('open')
        expertWitnessContent.style.height = `0px`
        return;
    }
    this.classList.add('open');
    expertWitnessContent.style.height = `${expertWitnessContentInner.offsetHeight + 10}px`
});

let appliedResearchTitle = document.querySelector('.accordion-nav.applied-research');
let appliedResearchContent = document.querySelector('.applied-research .accordion-nav-content');
let appliedResearchContentInner = document.querySelector('.applied-research .accordion-nav-content-inner');

appliedResearchTitle.addEventListener('click',function() {
    if (this.classList.contains('open')) {
        this.classList.remove('open')
        appliedResearchContent.style.height = `0px`
        return;
    }
    this.classList.add('open');
    appliedResearchContent.style.height = `${appliedResearchContentInner.offsetHeight + 10}px`
});

// function toggleAccordion() {
//     accordionContent = this.querySelector('.accordion-content')
//     accordionContentInner = this.querySelector('.accordion-content-inner')
//     console.log(this);

//     if (this.classList.contains('open')) {
//         this.classList.remove('open')
//         accordionContent.style.height = `0px`
//         return;
//     }

//     this.classList.add('open');
//     accordionContent.style.height = `${accordionContentInner.offsetHeight}px`

// }

// for (let i = 0; i < accordions.length; ++i) {
//     accordions[i].addEventListener("click", toggleAccordion);
// }