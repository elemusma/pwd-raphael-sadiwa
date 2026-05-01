<?php

wp_enqueue_style('lead-magnet', get_theme_file_uri('/lead-magnet/lead-magnet.css'));

// echo '<button class="openModalBtnCustom" data-modal-id="leadMagnetModal">Open Modal 1</button>';

// <!-- The first Modal -->
echo '<div id="leadMagnetModal" class="modal-custom" style="opacity:0;pointer-events:none;">';
echo '<div class="modal-content-custom d-flex align-items-center position-relative">';
echo '<span class="close-custom position-absolute" style="top:25px;right:25px;z-index:1;">&times;</span>';

echo '<div class="row">';
echo '<div class="col-lg-6 d-none d-md-block">';
echo wp_get_attachment_image(3012,'full','',array(
    'class'=>'w-100',
    'style'=>'height:100%;object-fit:cover;'
));
echo '</div>';
echo '<div class="col-lg-6 col-md-9 col-12">';
// echo '<h2 class="h3">Refereed Publications</h2>';
// echo '<p>Find the perfect expert witness for your case, ensuring clear, compelling testimony, without having to deal with confusing technical jargon, unresponsive experts, or overwhelming documentation.</p>';
echo do_shortcode('[gravityform id="2" title="false" description="false" ajax="true"]');
echo '</div>';
echo '</div>';

echo '</div>'; // Close modal content
echo '</div>'; // Close modal


wp_enqueue_script('lead-magnet-js', get_theme_file_uri('/lead-magnet/lead-magnet.js'));

?>