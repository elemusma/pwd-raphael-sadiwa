<?php

get_header();

// Fetch the posts page title for the header
$posts_page_id = get_option('page_for_posts');
$posts_page_title = get_the_title($posts_page_id);
?>

<section class="body" style="padding:75px 0;">
    <div class="position-absolute w-100 h-100" style="
background: #FFF;
background: linear-gradient(45deg, rgba(255, 255, 255, 1) 80%, rgba(var(--accent-primary-rgba), 1) 100%);
top:0;
left:0;"></div>
    <div class="container">
        <div class="row">
                <div class="col-12 order-1 d-flex flex-wrap">
    <h1><?php echo esc_html($posts_page_title); ?></h1>
            <?php
            if (have_posts()) :
                $counterBlog = 0;
                while (have_posts()) : the_post();
                    $counterBlog++;
                    if ($counterBlog > 2) {
                        $counterBlog = 1; // Reset counter for delay calculation
                    }
            ?>
            <?php echo get_template_part('partials/blogs-query'); ?>
            <?php
                endwhile;

                echo '<div class="col-12 d-flex justify-content-center pt-4">';
                the_posts_pagination(array(
                    'mid_size' => 2, // Reduced mid_size to show fewer page numbers
                    'prev_text' => __('Previous Page', 'textdomain'),
                    'next_text' => __('Next Page', 'textdomain'),
                ));
                echo '</div>';

            else : ?>
                <div class="col-12"><p><?php echo esc_html__('No posts found.', 'textdomain') ?></p></div>
<?php           
	endif;
            ?>
			</div>
        </div>
    </div>
</section>

<?php 
echo get_template_part('partials/section-contact');
?>

<?php get_footer(); ?>