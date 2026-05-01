<footer>

<div style="height:100px;" class="bg-gradient-transparent-top-primary-bottom"></div>
<?php

// if(!is_page(1807)){
// 	echo get_template_part('lead-magnet/lead-magnet');	
// }

echo '<section class="bg-accent" style="padding-top:50px;padding-bottom:25px;">';
echo '<div class="container">';
echo '<div class="row justify-content-center">';

echo '<div class="col-lg-9 text-center" style="">';

echo '<div class="">';
echo do_shortcode('[global_cta]');
echo '</div>';


echo '</div>';
echo '</div>';
echo '</div>';

echo '<hr style="margin:40px auto !important;border-color:black;">';

echo '<div class="container">';
echo '<div class="row">';

echo '<div class="col-lg-5 col-md-6">';
echo '<a href="' . home_url() . '" title="Homepage link for ' . get_bloginfo('name') . ' - ' . get_bloginfo('description') . '">';
echo '<div style="width:90%;min-width:250px;fill:white;" id="logoMain">';
echo '<div style="pointer-events:none;">';

                  if (logoImg()) {
echo wp_get_attachment_image(logoImg()['id'], 'full','',array(
	'class'=>'w-100 h-auto skip-lazy',
	'style'=>''
));
                  } else {
                    echo logoSVG(); 
                    }

echo '</div>';
echo '</div>';
echo '</a>';

echo '<p class="">' . companyAbout() . '</p>';

?>





<!-- <div class="position-absolute h-100" style="border:1px solid black;top:0;right:0;"></div> -->

</div> <!-- end of first column -->

<?php
echo '<div class="col-lg-3 col-md-6">';
echo '<p class="h3" style="margin-bottom:0px;"><strong>Services</strong></p>';
echo wp_get_attachment_image(3009, 'full', false, array(
    'style'=>'width:150px;height:auto;object-fit:contain;border-radius:25px;'));

wp_nav_menu(array(
    'menu' => 'Services',
    'menu_class'=>'menu list-unstyled mb-0'
));

echo '</div>'; // end of second column
echo '<div class="col-lg-3 col-md-6">';
echo '<p class="h3" style="margin-bottom:0px;"><strong>Contact</strong></p>';

?>
<div class="d-flex" style="margin-top:1em;">
<div>
<?php 
echo wp_get_attachment_image(3010, 'full', false, array(
    'style'=>'width:20px;margin-right:10px;height:auto;object-fit:contain;border-radius:25px;')); ?>
</div>
<div>
    <p class="" style="margin:0px;"><strong>Phone:</strong><br><a href="tel:+1<?php echo globalPhone(); ?>" title="phone number link for <?php echo get_bloginfo('name'); ?> - <?php echo get_bloginfo('description'); ?>" class=""><?php echo globalPhone(); ?></a></p>
</div>
</div>

<?php echo do_shortcode('[spacer]'); ?>
<div class="d-flex">
<div>
<?php 
echo wp_get_attachment_image(3011, 'full', false, array(
    'style'=>'width:20px;margin-right:10px;height:auto;object-fit:contain;border-radius:25px;')); ?>
</div>
<div>
    <p class="" style="margin:0px;"><strong>Email:</strong><br><a href="mailto:<?php echo emailAddress(); ?>" title="email address link for <?php echo get_bloginfo('name'); ?> - <?php echo get_bloginfo('description'); ?>" class=""><?php echo emailAddress(); ?></a></p>
</div>
</div>

<?php
echo '</div>'; // end of third column
// echo '<div class="col-lg-3 col-md-6">';
// echo '<p class="h3" style="margin-bottom:0px;"><strong>Blog</strong></p>';
// echo wp_get_attachment_image(3009, 'full', false, array(
//     'style'=>'width:150px;height:auto;object-fit:contain;border-radius:25px;'));

// $recentBlog = new WP_Query(array(
//   'posts_per_page' => 5,
//   'post_type' => 'post',
//   'post__not_in' => [get_the_ID()],
// ));

// echo '<ul class="list-unstyled menu">';

// $i = 0;
// while ($recentBlog->have_posts()) {
//   $recentBlog->the_post();

//   $padding = $i === 0 ? 'padding:0px 0px 10px 0px;' : 'padding:10px 0px;';

//   echo '<li><a href="' . get_the_permalink() . '" class="d-block" style="' . $padding . '">' . get_the_title() . '</a></li>';

//   $i++;
// }

// wp_reset_postdata();
// echo '</ul>';

// echo '</div>'; // end of third column

?>

<div class="col-12 text-center" style="padding-top:100px;">
    <p>
Copyright &copy; <?php echo date('Y'); ?> 
<?php echo get_bloginfo('name'); ?> - 
<?php echo get_bloginfo('description'); ?>.
</p>
<!-- <hr> -->
</div>

</div>
</div>
</section>

<?php

// echo '<div class="text-center bg-accent-secondary" style="padding:0px 50px 50px;color:gray;">';
//     echo '<div class="d-flex justify-content-center align-items-center">';
//         echo '<small class=""><a href="https://latinowebstudio.com/" target="_blank" rel="noopener noreferrer" title="Web Design, Development & SEO done by Latino Web Studio in Denver, CO" style="" class="">Web Design &amp; SEO in Denver, CO</a> done by Latino Web Studio.</small>';
//     echo '</div>';
// echo '</div>';

?>
<!-- The first Modal -->
<div id="mobileMenu" class="modal-custom mobile-menu" style="opacity:0;pointer-events:none;">

<!-- Modal content -->
<div class="modal-content-menu modal-content-custom bg-accent-secondary" style="padding: 100px 15px;
    margin-top: 0;
    margin-left: 0;
    margin-bottom: 0;
    border-left: 0;
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    height: 100vh;
	background: var(--accent-secondary);">
<span class="close-custom" id="navMenuClose">&times;</span>
	<?php

echo '<div style="width:100%;max-width:165px;" id="logoMain">';
echo '<a href="' . home_url() . '" title="Homepage link for ' . get_bloginfo('name') . ' - ' . get_bloginfo('description') . '">';

echo logoSVG();
echo '</a>';
echo '</div>';

wp_nav_menu(array(
    'menu' => 'primary',
    'menu_class'=>'menu list-unstyled mb-0'
));

?>
<div class="">
<?php
echo do_shortcode('[discovery_engineering_contact]');
?>
</div>

<?php
echo '</div>';
echo '</div>';
// end of mobile nav menu


echo '</footer>';


echo codeFooter();
// if(get_field('footer', 'options')) { the_field('footer', 'options'); }
// if(get_field('footer_code')) { the_field('footer_code'); }

?>

<style>
label.screen-reader-text {
    display: none;
}
#searchform input#searchsubmit {
    width: 332px;
}

#searchform input#s {
    width: 300px;
}</style>
<!-- <div id="searchMenu" class="modal-custom" style="opacity:0;pointer-events:none;background-color:rgba(0, 0, 0, 0.75);">
<div class="modal-content-custom d-flex align-items-center position-relative" style="background: transparent;box-shadow: none;border: none;">
<span class="close-custom position-absolute" style="top:25px;right:0px;z-index:1;font-size:4rem;">&times;</span>

<div class="row">
<div class="col-12 text-center">
<span class="h2">Search for:</span>
<?php echo get_search_form(); ?>
</div>

</div>

</div>
</div> -->

<?php

wp_footer();

echo '</body>';
echo '</html>';
?>