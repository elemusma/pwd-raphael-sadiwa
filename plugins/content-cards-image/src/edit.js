/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

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
	RichText,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	__experimentalInputControl as InputControl,
	TextControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
		section_image_alt,
		section_image_title,
		section_image_class,
		section_image_style,
		section_image_data_aos,
		section_image_data_aos_delay,
		section_block,
		container_style,
		container_class,
		container_id,
		row_style,
		row_class,
		row_id,
		show_column,
		col_style,
		col_class,
		col_id,
		col_data_aos,
		col_data_aos_delay,
		columns_style,
		columns_class,
		columns_id,
		columns,
	} = attributes;

	const [ value, setValue ] = useState( '' );

	const utilityFunction = () => ( {
		col_class: 'col-lg-3 col-6',
		col_style: '',
		col_id: '',
		col_link: '',
		inner_col_style: '',
		inner_col_class: '',
		data_aos: 'fade-up',
		data_aos_delay: '',
		img_type: 'image', // ← new
		img: '',
		img_alt: '',
		img_title: '',
		img_gallery: [], // ← new
		media_class: '',
		media_style: '',
		img_class: 'w-100 h-auto',
		img_style: 'object-fit:contain;',
		media_lightbox: '',
		content_only_class: '',
		content_only_style: '',
		content_only_id: '',
		title: '',
		title_tag: 'h2',
		title_class: 'h6 bold',
		title_style: '',
		content_class: '',
		content_style: '',
		content: '',
		code_block: '',
		code_block_position: false,
		desc_position: 'below',
	} );

	const addColumn = () => {
		setAttributes( {
			columns: [ ...columns, utilityFunction() ],
		} );
	};

	const updateColumn = ( columnIndex, field, value ) => {
		setAttributes( {
			columns: columns.map( ( column, index ) => {
				if ( index === columnIndex ) {
					// Only merge if it's a plain object (NOT array)
					if (
						typeof value === 'object' &&
						value !== null &&
						! Array.isArray( value )
					) {
						return {
							...column,
							...value,
						};
					}

					return {
						...column,
						[ field ]: value,
					};
				}

				return column;
			} ),
		} );
	};

	const GalleryPreview = ( { ids } ) => {
		const images = useSelect(
			( select ) => {
				return ( ids || [] ).map( ( id ) =>
					select( 'core' ).getMedia( id )
				);
			},
			[ ids ]
		);

		if ( ! images ) return null;

		return (
			<>
				{ images.map( ( img, i ) =>
					img ? (
						<img
							key={ i }
							src={ img.source_url }
							alt={ img.alt_text }
							style={ {
								width: '80px',
								height: '80px',
								objectFit: 'cover',
								borderRadius: '3px',
								display: 'block',
							} }
						/>
					) : null
				) }
			</>
		);
	};

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
					<InputControl
						label="Background Image Data AOS"
						value={ section_image_data_aos }
						onChange={ ( nextValue ) =>
							setAttributes( {
								section_image_data_aos: nextValue,
							} )
						}
					/>
					<InputControl
						label="Background Image Data AOS Delay"
						value={ section_image_data_aos_delay }
						onChange={ ( nextValue ) =>
							setAttributes( {
								section_image_data_aos_delay: nextValue,
							} )
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
					<ToggleControl
						label="Show Column"
						checked={ attributes.show_column }
						onChange={ ( value ) =>
							setAttributes( { show_column: value } )
						}
					/>
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
					<InputControl
						label="Column Data AOS"
						value={ col_data_aos }
						onChange={ ( nextValue ) =>
							setAttributes( { col_data_aos: nextValue } )
						}
					/>
					<InputControl
						label="Column Data AOS Delay"
						value={ col_data_aos_delay }
						onChange={ ( nextValue ) =>
							setAttributes( { col_data_aos_delay: nextValue } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Columns Settings' ) }
					initialOpen={ false }
				>
					<InputControl
						label="Column Style"
						value={ columns_style }
						onChange={ ( nextValue ) =>
							setAttributes( { columns_style: nextValue } )
						}
					/>
					<InputControl
						label="Column Class"
						value={ columns_class }
						onChange={ ( nextValue ) =>
							setAttributes( { columns_class: nextValue } )
						}
					/>
					<InputControl
						label="Column ID"
						value={ columns_id }
						onChange={ ( nextValue ) =>
							setAttributes( { columns_id: nextValue } )
						}
					/>
					<button onClick={ () => addColumn() }>
						Add New Column
					</button>
				</PanelBody>
			</InspectorControls>
			<section { ...useBlockProps() }>
				<img src={ section_image } alt="" />
				{ console.log( section_image ) }
				<div className="column-wrapper">
					<InnerBlocks />

					{ columns.map( ( column, index ) => {
						return (
							<div
								className={ `column ${ column.col_class }` }
								style={ {
									padding: '25px',
									borderBottom: '1px solid',
									marginBottom: '25px',
								} }
							>
								<div style={ { display: 'flex' } }>
									<div style={ { paddingRight: '25px' } }>
										<p style={ { marginBottom: '0px' } }>
											Column Class
										</p>
										<input
											type="text"
											value={ column.col_class }
											onChange={ ( content ) =>
												updateColumn(
													index,
													'col_class',
													content.target.value
												)
											}
										/>
									</div>
									<div style={ { paddingRight: '25px' } }>
										<p style={ { marginBottom: '0px' } }>
											Column Style
										</p>
										<input
											type="text"
											value={ column.col_style }
											onChange={ ( content ) =>
												updateColumn(
													index,
													'col_style',
													content.target.value
												)
											}
										/>
									</div>
									<div>
										<p style={ { marginBottom: '0px' } }>
											Column ID
										</p>
										<input
											type="text"
											value={ column.col_id }
											onChange={ ( content ) =>
												updateColumn(
													index,
													'col_id',
													content.target.value
												)
											}
										/>
									</div>
								</div>
								<div>
									<p style={ { marginBottom: '0px' } }>
										Column Link
									</p>
									<input
										type="url"
										value={ column.col_link }
										onChange={ ( content ) =>
											updateColumn(
												index,
												'col_link',
												content.target.value
											)
										}
										placeholder="https://example.com"
									/>
								</div>
								<div style={ { display: 'flex' } }>
									<div>
										<p style={ { marginBottom: '0px' } }>
											Inner Column Class
										</p>
										<input
											type="text"
											style={ { width: '300px' } }
											value={ column.inner_col_class }
											onChange={ ( content ) =>
												updateColumn(
													index,
													'inner_col_class',
													content.target.value
												)
											}
										/>
									</div>
									<div style={ { paddingRight: '25px' } }>
										<p style={ { marginBottom: '0px' } }>
											Inner Column Style
										</p>
										<input
											type="text"
											style={ { width: '300px' } }
											value={ column.inner_col_style }
											onChange={ ( content ) =>
												updateColumn(
													index,
													'inner_col_style',
													content.target.value
												)
											}
										/>
									</div>
								</div>
								<div style={ { display: 'flex' } }>
									<div style={ { paddingRight: '25px' } }>
										<p style={ { marginBottom: '0px' } }>
											Data AOS
										</p>
										<input
											type="text"
											style={ { width: '300px' } }
											value={ column.data_aos }
											onChange={ ( content ) =>
												updateColumn(
													index,
													'data_aos',
													content.target.value
												)
											}
										/>
									</div>
									<div>
										<p style={ { marginBottom: '0px' } }>
											Data AOS Delay
										</p>
										<input
											type="text"
											style={ { width: '300px' } }
											value={ column.data_aos_delay }
											onChange={ ( content ) =>
												updateColumn(
													index,
													'data_aos_delay',
													content.target.value
												)
											}
										/>
									</div>
								</div>
								<div
									style={ {
										display: 'flex',
										paddingTop: '25px',
										justifyContent: 'space-between',
									} }
								>
									<div style={ { width: '45%' } }>
										<div style={ { display: 'flex' } }>
											<div>
												<p
													style={ {
														marginBottom: '0px',
													} }
												>
													Media Class
												</p>
												<input
													type="text"
													style={ {} }
													value={ column.media_class }
													onChange={ ( content ) =>
														updateColumn(
															index,
															'media_class',
															content.target.value
														)
													}
												/>
											</div>
											<div>
												<p
													style={ {
														marginBottom: '0px',
													} }
												>
													Media Style
												</p>
												<input
													type="text"
													style={ {} }
													value={ column.media_style }
													onChange={ ( content ) =>
														updateColumn(
															index,
															'media_style',
															content.target.value
														)
													}
												/>
											</div>
										</div>

										{ /* Image / Gallery Toggle */ }
										<div style={ { color: 'white' } }>
											<ToggleControl
												label={
													column.img_type ===
													'gallery'
														? __( 'Gallery' )
														: __( 'Image' )
												}
												help={
													column.img_type ===
													'gallery'
														? __(
																'Gallery mode: multiple images'
														  )
														: __(
																'Image mode: single image'
														  )
												}
												checked={
													column.img_type ===
													'gallery'
												}
												onChange={ ( val ) =>
													updateColumn(
														index,
														'img_type',
														val
															? 'gallery'
															: 'image'
													)
												}
											/>
										</div>
										<ToggleControl
    label="Image Below Content"
    checked={ column.img_position === 'below' }
    onChange={ ( val ) => updateColumn( index, 'img_position', val ? 'below' : 'above' ) }
/>

										{ column.img_type !== 'gallery' ? (
											/* ── Single Image ── */
											<MediaUploadCheck>
												<MediaUpload
													onSelect={ ( media ) =>
														updateColumn(
															index,
															null,
															{
																img: media.url,
																img_alt:
																	media.alt,
																img_title:
																	media.title
																		?.rendered ||
																	media.title ||
																	'',
															}
														)
													}
													allowedTypes={ [ 'image' ] }
													value={ column.img }
													render={ ( { open } ) => (
														<div>
															{ column.img && (
																<>
																	<Button
																		isLink
																		isDestructive
																		onClick={ () =>
																			updateColumn(
																				index,
																				null,
																				{
																					img: '',
																					img_alt:
																						'',
																					img_title:
																						'',
																				}
																			)
																		}
																	>
																		{ __(
																			'Remove Image'
																		) }
																	</Button>
																	<img
																		src={
																			column.img
																		}
																		alt={
																			column.img_alt ||
																			column.img_title
																		}
																		style={ {
																			width: '400px',
																			height: '225px',
																			objectFit:
																				'cover',
																		} }
																	/>
																</>
															) }
															<Button
																onClick={ open }
																icon="upload"
																className="editor-media-placeholder__button is-button is-default is-large"
															>
																{ __(
																	'Select Col Image'
																) }
															</Button>
														</div>
													) }
												/>
											</MediaUploadCheck>
										) : (
											/* ── Gallery ── */
											<MediaUploadCheck>
												<MediaUpload
													onSelect={ ( media ) => {
														const items =
															Array.isArray(
																media
															)
																? media
																: [ media ];
														updateColumn(
															index,
															'img_gallery',
															items.map(
																( item ) => ( {
																	id: item.id,
																	url: item.url,
																	alt:
																		item.alt_text ||
																		item.alt ||
																		'',
																	title:
																		item
																			.title
																			?.rendered ||
																		item.title ||
																		'',
																} )
															)
														);
													} }
													allowedTypes={ [ 'image' ] }
													multiple={ true }
													gallery={ true }
													value={ (
														column.img_gallery || []
													).map( ( img ) => img.id ) }
													render={ ( { open } ) => (
														<div>
															{ column.img_gallery &&
															column.img_gallery
																.length > 0 ? (
																<>
																	{ column.img_gallery &&
																		column
																			.img_gallery
																			.length >
																			0 && (
																			<div
																				style={ {
																					display:
																						'flex',
																					flexWrap:
																						'wrap',
																					gap: '6px',
																					margin: '8px 0',
																					padding:
																						'8px',
																					border: '1px solid #ddd',
																					borderRadius:
																						'4px',
																					background:
																						'#f9f9f9',
																				} }
																			>
																				{ column.img_gallery.map(
																					(
																						img,
																						i
																					) => (
																						<img
																							key={
																								i
																							}
																							src={
																								img.url
																							}
																							alt={
																								img.alt ||
																								img.title
																							}
																							style={ {
																								width: '80px',
																								height: '80px',
																								objectFit:
																									'cover',
																								borderRadius:
																									'3px',
																								display:
																									'block',
																							} }
																						/>
																					)
																				) }
																			</div>
																		) }

																	<p
																		style={ {
																			margin: '0 0 6px',
																			fontSize:
																				'12px',
																			color: '#555',
																		} }
																	>
																		{
																			column
																				.img_gallery
																				.length
																		}{ ' ' }
																		{ __(
																			'image(s) selected'
																		) }
																	</p>

																	{ /* Edit opens the gallery picker with existing selection */ }
																	<Button
																		onClick={
																			open
																		}
																		icon="edit"
																		className="editor-media-placeholder__button is-button is-default is-large"
																		style={ {
																			marginBottom:
																				'6px',
																		} }
																	>
																		{ __(
																			'Edit Gallery'
																		) }
																	</Button>

																	{ /* Remove all */ }
																	<Button
																		isLink
																		isDestructive
																		onClick={ () =>
																			updateColumn(
																				index,
																				'img_gallery',
																				[]
																			)
																		}
																		style={ {
																			display:
																				'block',
																			marginTop:
																				'4px',
																		} }
																	>
																		{ __(
																			'Remove All Images'
																		) }
																	</Button>
																</>
															) : (
																<Button
																	onClick={
																		open
																	}
																	icon="upload"
																	className="editor-media-placeholder__button is-button is-default is-large"
																>
																	{ __(
																		'Select Gallery Images'
																	) }
																</Button>
															) }
														</div>
													) }
												/>
												{ console.log(
													'gallery:',
													column.img_gallery
												) }
											</MediaUploadCheck>
										) }

										{ /* Class / Style fields — shared for both modes */ }
										<div style={ { display: 'flex' } }>
											<div style={ {} }>
												<p
													style={ {
														marginBottom: '0px',
													} }
												>
													Media Lightbox
												</p>
												<input
													type="text"
													style={ { width: '175px' } }
													value={
														column.media_lightbox
													}
													onChange={ ( e ) =>
														updateColumn(
															index,
															'media_lightbox',
															e.target.value
														)
													}
												/>
											</div>
										</div>

										<div>
											<div style={ { display: 'flex' } }>
												<div
													style={ {
														paddingRight: '25px',
													} }
												>
													<p
														style={ {
															marginBottom: '0px',
														} }
													>
														Image Class
													</p>
													<input
														type="text"
														style={ {
															width: '175px',
														} }
														value={
															column.img_class
														}
														onChange={ (
															content
														) =>
															updateColumn(
																index,
																'img_class',
																content.target
																	.value
															)
														}
													/>
												</div>
												<div>
													<p
														style={ {
															marginBottom: '0px',
														} }
													>
														Image Style
													</p>
													<input
														type="text"
														style={ {
															width: '175px',
														} }
														value={
															column.img_style
														}
														onChange={ (
															content
														) =>
															updateColumn(
																index,
																'img_style',
																content.target
																	.value
															)
														}
													/>
												</div>
											</div>
										</div>
										<p style={ { marginBottom: '0px' } }>
											Code Section
										</p>
										<ToggleControl
											label="Show code block above content"
											checked={
												column.code_block_position ===
												'above'
											}
											onChange={ ( val ) =>
												updateColumn(
													index,
													'code_block_position',
													val ? 'above' : 'below'
												)
											}
										/>
										<textarea
											style={ {
												height: '200px',
												width: '300px',
											} }
											value={ column.code_block }
											onChange={ ( content ) =>
												updateColumn(
													index,
													'code_block',
													content.target.value
												)
											}
											placeholder={ __(
												'Code goes here'
											) }
										/>
									</div>
									<div style={ { paddingLeft: '50px' } }>
										<div style={ { display: 'flex' } }>
											<InputControl
												label="Content Only Class"
												value={
													column.content_only_class
												}
												onChange={ ( content ) =>
													updateColumn(
														index,
														'content_only_class',
														content
													)
												}
												placeholder={ __(
													'Content Only Class'
												) }
											/>
											<InputControl
												label="Content Only Style"
												value={
													column.content_only_style
												}
												onChange={ ( content ) =>
													updateColumn(
														index,
														'content_only_style',

														content
													)
												}
												placeholder={ __(
													'Content Only Style'
												) }
											/>
										</div>
										<div style={ { display: 'flex' } }>
											<InputControl
												label="Title Class"
												value={ column.title_class }
												onChange={ ( content ) =>
													updateColumn(
														index,
														'title_class',
														content
													)
												}
												placeholder={ __(
													'Title Class'
												) }
											/>
											<InputControl
												label="Title Style"
												value={ column.title_style }
												onChange={ ( content ) =>
													updateColumn(
														index,
														'title_style',
														content
													)
												}
												placeholder={ __(
													'Title Style'
												) }
											/>
										</div>
										<SelectControl
											label="Title Tag"
											value={ column.title_tag }
											options={ [
												{
													label: 'Heading 2',
													value: 'h2',
												},
												{
													label: 'Heading 1',
													value: 'h1',
												},
												{
													label: 'Heading 3',
													value: 'h3',
												},
												{
													label: 'Heading 4',
													value: 'h4',
												},
												{
													label: 'Heading 5',
													value: 'h5',
												},
												{
													label: 'Heading 6',
													value: 'h6',
												},
												{
													label: 'Paragraph',
													value: 'p',
												},
												{ label: 'Div', value: 'div' },
											] }
											onChange={ ( value ) =>
												updateColumn(
													index,
													'title_tag',
													value
												)
											}
										/>
									<ToggleControl
											label="Show Description Above Title"
											checked={ column.desc_position === 'above' }
											onChange={ ( val ) =>
												updateColumn(
													index,
													'desc_position',
													val ? 'above' : 'below'
												)
											}
										/>
										<p style={ { marginBottom: '0px' } }>
											Title
										</p>
										<RichText
											value={ column.title }
											onChange={ ( content ) =>
												updateColumn(
													index,
													'title',
													content
												)
											}
											placeholder={ __( 'Column Title' ) }
										/>
										<div style={ { display: 'flex' } }>
											<InputControl
												label="content Class"
												value={ column.content_class }
												onChange={ ( content ) =>
													updateColumn(
														index,
														'content_class',
														content
													)
												}
												placeholder={ __(
													'Content Class'
												) }
											/>
											<InputControl
												label="content Style"
												value={ column.content_style }
												onChange={ ( content ) =>
													updateColumn(
														index,
														'content_style',
														content
													)
												}
												placeholder={ __(
													'Content Style'
												) }
											/>
										</div>
										<p style={ { marginBottom: '0px' } }>
											Content
										</p>
										<RichText
											value={ column.content }
											onChange={ ( content ) =>
												updateColumn(
													index,
													'content',
													content
												)
											}
											placeholder={ __(
												'Column Content'
											) }
										/>

										{ /* <RichText
									
								/> */ }
										{ /* <p>{ column.content }</p> */ }
									</div>
								</div>
								<Button
									style={ {
										border: '1px solid',
										background: 'white',
									} }
									className={ `button-hero` }
									onClick={ () => {
										const newColumns = [ ...columns ];
										const newColumn = utilityFunction();
										newColumns.splice(
											index,
											0,
											newColumn
										);
										setAttributes( {
											columns: newColumns,
										} );
									} }
								>
									{ __( 'Add Column Above' ) }
								</Button>
								{ /* add column above */ }
								<Button
									style={ {
										border: '1px solid',
										background: 'white',
									} }
									className={ `button-hero` }
									onClick={ () => {
										const newColumns = [ ...columns ];
										const newColumn = utilityFunction();
										newColumns.splice(
											index + 1,
											0,
											newColumn
										);
										setAttributes( {
											columns: newColumns,
										} );
									} }
								>
									{ __( 'Add Column Below' ) }
								</Button>
								{ /* Duplicate Button */ }
								<Button
									style={ {
										border: '1px solid',
										background: 'white',
									} }
									className={ `button-hero` }
									onClick={ () => {
										const newColumns = [ ...columns ];
										const duplicateFeature = { ...column }; // Copy the tab object
										newColumns.splice(
											index + 1,
											0,
											duplicateFeature
										); // Insert the copy after the current tab
										setAttributes( {
											columns: newColumns,
										} );
									} }
								>
									{ __( 'Duplicate Column' ) }
								</Button>
								<Button
									style={ {
										border: '1px solid',
										background: 'peachpuff',
									} }
									className={ `button-hero` }
									isDestructive
									onClick={ () => {
										const newColumns = [ ...columns ];
										newColumns.splice( index, 1 );
										setAttributes( {
											columns: newColumns,
										} );
									} }
								>
									{ __( 'Remove Column' ) }
								</Button>
								{ /* Move Up Button */ }
								<Button
									style={ {
										border: '1px solid',
										background: 'white',
									} }
									className={ `button-hero` }
									onClick={ () => {
										if ( index === 0 ) return; // Prevent moving the first item up
										const newColumns = [ ...columns ];
										const temp = newColumns[ index - 1 ];
										newColumns[ index - 1 ] =
											newColumns[ index ];
										newColumns[ index ] = temp;
										setAttributes( {
											columns: newColumns,
										} );
									} }
									disabled={ index === 0 } // Disable if it's the first item
								>
									{ __( 'Move Up' ) }
								</Button>

								{ /* Move Down Button */ }
								<Button
									style={ {
										border: '1px solid',
										background: 'white',
									} }
									className={ `button-hero` }
									onClick={ () => {
										if ( index === columns.length - 1 )
											return; // Prevent moving the last item down
										const newColumns = [ ...columns ];
										const temp = newColumns[ index + 1 ];
										newColumns[ index + 1 ] =
											newColumns[ index ];
										newColumns[ index ] = temp;
										setAttributes( {
											columns: newColumns,
										} );
									} }
									disabled={ index === columns.length - 1 } // Disable if it's the last item
								>
									{ __( 'Move Down' ) }
								</Button>
							</div>
						);
					} ) }
				</div>
			</section>
		</>
	);
}