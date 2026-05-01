/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log( 'Hello World! (from create-block-content-faqs block)' );
/* eslint-enable no-console */

let accordions = document.querySelectorAll( '.accordion' );
// SIMPLE ACCORDION
// for (let i = 0; i < accordions.length; ++i) {
//   accordions[i].addEventListener("click", function(){
//   (this).classList.toggle('open');
//   });
// }
function toggleAccordion() {
	accordionContent = this.querySelector( '.accordion-content' );
	accordionContentInner = this.querySelector( '.accordion-content-inner' );
	console.log( this );

	if ( this.classList.contains( 'open' ) ) {
		this.classList.remove( 'open' );
		accordionContent.style.height = `0px`;
		return;
	}

	// accordions.forEach(function (item) {
	//     item.classList.remove('open');
	// });

	this.classList.add( 'open' );
	accordionContent.style.height = `${ accordionContentInner.offsetHeight }px`;

	// console.log(accordionContentInner)
}

for ( let i = 0; i < accordions.length; ++i ) {
	accordions[ i ].addEventListener( 'click', toggleAccordion );
}
