<?php 

get_header();

$posts_page_id = get_option( 'page_for_posts' );
$posts_page_title = get_the_title( $posts_page_id );

?>
<section>
<div class="container" style="padding:100px 0px;">
<div class="row">
<div class="col-lg-9">
<h1 class="" style=""><?php echo get_the_title() ?></h1>
<p style="margin:0px;">Published on <?php echo get_the_time('F j, Y') ?></p>
<?php echo do_shortcode('[global_cta]'); ?>
<?php
if ( have_posts() ) : while ( have_posts() ) : the_post();
the_content();
endwhile; else:
echo '<p>Sorry, no posts matched your criteria.</p>';
endif;
	?>
<?php echo do_shortcode('[global_cta]'); ?>
	</div>
	<?php
get_template_part('partials/sidebar'); ?>
</div>
</div>
</section>


<?php

echo '<section class="body" style="padding:50px 0px;">';
echo '<div class="container">';
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
?>

<?php 
echo get_template_part('partials/section-contact');
?>

<?php get_footer(); ?>