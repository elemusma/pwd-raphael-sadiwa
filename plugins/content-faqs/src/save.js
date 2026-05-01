/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();
	return (
		<div { ...blockProps }>
			<section
				className={ `${ attributes.section_class }` }
				style={ `${ attributes.section_style }` }
				id={ attributes.section_id }
			>
				{ /* <div className="column-wrapper"> */ }
				{ attributes.section_image && (
					<img
						src={ attributes.section_image }
						alt={ attributes.section_image_alt }
						className={ `${ attributes.section_image_class }` }
						style={ `${ attributes.section_image_style }` }
					/>
				) }

				<RawHTML>{ attributes.section_block }</RawHTML>

				<div
					className={ attributes.container_class }
					style={ attributes.container_style }
					id={ attributes.container_id }
				>
					<div
						className={ attributes.row_class }
						style={ attributes.row_style }
						id={ attributes.row_id }
					>
						<div
							className={ attributes.column_class }
							style={ attributes.column_style }
							id={ attributes.column_id }
						>
							{ attributes.faqs.map( ( faq, index ) => {
								return (
									<div
										className={ ` ${ faq.col_class }` }
										style={ `${ faq.col_style }` }
										data-aos={ faq.data_aos }
										data-aos-delay={ faq.data_aos_delay }
									>
									<div
										className={ ` ${ faq.col_inner_class }` }
										style={ `${ faq.col_inner_style }` }
									>
										<div
											className="position-absolute chevron"
											style={ {} }
										>
											<svg
												id="Layer_2"
												data-name="Layer 2"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 168.38 321.74"
											>
												<defs>
													<style>
														.cls-1.chevron-right{ ' ' }
														{ {
															strokeWidth: '0px',
														} }
													</style>
												</defs>
												<g
													id="Layer_1-2"
													data-name="Layer 1"
												>
													<g>
														<polygon
															className="chevron-right"
															style={ {
																strokeWidth:
																	'0px',
																	fill:'black'
															} }
															points=".5 1.17 167.65 160.87 .5 320.57 .5 1.17"
														/>
														<path
															className="chevron-right"
															style={ {
																strokeWidth:
																	'0px',
																	fill:'black'
															} }
															d="M1,2.34l165.93,158.53L1,319.4V2.34M0,0v321.74l168.38-160.87L0,0h0Z"
														/>
													</g>
												</g>
											</svg>
										</div>
										<span
											className={ `button` }
											style={ { cursor: 'pointer' } }
										>
											{ faq.title }
										</span>
										<div className={ `accordion-content` }>
											<div
												className={ `accordion-content-inner` }
											>
												<p style={ { margin: '0px' } }>
													<RichText.Content
														value={ faq.content }
													/>
												</p>
											</div>
										</div>
									</div> {/* faq col inner class */ }
									</div> /* faq col class */ 
								);
							} ) }
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
