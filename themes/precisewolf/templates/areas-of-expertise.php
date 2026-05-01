<?php 
/**
 * Template Name: Areas of Expertise
 */
get_header(); 

$posts_page_id = get_option( 'page_for_posts' );
$posts_page_title = get_the_title( $posts_page_id );

?>
<section style="padding:100px 0px;">
<div class="container" style="">
<div class="row">
<div class="col-lg-9">
<?php
if ( have_posts() ) : while ( have_posts() ) : the_post();
the_content();
endwhile; else:
echo '<p>Sorry, no posts matched your criteria.</p>';
endif;
	?>
	</div>
	<?php
get_template_part('partials/sidebar'); ?>
</div>
</div>
</section>

<?php 
echo do_shortcode('[discovery_engineering_cta]');
?>

<?php

echo '<section class="body" style="padding:50px 0px;">';
echo '<div class="container">';
// echo '<div class="row justify-content-center">';

// echo '<div class="col-lg-9 col-md-12 order-1">';
// echo '</div>';
// get_template_part('partials/sidebar');
// <div class="col-lg-3">
// </div>
// echo '</div>';
echo '<div class="row justify-content-center pt-5">';
echo '<div class="col-md-6" id="previous">';
echo '<small>Previous</small>';
echo '<h3 class="h5">' . get_previous_post_link() . '</h3>';
echo '</div>';
echo '<div class="col-md-6 text-right" id="next">';
echo '<small>Next</small>';
echo '<h3 class="h5">' . get_next_post_link() . '</h3>';
echo '</div>';
echo '</div>';
echo '</div>';
echo '</section>';

get_footer(); ?>