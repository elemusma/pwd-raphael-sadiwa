/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InspectorControls,
	useBlockProps,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	__experimentalInputControl as InputControl,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		section_style,
		section_class,
		section_id,
		section_image,
		section_image_class,
		section_image_style,
		section_image_alt,
		section_block,
		container_style,
		container_class,
		container_id,
		row_style,
		row_class,
		row_id,
		col_style,
		col_class,
		col_id,
		col_image,
		col_image_style,
		col_image_class,
		col_image_id,
		image_style,
		image_class,
		image_id,
		gallery_images,
		gallery_columns,
		gallery_image_count,
		gallery_columns_style,
		gallery_images_lightbox,
		gallery_captions_yes_no,
		gallery_link_style,
		gallery_link_class
	} = attributes;

	const [ value, setValue ] = useState( '' );

	// Utility function to set default values
	const utilityFunction = () => ( {
		col_image_style: '',
		col_image_class: '',
		col_image_id: '',
		gallery_captions_yes_no: 'no',
	} );

	// Apply default values on mount if not already set
	useEffect( () => {
		const updates = {};
		let needsUpdate = false;

		if ( typeof col_image_style === 'undefined' ) {
			updates.col_image_style = '';
			needsUpdate = true;
		}

		if ( typeof gallery_captions_yes_no === 'undefined' ) {
			updates.gallery_captions_yes_no = 'no';
			needsUpdate = true;
		}

		if ( needsUpdate ) {
			setAttributes( updates );
		}
	}, [] );

	const onSelectImages = async ( newImages ) => {
		const updatedImages = await Promise.all(
			newImages.map( async ( image ) => {
				try {
					const fullImage = await apiFetch( {
						path: `/wp/v2/media/${ image.id }`,
					} );

					return {
						id: fullImage.id,
						url: fullImage.source_url,
						alt: fullImage.alt_text || '',
						title: fullImage.title?.rendered || '',
						caption: fullImage.caption?.rendered || '',
					};
				} catch ( error ) {
					console.error(
						`Failed to fetch media for ID ${ image.id }:`,
						error
					);
					// Fallback to basic image if fetch fails
					return {
						id: image.id,
						url: image.url,
						alt: image.alt || '',
						title: '',
						caption: '',
					};
				}
			} )
		);

		setAttributes( { gallery_images: updatedImages } );
	};

	console.log( gallery_images );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Section' ) } initialOpen={ false }>
					<InputControl
						label="Section Style"
						value={ section_style }
						onChange={ ( nextValue ) =>
							setAttributes( { section_style: nextValue } )
						}
					/>
					<InputControl
						label="Section Class"
						value={ section_class }
						onChange={ ( nextValue ) =>
							setAttributes( { section_class: nextValue } )
						}
					/>
					<InputControl
						label="Section ID"
						value={ section_id }
						onChange={ ( nextValue ) =>
							setAttributes( { section_id: nextValue } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Background Image' ) }
					initialOpen={ false }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									section_image: media.url,
									section_image_alt: media.alt,
									section_image_title:
										media.title?.rendered ||
										media.title ||
										'',
								} )
							}
							type="image"
							allowedTypes={ [ 'image' ] }
							value={ section_image }
							render={ ( { open } ) => (
								<div>
									{ section_image && (
										<>
											<Button
												isLink
												isDestructive
												onClick={ () =>
													setAttributes( {
														section_image: '',
														section_image_alt: '',
														section_image_title: '',
													} )
												}
											>
												{ __( 'Remove Section Image' ) }
											</Button>
											<img
												src={ section_image }
												alt={
													section_image_alt ||
													section_image_title
												}
												style={ { maxWidth: '100%' } }
											/>
											{ /* {section_image_alt && ( */ }
											<p>
												{ __( 'Alt Text:' ) }{ ' ' }
												{ section_image_alt ||
													section_image_title }
											</p>
											{ /* // )} */ }
										</>
									) }
									<Button
										onClick={ open }
										icon="upload"
										className="editor-media-placeholder__button is-button is-default is-large"
									>
										{ __( 'Select Section Image' ) }
									</Button>
								</div>
							) }
						/>
					</MediaUploadCheck>

					<InputControl
						label="Background Image Class"
						value={ section_image_class }
						onChange={ ( nextValue ) =>
							setAttributes( { section_image_class: nextValue } )
						}
					/>
					<InputControl
						label="Background Image Style"
						value={ section_image_style }
						onChange={ ( nextValue ) =>
							setAttributes( { section_image_style: nextValue } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Code Block' ) } initialOpen={ false }>
					<label style={ { lineHeight: '2' } }>Code Block</label>
					<textarea
						id="sectionStyleTextarea"
						value={ attributes.section_block }
						onChange={ ( event ) =>
							setAttributes( {
								section_block: event.target.value,
							} )
						}
						placeholder="Enter section block here"
						style={ { width: '100%', height: '100px' } }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Container' ) } initialOpen={ false }>
					<InputControl
						label="Container Section Style"
						value={ container_style }
						onChange={ ( nextValue ) =>
							setAttributes( { container_style: nextValue } )
						}
					/>
					<InputControl
						label="Container Section Class"
						value={ container_class }
						onChange={ ( nextValue ) =>
							setAttributes( { container_class: nextValue } )
						}
					/>
					<InputControl
						label="Container Section ID"
						value={ container_id }
						onChange={ ( nextValue ) =>
							setAttributes( { container_id: nextValue } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Row' ) } initialOpen={ false }>
					<InputControl
						label="Row Style"
						value={ row_style }
						onChange={ ( nextValue ) =>
							setAttributes( { row_style: nextValue } )
						}
					/>
					<InputControl
						label="Row Class"
						value={ row_class }
						onChange={ ( nextValue ) =>
							setAttributes( { row_class: nextValue } )
						}
					/>
					<InputControl
						label="Row ID"
						value={ row_id }
						onChange={ ( nextValue ) =>
							setAttributes( { row_id: nextValue } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Column' ) } initialOpen={ false }>
					<InputControl
						label="Column Style"
						value={ col_style }
						onChange={ ( nextValue ) =>
							setAttributes( { col_style: nextValue } )
						}
					/>
					<InputControl
						label="Column Class"
						value={ col_class }
						onChange={ ( nextValue ) =>
							setAttributes( { col_class: nextValue } )
						}
					/>
					<InputControl
						label="Column ID"
						value={ col_id }
						onChange={ ( nextValue ) =>
							setAttributes( { col_id: nextValue } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Gallery Column Settings' ) }
					initialOpen={ false }
				>
					<InputControl
						label="Column Image Class"
						value={ col_image_class }
						onChange={ ( nextValue ) =>
							setAttributes( { col_image_class: nextValue } )
						}
					/>
					<InputControl
						label="Column Image Style"
						value={ col_image_style || 'w-100 h-auto' }
						onChange={ ( nextValue ) =>
							setAttributes( { col_image_style: nextValue } )
						}
					/>
					<InputControl
						label="Column Image ID"
						value={ col_image_id }
						onChange={ ( nextValue ) =>
							setAttributes( { col_image_id: nextValue } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Gallery Images' ) }
					initialOpen={ false }
				>
					<InputControl
						label="Load More Image Count"
						value={ gallery_image_count }
						onChange={ ( nextValue ) =>
							setAttributes( {
								gallery_image_count: Number( nextValue ),
							} )
						}
					/>

					<SelectControl
						label="Add Captions"
						value={ gallery_captions_yes_no || 'no' }
						options={ [
							{ label: 'Yes', value: 'yes' },
							{ label: 'No', value: 'no' },
						] }
						onChange={ ( nextValue ) =>
							setAttributes( {
								gallery_captions_yes_no: nextValue,
							} )
						}
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImages }
							type="image"
							multiple
							gallery
							value={ gallery_images.map( ( { id } ) => id ) }
							render={ ( { open } ) => (
								<button onClick={ open }>
									Open Media Library
								</button>
							) }
						/>
					</MediaUploadCheck>
					<Gallery
						gallery_images={ gallery_images }
						gallery_columns={ gallery_columns }
						setAttributes={ setAttributes }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Gallery Image Settings' ) }
					initialOpen={ false }
				>
					<InputControl
						label="Gallery Columns Class"
						value={ gallery_columns }
						onChange={ ( nextValue ) =>
							setAttributes( { gallery_columns: nextValue } )
						}
					/>
					<InputControl
						label="Gallery Columns Style"
						value={ gallery_columns_style }
						onChange={ ( nextValue ) =>
							setAttributes( {
								gallery_columns_style: nextValue,
							} )
						}
					/>
					<InputControl
						label="Image Class"
						value={ image_class }
						onChange={ ( nextValue ) =>
							setAttributes( { image_class: nextValue } )
						}
					/>
					<InputControl
						label="Image Style"
						value={ image_style }
						onChange={ ( nextValue ) =>
							setAttributes( { image_style: nextValue } )
						}
					/>
					<InputControl
						label="Link Style"
						value={ gallery_link_style }
						onChange={ ( nextValue ) =>
							setAttributes( { gallery_link_style: nextValue } )
						}
					/>
					<InputControl
						label="Link Class"
						value={ gallery_link_class }
						onChange={ ( nextValue ) =>
							setAttributes( { gallery_link_class: nextValue } )
						}
					/>
					<InputControl
						label="Image ID"
						value={ image_id }
						onChange={ ( nextValue ) =>
							setAttributes( { image_id: nextValue } )
						}
					/>
					<InputControl
						label="Image Lightbox"
						value={ gallery_images_lightbox }
						onChange={ ( nextValue ) =>
							setAttributes( {
								gallery_images_lightbox: nextValue,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...useBlockProps() }>
				<img src={ section_image } alt="" />
				{ console.log( section_image ) }
				<div style={ { display: 'flex' } }>
					<div
						style={ {
							flex: '1',
							marginRight: '20px',
							width: '50%',
						} }
					>
						<InnerBlocks />
					</div>
					<div style={ { flex: '1', width: '50%' } }>
						<div className={ `${ gallery_columns }` }>
							{ gallery_images &&
								gallery_images.map( ( image ) => {
									console.log( 'image:', image );
									return (
										<div
											key={ image.id }
											style={ { marginBottom: '20px' } }
										>
											<img
												src={ image.url }
												alt={ image.alt || image.title }
												style={ {
													width: '100%',
													height: 'auto',
												} }
											/>
											{ gallery_captions_yes_no ===
												'yes' && (
												<>
													{ image.title && (
														<div
															style={ {
																fontWeight:
																	'bold',
																marginTop:
																	'5px',
															} }
															dangerouslySetInnerHTML={ {
																__html: image.title,
															} }
														/>
													) }
													{ image.caption && (
														<div
															style={ {
																fontStyle:
																	'italic',
																fontSize:
																	'0.9em',
															} }
															dangerouslySetInnerHTML={ {
																__html: image.caption,
															} }
														/>
													) }
												</>
											) }
										</div>
									);
								} ) }
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

// Define your Gallery component
const Gallery = ( { gallery_images, gallery_columns, setAttributes } ) => {
	const deleteImage = ( id ) => {
		setAttributes( {
			gallery_images: gallery_images.filter(
				( image ) => image.id !== id
			),
		} );
	};
	return (
		<div className={ `gallery columns-${ gallery_columns }` }>
			{ gallery_images &&
				gallery_images.map( ( image ) => (
					<div key={ image.id }>
						<button onClick={ () => deleteImage( image.id ) }>
							X
						</button>
						<img
							src={ image.url }
							alt={ image.alt || image.title }
						/>
					</div>
				) ) }
		</div>
	);
};
