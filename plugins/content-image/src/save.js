/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
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
				{ attributes.section_image && (
					<img
						src={ attributes.section_image }
						alt={
							attributes.section_image_alt ||
							attributes.section_image_title
						}
						className={ attributes.section_image_class }
						style={ attributes.section_image_style }
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
							className={ attributes.col_class }
							style={ attributes.col_style }
							id={ attributes.col_id }
							data-aos={ attributes.col_data_aos }
							data-aos-delay={ attributes.col_data_aos_delay }
						>
							<InnerBlocks.Content />
						</div>
						<div
							className={ attributes.col_image_class }
							style={ attributes.col_image_style }
							id={ attributes.col_image_id }
							data-aos={ attributes.col_image_data_aos }
							data-aos-delay={
								attributes.col_image_data_aos_delay
							}
						>
							{ attributes.col_image && (
								<img
									src={ attributes.col_image }
									alt={
										attributes.col_image_alt ||
										attributes.col_image_title
									}
									className={ attributes.image_class }
									style={ attributes.image_style }
									id={ attributes.image_id }
								/>
							) }
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
