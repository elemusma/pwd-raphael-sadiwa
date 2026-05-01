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
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
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
		section_image_class,
		section_image_style,
		section_block,
		container_style,
		container_class,
		container_id,
		row_style,
		row_class,
		row_id,
		column_style,
		column_class,
		column_id,
		faqs,
	} = attributes;

	const [ value, setValue ] = useState( '' );

	const addFAQ = () => {
		setAttributes( {
			faqs: [
				...faqs,
				{
					col_class:
						'accordion position-relative col-12 bg-accent-secondary',
					col_style: 'border-bottom:1px solid #D5D8DC;',
					col_id: '',
					col_inner_class: '',
					col_inner_style: '',
					data_aos: 'fade-up',
					data_aos_delay: '',
					title: '',
					content: '',
					code_block: '',
				},
			],
		} );
	};

	const updateFAQ = ( faqIndex, field, value ) => {
		setAttributes( {
			faqs: faqs.map( ( faq, index ) => {
				if ( index === faqIndex ) {
					return {
						...faq,
						[ field ]: value,
					};
				}
				return faq;
			} ),
		} );
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
													} )
												}
											>
												{ __( 'Remove Section Image' ) }
											</Button>
											<img
												src={ section_image }
												alt={
													section_image_alt || 'Image'
												}
											/>
											{ section_image_alt && (
												<p>
													{ __( 'Alt Text:' ) }{ ' ' }
													{ section_image_alt }
												</p>
											) }
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
					{ /* <InputControl
						label="Code Block"
						value={section_block}
						onChange={(nextValue) => setAttributes({ section_block: nextValue })}
					/> */ }
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
						value={ column_style }
						onChange={ ( nextValue ) =>
							setAttributes( { column_style: nextValue } )
						}
					/>
					<InputControl
						label="Column Class"
						value={ column_class }
						onChange={ ( nextValue ) =>
							setAttributes( { column_class: nextValue } )
						}
					/>
					<InputControl
						label="Column ID"
						value={ column_id }
						onChange={ ( nextValue ) =>
							setAttributes( { column_id: nextValue } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Column Settings' ) }
					initialOpen={ false }
				>
					<button onClick={ () => addFAQ() }>Add New Column</button>
				</PanelBody>
			</InspectorControls>
			<section { ...useBlockProps() }>
				<img src={ section_image } alt="" />
				{ console.log( section_image ) }
				<div className="column-wrapper">
					{ faqs.map( ( faq, index ) => {
						return (
							<div
								className={ `column ${ faq.col_class }` }
								style={ {
									background: '#f7f7f7',
									padding: '25px',
									borderBottom: '1px solid',
									marginBottom: '25px',
								} }
							>
								<div style={ { display: 'flex' } }>
									<div style={ { paddingRight: '25px' } }>
										<p style={ { marginBottom: '0px' } }>
											FAQ Class
										</p>
										<input
											type="text"
											value={ faq.col_class }
											onChange={ ( content ) =>
												updateFAQ(
													index,
													'col_class',
													content.target.value
												)
											}
										/>
									</div>
									<div style={ { paddingRight: '25px' } }>
										<p style={ { marginBottom: '0px' } }>
											FAQ Style
										</p>
										<input
											type="text"
											value={ faq.col_style }
											onChange={ ( content ) =>
												updateFAQ(
													index,
													'col_style',
													content.target.value
												)
											}
										/>
									</div>
									<div>
										<p style={ { marginBottom: '0px' } }>
											FAQ ID
										</p>
										<input
											type="text"
											value={ faq.col_id }
											onChange={ ( content ) =>
												updateFAQ(
													index,
													'col_id',
													content.target.value
												)
											}
										/>
									</div>
								</div>
								<div style={ { display: 'flex' } }>
									<div style={ { paddingRight: '25px' } }>
										<p style={ { marginBottom: '0px' } }>
											FAQ Inner Class
										</p>
										<input
											type="text"
											value={ faq.col_inner_class }
											onChange={ ( content ) =>
												updateFAQ(
													index,
													'col_inner_class',
													content.target.value
												)
											}
										/>
									</div>
									<div style={ { paddingRight: '25px' } }>
										<p style={ { marginBottom: '0px' } }>
											FAQ Inner Style
										</p>
										<input
											type="text"
											value={ faq.col_inner_style }
											onChange={ ( content ) =>
												updateFAQ(
													index,
													'col_inner_style',
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
											value={ faq.data_aos }
											onChange={ ( content ) =>
												updateFAQ(
													index,
													'data_aos',
													content.target.value
												)
											}
										/>
									</div>
									<div style={ { paddingRight: '25px' } }>
										<p style={ { marginBottom: '0px' } }>
											Data AOS Delay
										</p>
										<input
											type="text"
											value={ faq.data_aos_delay }
											onChange={ ( content ) =>
												updateFAQ(
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
									} }
								>
									<div style={ {} }>
										{ /* <h2>{ faq.title }</h2> */ }
										<p style={ { marginBottom: '0px' } }>
											<strong>FAQ Question</strong>
										</p>
										<RichText
											value={ faq.title }
											onChange={ ( content ) =>
												updateFAQ(
													index,
													'title',
													content
												)
											}
											placeholder={ __( '' ) }
										/>
										<p style={ { marginBottom: '0px' } }>
											<strong>FAQ Answer</strong>
										</p>
										<RichText
											value={ faq.content }
											onChange={ ( content ) =>
												updateFAQ(
													index,
													'content',
													content
												)
											}
											placeholder={ __( '' ) }
										/>
									</div>
								</div>
								{ /* Add FAQ Above Button */ }
								<Button
									style={ {
										border: '1px solid',
										background: 'white',
									} }
									className={ `button-hero` }
									onClick={ () => {
										const newFAQs = [ ...faqs ];
										const newFAQ = { ...addFAQ() }; // Use 'faq' instead of 'column'
										newFAQs.splice( index, 0, newFAQ );
										setAttributes( { faqs: newFAQs } );
									} }
								>
									{ __( 'Add FAQ Above' ) }
								</Button>

								{ /* Add FAQ Below Button */ }
								<Button
									style={ {
										border: '1px solid',
										background: 'white',
									} }
									className={ `button-hero` }
									onClick={ () => {
										const newFAQs = [ ...faqs ];
										const duplicateFAQ = { ...addFAQ() }; // Use 'faq' instead of 'column'
										newFAQs.splice(
											index + 1,
											0,
											duplicateFAQ
										);
										setAttributes( { faqs: newFAQs } );
									} }
								>
									{ __( 'Add FAQ Below' ) }
								</Button>

								{ /* Duplicate FAQ Button */ }
								<Button
									style={ {
										border: '1px solid',
										background: 'white',
									} }
									className={ `button-hero` }
									onClick={ () => {
										const newFAQs = [ ...faqs ];
										const duplicateFAQ = { ...faq }; // Use 'faq' instead of 'column'
										newFAQs.splice(
											index + 1,
											0,
											duplicateFAQ
										);
										setAttributes( { faqs: newFAQs } );
									} }
								>
									{ __( 'Duplicate FAQ' ) }
								</Button>

								{ /* Remove FAQ Button */ }
								<Button
									style={ {
										border: '1px solid',
										background: 'peachpuff',
									} }
									className={ `button-hero` }
									isDestructive
									onClick={ () => {
										const newFAQs = [ ...faqs ];
										newFAQs.splice( index, 1 );
										setAttributes( { faqs: newFAQs } );
									} }
								>
									{ __( 'Remove FAQ' ) }
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
										const newFAQs = [ ...faqs ];
										const temp = newFAQs[ index - 1 ];
										newFAQs[ index - 1 ] = newFAQs[ index ];
										newFAQs[ index ] = temp;
										setAttributes( { faqs: newFAQs } );
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
										if ( index === faqs.length - 1 ) return; // Corrected 'columns.length' to 'faqs.length'
										const newFAQs = [ ...faqs ];
										const temp = newFAQs[ index + 1 ];
										newFAQs[ index + 1 ] = newFAQs[ index ];
										newFAQs[ index ] = temp;
										setAttributes( { faqs: newFAQs } );
									} }
									disabled={ index === faqs.length - 1 } // Corrected 'columns.length' to 'faqs.length'
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
