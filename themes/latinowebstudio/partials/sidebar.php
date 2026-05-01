<?php 

echo '<div class="col-lg-3 col-12 order-2 sidebar">';

?>

<div class="card text-center">
	<?php 
	echo wp_get_attachment_image(3012,'full','',array(
    'class'=>'w-100',
    'style'=>'height:100%;object-fit:cover;'
));
	?>

	<?php 
	// echo do_shortcode('[gravityform id="2" title="false" description="false" ajax="true"]');
	?>
</div>

<div class="card text-center">
<div>
<?php echo wp_get_attachment_image(254, 'full', false, array(
    'class' => '',
    'style' => 'width:100%;aspect-ratio:1/1;height:auto;border-radius:50%;object-fit:cover;object-position:top;box-shadow: 0 0 10px var(--accent-primary);border: 1px solid var(--accent-secondary);'
)); ?>
</div>
<?php echo do_shortcode('[global_cta]'); ?>
</div>

<?php
echo '<div class="card p-3 mt-2 mb-2">';
echo '<h3 class="">Recent Posts</h3>';

$recentBlog = new WP_Query(array(
'posts_per_page' => 5,
'post_type' => 'post',
'post__not_in' => [get_the_ID()],
));
echo '<ul>';
while($recentBlog->have_posts()){
$recentBlog->the_post();
echo '<li><a href="' . get_the_permalink() . '">' . get_the_title() . '</a></li>';
} wp_reset_postdata();
echo '</ul>';
echo '</div>';
echo '</div>';

?>