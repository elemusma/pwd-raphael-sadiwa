/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

/**
 * Helper function to convert inline style strings to objects
 */
const parseInlineStyles = ( styleString ) => {
	if ( ! styleString ) return {};
	const styles = {};
	styleString.split( ';' ).forEach( ( style ) => {
		const [ key, value ] = style.split( ':' ).map( ( s ) => s.trim() );
		if ( key && value ) {
			const camelKey = key.replace( /-([a-z])/g, ( g ) =>
				g[ 1 ].toUpperCase()
			);
			styles[ camelKey ] = value;
		}
	} );
	return styles;
};

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
						alt={
							attributes.section_image_alt ||
							attributes.section_image_title
						}
						className={ `${ attributes.section_image_class }` }
						style={ `${ attributes.section_image_style }` }
						data-aos={ attributes.section_image_data_aos }
						data-aos-delay={
							attributes.section_image_data_aos_delay
						}
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
						{ attributes.show_column && (
							<div
								className={ attributes.col_class }
								style={ attributes.col_style }
								id={ attributes.col_id }
								data-aos={ attributes.col_data_aos }
								data-aos-delay={ attributes.col_data_aos_delay }
							>
								<InnerBlocks.Content />
							</div>
						) }
						{ /** end of col */ }
						<div
							className={ attributes.columns_class }
							style={ attributes.columns_style }
							id={ attributes.columns_id }
						>
							{ attributes.columns.map( ( column, index ) => {
								const TitleTag = column.title_tag || 'h3';

								const titleContent =
									column.title || column.content ? (
										<div
											className={ `${ column.content_only_class }` }
											style={ {
												...parseInlineStyles(
													column.content_only_style
												),
											} }
										>
											{ column.desc_position === 'above' ? (
												<>
													<p
														className={ column.content_class }
														style={ {
															...parseInlineStyles( column.content_style ),
														} }
													>
														<RichText.Content value={ column.content } />
													</p>
													{ React.createElement(
														TitleTag,
														{
															className: `${ column.title_class }`,
															style: {
																...parseInlineStyles( column.title_style ),
															},
														},
														<RichText.Content value={ column.title } />
													) }
												</>
											) : (
												<>
													{ React.createElement(
														TitleTag,
														{
															className: `${ column.title_class }`,
															style: {
																...parseInlineStyles( column.title_style ),
															},
														},
														<RichText.Content value={ column.title } />
													) }
													<p
														className={ column.content_class }
														style={ {
															...parseInlineStyles( column.content_style ),
														} }
													>
														<RichText.Content value={ column.content } />
													</p>
												</>
											) }
										</div>
									) : null;

								const columnContent = (
    <div
        className={ `${ column.inner_col_class }` }
        style={ `${ column.inner_col_style }` }
        data-aos={ column.data_aos }
        data-aos-delay={ column.data_aos_delay }
    >
        { column.img_position === 'below' ? (
            <>
                { column.code_block_position === 'above' ? (
                    <>
                        { column.code_block && <RawHTML>{ column.code_block }</RawHTML> }
                        { titleContent }
                    </>
                ) : (
                    <>
                        { titleContent }
                        { column.code_block && <RawHTML>{ column.code_block }</RawHTML> }
                    </>
                ) }
                { column.img_type !== 'gallery' ? (
                    column.img && (
                        <img src={ column.img } alt={ column.img_alt || column.img_title }
                            className={ column.img_class } style={ column.img_style } />
                    )
                ) : (
                    <div className={ `${ column.media_class }` } style={ column.media_style }>
                        { column.img_gallery && column.img_gallery.length > 0 &&
                            column.img_gallery.map( ( img, i ) => (
                                <a key={ i } href={ img.url } data-lightbox={ column.media_lightbox }>
                                    <img src={ img.url } alt={ img.alt || img.title }
                                        className={ column.img_class } style={ column.img_style } />
                                </a>
                            ) ) }
                    </div>
                ) }
            </>
        ) : (
            <>
                { column.img_type !== 'gallery' ? (
                    column.img && (
                        <img src={ column.img } alt={ column.img_alt || column.img_title }
                            className={ column.img_class } style={ column.img_style } />
                    )
                ) : (
                    <div className={ `${ column.media_class }` } style={ column.media_style }>
                        { column.img_gallery && column.img_gallery.length > 0 &&
                            column.img_gallery.map( ( img, i ) => (
                                <a key={ i } href={ img.url } data-lightbox={ column.media_lightbox }>
                                    <img src={ img.url } alt={ img.alt || img.title }
                                        className={ column.img_class } style={ column.img_style } />
                                </a>
                            ) ) }
                    </div>
                ) }
                { column.code_block_position === 'above' ? (
                    <>
                        { column.code_block && <RawHTML>{ column.code_block }</RawHTML> }
                        { titleContent }
                    </>
                ) : (
                    <>
                        { titleContent }
                        { column.code_block && <RawHTML>{ column.code_block }</RawHTML> }
                    </>
                ) }
            </>
        ) }
    </div>
);

								if ( column.col_link ) {
									return (
										<a
											href={ column.col_link }
											key={ index }
											className={ column.col_class }
											style={ column.col_style }
										>
											{ columnContent }
										</a>
									);
								}

								return (
									<div
										key={ index }
										className={ column.col_class }
										style={ column.col_style }
									>
										{ columnContent }
									</div>
								);
							} ) }
						</div>{ ' ' }
						{ /** end of columns */ }
					</div>{ ' ' }
					{ /** end of row */ }
				</div>
			</section>
		</div>
	);
}