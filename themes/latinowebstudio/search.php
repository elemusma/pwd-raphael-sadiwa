<?php get_header(); ?> 

<section class="body" style="padding:100px 0px;">
    <div class="container">
        <div class="row">
            <div class="col-lg-9 pr-lg-5">
                <div class="row pb-5 align-items-center">
                    <?php
                    $paged = get_query_var('paged') ? get_query_var('paged') : 1;

                    $args = array(
                        's' => get_search_query(),
                        'paged' => $paged,
                        'posts_per_page' => 10,
                    );

                    $the_query = new WP_Query($args);

                    if ($the_query->have_posts()) :
                    ?>
                        <div class="col-12">
                            <h2 style="font-weight:bold;">Search Results for: <?php echo esc_html(get_search_query()); ?></h2>
                        </div>

                        <?php
                        while ($the_query->have_posts()) :
                            $the_query->the_post();
                            get_template_part('partials/blogs-query');
                        endwhile;
                        ?>

                        <div class="col-12 d-flex flex-wrap justify-content-center pt-4">
                            <?php
                            echo paginate_links(array(
                                'total' => $the_query->max_num_pages,
                                'current' => $paged,
                                'prev_text' => __('« Prev'),
                                'next_text' => __('Next »'),
                            ));
                            ?>
                        </div>

                    <?php else : ?>
                        <div class="col-12">
                            <h2 style="font-weight:bold; color:#000;">Nothing Found</h2>
                            <div class="alert alert-info">
                                <p>Sorry, but nothing matched your search criteria. Please try again with some different keywords.</p>
                            </div>
                        </div>
                    <?php
                    endif;

                    wp_reset_postdata();
                    ?>
                </div> <!-- /.row -->
            </div> <!-- /.col-lg-9 -->

            <?php get_template_part('partials/sidebar'); ?>
        </div> <!-- /.row -->
    </div> <!-- /.container -->
</section>

<?php get_footer(); ?>
