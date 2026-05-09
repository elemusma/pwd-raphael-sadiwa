<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php 
    echo codeHeader(); 
    wp_head(); 
  ?>
</head>
<body <?php body_class(); ?>>

  <?php echo codeBody(); ?>

  <!-- <div class="blank-space" style=""></div> -->

  <header class="header-nav position-fixed w-100" style="top:0;left:0;z-index:10;">
    <div class="nav" style="">
      <div class="container">
        <div class="row justify-content-between align-items-center">

          <div class="col-lg-3 col-md-2 col-5 text-center" style="">
            <div class="bg-white box-shadow" style="border-bottom-left-radius:25px;border-bottom-right-radius:25px;padding-top:15px;">
            <a href="<?php echo home_url(); ?>/?nocache" title="<?php echo get_bloginfo( 'name' ) . ' - ' . get_bloginfo( 'description' ); ?>" class="">
              <div id="logoMain" style="min-width:100px;width:75%;transition:all .25s ease-in-out;margin:auto;">
                <div style="pointer-events:none;">
                  <?php 
                  if (logoImg()) {
echo wp_get_attachment_image(logoImg()['id'], 'full','',array(
	'class'=>'w-100 h-auto skip-lazy',
	'style'=>''
));
                  } else {
                    echo logoSVG(); 
                    }
                  ?>
                </div>
              </div>
            </a>
            </div>
          </div>

          <div class="col-9 text-center mobile-hidden">
			  <div class="d-flex justify-content-end h-100 bg-white box-shadow" style="border-radius:25px;">
            <?php
              wp_nav_menu(array(
                'menu' => 'primary',
                'menu_class' => 'menu list-unstyled mb-0 d-flex h-100 align-items-center justify-content-end'
              ));
            ?>
		<a class="btn-main small d-flex align-items-center phone" role="button" href="tel:+1<?php echo globalPhone(); ?>" style="" target="" id=""><svg fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height:11px;width:11px;margin-right:10px;"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg> <?php echo globalPhone(); ?></a>
			  </div>
          </div>

          <div class="col-7 text-center desktop-hidden bg-white" style="border-radius:25px;">
				            <div class="d-flex align-items-center justify-content-end" style="">
              <span id="mobileMenuToggle" class="openModalBtnCustom nav-toggle" data-modal-id="mobileMenu" title="mobile menu nav toggle for <?php echo get_bloginfo( 'name' ) . ' - ' . get_bloginfo( 'description' ); ?>">
                <div style="padding:10px 0px;pointer-events:none;">
                  <div class="line-1 bg-accent"></div>
                  <div class="line-2 bg-accent"></div>
                  <div class="line-3 bg-accent"></div>
                </div>
</span>
			<a class="d-flex align-items-center phone bg-accent" role="button" href="tel:+1<?php echo globalPhone(); ?>" style="font-size:9px;padding:5px 10px;color:black;border-radius:8px;margin-left:15px;" target="" id=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height:15px;width:15px;margin-right:10px;"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg> <?php echo globalPhone(); ?></a>
            </div>
			</div>

        </div> <!-- end of row -->
      </div>
    </div>
  </header>