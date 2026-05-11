<footer>

<div style="height:100px;" class="bg-gradient-dark-top-primary-bottom"></div>
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

<div class="d-flex">


<div>
<a href="https://www.roundtablegroup.com/" target="_blank" rel="noopener nofollow external" title="Rountable Group link" style="display:inline-block;" class="">
<?php

echo wp_get_attachment_image(1121, 'full','',array(
    'class'=>'',
    'style'=>'height:52px;width:auto;object-fit:contain;    margin-bottom:-10px;'
    ));
    
    ?>
</a>
</div>

<div>
<?php
echo get_template_part('partials/si');
?>
</div>

</div>



<!-- <div class="position-absolute h-100" style="border:1px solid black;top:0;right:0;"></div> -->

</div> <!-- end of first column -->

<?php
echo '<div class="col-lg-3 col-md-6">';
echo '<p class="h3" style="margin-bottom:0px;"><strong>Contact</strong></p>';
echo wp_get_attachment_image(3009, 'full', false, array(
    'style'=>'width:150px;height:auto;object-fit:contain;border-radius:25px;'));

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

<p style="margin-bottom:0;"><strong>Address</strong></p>
<p style="margin-top:0;">1846 N Loop 1604 W Suite 205, San Antonio, TX 78248</p>

<?php
// wp_nav_menu(array(
//     'menu' => 'Contact Info',
//     'menu_class'=>'menu list-unstyled mb-0'
// ));

echo '</div>'; // end of second column
echo '<div class="col-lg-3 col-md-6">';
echo '<p class="h3" style="margin-bottom:0px;"><strong>Blog</strong></p>';

$recentBlog = new WP_Query(array(
'posts_per_page' => 4,
'post_type' => 'post',
'post__not_in' => [get_the_ID()],
));
echo '<ul class="list-unstyled menu">';
while($recentBlog->have_posts()){
$recentBlog->the_post();
echo '<li><a href="' . get_the_permalink() . '">' . get_the_title() . '</a></li>';
} wp_reset_postdata();
echo '</ul>';

?>


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

<!-- start of backlink -->
<div class="col-12 text-center" style="padding-top:100px;">
  <p style="margin-bottom:0px;" class="lead">Copyright &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?> - <?php bloginfo('description'); ?>. All Rights Reserved.</p>

</div>

<div class="col-12">
    <hr style="margin:20px auto !important;border-color:black;">
</div>

<div class="col-md-12 col-11 text-center" style="height:45px;">
<a href="https://precisewolf.com/" target="_blank" rel="noopener nofollow external" title="Web Design & SEO done by Precise Wolf in Denver, CO" style="display:inline-block;" class="precise-wolf-digital-logo">
<div style="" class="position-relative">
<svg style="width:200px;" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 44.13">
  <defs>
    <style>
      .footer-cls-1 {
        fill: url(#radial-gradient-2);
      }

      .footer-cls-2 {
        fill: url(#radial-gradient);
      }

      .footer-cls-3, .footer-cls-4 {
        stroke: #0f9fda;
      }

      .footer-cls-3, .footer-cls-4, .footer-cls-5, .footer-cls-6 {
        stroke-miterlimit: 10;
      }

      .footer-cls-4, .footer-cls-5 {
        fill: none;
      }

      .footer-cls-7 {
        fill: #fff;
      }

      .footer-cls-5 {
        stroke: #000;
      }

      .footer-cls-6 {
        stroke: #fff;
      }
    </style>
    <radialGradient id="radial-gradient" cx="82.31" cy="19.31" fx="82.31" fy="19.31" r="1.02" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#90f1fc"/>
      <stop offset="1" stop-color="#2be7fb"/>
    </radialGradient>
    <radialGradient id="radial-gradient-2" cx="82.31" cy="19.31" fx="82.31" fy="19.31" r="1.02" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#a1dff7"/>
      <stop offset="1" stop-color="#0f9fda"/>
    </radialGradient>
  </defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <g>
      <g class="logo-circle">
        <line class="footer-cls-5" x1="87.31" y1="40.4" x2="87.31" y2="43.63"/>
        <line class="footer-cls-5" x1="87.31" y1=".92" x2="87.31" y2="4.14"/>
        <line class="footer-cls-5" x1="69.43" y1="21.88" x2="66.19" y2="21.88"/>
        <line class="footer-cls-5" x1="71.2" y1="13.13" x2="68.63" y2="11.78"/>
        <line class="footer-cls-5" x1="71.21" y1="30.76" x2="68.82" y2="32.16"/>
        <circle class="footer-cls-5" cx="87.53" cy="22.09" r="21.54"/>
        <line class="footer-cls-5" x1="109.2" y1="21.97" x2="105.97" y2="21.97"/>
        <line class="footer-cls-5" x1="97.55" y1="37.17" x2="99.53" y2="39.98"/>
        <line class="footer-cls-5" x1="74.99" y1="5.07" x2="76.51" y2="7.23"/>
        <line class="footer-cls-5" x1="77.65" y1="36.99" x2="75.8" y2="40.02"/>
        <line class="footer-cls-5" x1="98.05" y1="3.79" x2="96.63" y2="6.12"/>
        <line class="footer-cls-5" x1="103.98" y1="30.84" x2="106.61" y2="32.44"/>
        <line class="footer-cls-5" x1="103.98" y1="13.16" x2="106.34" y2="11.6"/>
      </g>
      <g class="precise-wolf-logo-text">
        <g>
          <path d="M122.41,24.7h4.13c3.15,0,5.29,1.99,5.29,4.9s-2.14,4.9-5.29,4.9h-4.13v-9.8ZM126.45,33.27c2.42,0,3.97-1.48,3.97-3.68s-1.55-3.68-3.97-3.68h-2.64v7.36h2.64Z"/>
          <path d="M133.96,24.7h1.4v9.8h-1.4v-9.8Z"/>
          <path d="M145.09,29.54h1.34v3.82c-.98.83-2.34,1.25-3.71,1.25-3.01,0-5.22-2.11-5.22-5.01s2.21-5.01,5.25-5.01c1.55,0,2.87.52,3.76,1.51l-.87.87c-.81-.78-1.74-1.13-2.84-1.13-2.27,0-3.9,1.58-3.9,3.76s1.64,3.76,3.89,3.76c.83,0,1.6-.18,2.29-.63v-3.19Z"/>
          <path d="M149.11,24.7h1.4v9.8h-1.4v-9.8Z"/>
          <path d="M155.39,25.91h-3.36v-1.22h8.1v1.22h-3.36v8.58h-1.39v-8.58Z"/>
          <path d="M167.41,32.04h-5.21l-1.08,2.45h-1.44l4.44-9.8h1.39l4.45,9.8h-1.47l-1.08-2.45ZM166.92,30.92l-2.11-4.8-2.11,4.8h4.23Z"/>
          <path d="M171.41,24.7h1.4v8.58h5.3v1.22h-6.7v-9.8Z"/>
        </g>
        <g>
          <path d="M122.22,7.59h3.66c1.95,0,2.87,1.15,2.87,3.17,0,2.52-1.39,3.11-3.15,3.11h-.97v4.63h-2.41V7.59ZM125.44,12.18c.89,0,1.05-.47,1.05-1.47,0-.82-.09-1.43-1.06-1.43h-.79v2.9h.81Z"/>
          <path d="M129.92,7.59h3c2.2,0,3.62.59,3.62,2.88,0,1.35-.26,2.24-1.33,2.75l1.5,5.28h-2.49l-1.2-4.89h-.69v4.89h-2.41V7.59ZM133,12.22c1.01,0,1.31-.57,1.31-1.54s-.28-1.48-1.2-1.48h-.78v3.02h.67Z"/>
          <path d="M138,7.59h4.9v1.64h-2.49v2.71h1.9v1.67h-1.9v3.26h2.52v1.63h-4.93V7.59Z"/>
          <path d="M143.87,15.02v-3.93c0-2.26.78-3.65,3.27-3.65s3.14,1.29,3.14,3.15v.94h-2.36v-1.09c0-.63-.01-1.31-.78-1.31s-.84.69-.84,1.35v5.13c0,.74.12,1.33.84,1.33.75,0,.78-.67.78-1.33v-1.15h2.36v.94c0,1.86-.7,3.25-3.14,3.25s-3.27-1.43-3.27-3.64Z"/>
          <path d="M151.62,7.59h2.41v10.91h-2.41V7.59Z"/>
          <path d="M155.42,15.2l2.06-.31c.03,1.41.35,1.94.96,1.94.5,0,.61-.42.61-.79,0-.9-.46-1.44-1.2-2.07l-.94-.82c-.84-.7-1.47-1.52-1.47-2.84,0-1.85,1.17-2.86,3.06-2.86,2.33,0,2.67,1.82,2.71,3.1l-2.07.26c-.03-.97-.09-1.59-.71-1.59-.44,0-.65.47-.65.85,0,.81.42,1.24,1.05,1.79l.9.79c.94.81,1.7,1.76,1.7,3.27s-1.12,2.75-2.86,2.75c-2.06,0-3.06-1.04-3.14-3.46Z"/>
          <path d="M162.59,7.59h4.9v1.64h-2.49v2.71h1.9v1.67h-1.9v3.26h2.52v1.63h-4.93V7.59Z"/>
          <path d="M171.61,7.59h2.05l.65,6.36.82-6.35h1.6l.86,6.31.66-6.32h2.02l-1.31,10.91h-2.1l-.93-6.59-.88,6.59h-2.13l-1.32-10.91Z"/>
          <path d="M181.27,15.06v-4.06c0-2.25.82-3.57,3.27-3.57s3.3,1.32,3.3,3.57v4.06c0,2.25-.84,3.6-3.3,3.6s-3.27-1.35-3.27-3.6ZM185.38,15.67v-5.25c0-.65-.08-1.28-.84-1.28-.71,0-.81.63-.81,1.28v5.25c0,.62.05,1.28.81,1.28s.84-.66.84-1.28Z"/>
          <path d="M189.32,7.59h2.41v9.28h2.51v1.63h-4.92V7.59Z"/>
          <path d="M195.28,7.59h4.72v1.63h-2.3v2.75h2.01v1.68h-2.01v4.85h-2.41V7.59Z"/>
        </g>
      </g>
      <line class="footer-cls-3" x1="115.44" y1="14.06" x2="115.44" y2="30.42"/>
      <circle class="footer-cls-2" cx="82.31" cy="19.31" r="1.02"/>
      <path class="footer-cls-7" d="M80.33,18.24l-1.82.58c.44,1.31,1.01,2.3,1.73,2.88.93.66,1.86.97,2.79,1.15.41-.24.69-.56.75-.98.1-.55.07-.92-.18-.98-.97.18-1.82.03-2.53-.49-.47-.71-.78-1.43-.75-2.17Z"/>
      <path class="footer-cls-6" fill="black" d="M71.4,19.66l2.84-4.79c-1.47-5.02-1.3-9.73,1.68-13.92l7.09,6.38h8.33l7.53-6.65c2.7,2.78,3.36,7.71,2.13,14.63l2.75,4.7-1.86-.53,3.06,6.83-3.28-.98-3.28,7.71-.84-2.79-5.63,7.36.22-3.63-4.65,4.34-4.88-4.34.35,3.68-5.54-7.53-.75,2.97-3.5-7.8-2.93.89,2.88-6.83-1.73.31Z"/>
      <path class="footer-cls-7" d="M76.37,11.96l-1.15,1.11c-1.09-3.19-1.09-6.42.66-9.71,1.89,1.45,3.47,3.17,4.61,5.27l-1.86,1.68c-.9-1.36-1.71-3.02-2.44-4.92-.77,2.3-.57,4.46.18,6.56Z"/>
      <path class="footer-cls-7" d="M98.47,11.83l1.15,1.11c1.09-3.19,1.09-6.42-.66-9.71-1.89,1.45-3.47,3.17-4.61,5.27l1.86,1.68c.9-1.36,1.71-3.02,2.44-4.92.77,2.3.57,4.46-.18,6.56Z"/>
      <polygon class="footer-cls-7" points="77.26 20.27 82.93 25.06 81.73 29.18 78.81 25.1 79.38 28.07 75.44 24.48 77.26 20.27"/>
      <polygon class="footer-cls-7" points="97.47 20.21 91.77 25.32 92.97 29.44 95.89 25.37 95.32 28.33 99.26 24.74 97.47 20.21"/>
      <polygon class="footer-cls-7" points="74.97 20.09 73.11 23.42 75.28 23.11 74.97 20.09"/>
      <polygon class="footer-cls-7" points="99.76 20.05 101.78 23.51 99.6 23.2 99.76 20.05"/>
      <path class="footer-cls-7" d="M85.21,21.53v6.02s4.59,0,4.59,0v-5.98c1.07,3.42,2.07,6.67,2.56,8.64v1.4c-.44.62-1.11,1.28-1.89,1.96-1.15-.16-2.02-.45-2.39-1,.76-.53,1.44-1.15,1.96-1.93.27-.75,0-1.42-.93-1.99h-3.42c-1.01.45-1.24,1.12-.96,1.93.37.75,1.08,1.41,2.03,2.03-.62.54-1.41.82-2.33.9-.86-.42-1.61-1.11-2.16-2.29.59-3.07,1.47-6.25,2.96-9.67Z"/>
      <g>
        <circle class="footer-cls-4" cx="92.88" cy="19.18" r="3.89"/>
        <circle class="footer-cls-4" cx="92.88" cy="19.18" r="1.93"/>
        <line class="footer-cls-4" x1="92.88" y1="24.89" x2="92.88" y2="13.46"/>
        <line class="footer-cls-4" x1="87.19" y1="19.18" x2="98.56" y2="19.18"/>
      </g>
      <circle class="footer-cls-1" cx="82.31" cy="19.31" r="1.02"/>
      <path class="footer-cls-7" d="M78.13,17.42c1.6-.03,2.96.23,3.92,1,.87.41,1.6.92,2.26,1.51l1.15.13c.1-1.41-.21-2.7-1.86-3.55l-1.6-.75c-2.13,0-3.22.7-3.88,1.66Z"/>
      <g class="site-created-text">
        <path d="M0,21.87l1.04-.28c.06.9.29,1.81,1.19,1.81.6,0,.92-.34.92-.99,0-.76-.38-1.15-.91-1.62l-1.41-1.25c-.56-.49-.81-1.02-.81-1.86,0-1.24.76-1.94,1.97-1.94,1.34,0,1.98.7,2.12,2.17l-1,.27c-.06-.83-.25-1.54-1.12-1.54-.58,0-.92.31-.92.92,0,.51.16.8.55,1.14l1.42,1.25c.63.56,1.2,1.31,1.2,2.36,0,1.25-.84,2-2.01,2-1.46,0-2.15-1-2.23-2.45Z"/>
        <path d="M5.14,16.17h1.11v1.16h-1.11v-1.16ZM5.14,18.23h1.11v6h-1.11v-6Z"/>
        <path d="M7.74,22.88v-3.91h-.63v-.74h.63v-1.75h1.11v1.75h.97v.74h-.97v3.84c0,.47.11.65.55.65.1,0,.27-.01.4-.03v.82c-.28.04-.49.06-.77.06-.94,0-1.3-.56-1.3-1.43Z"/>
        <path d="M10.53,21.91v-1.37c0-1.59.39-2.4,1.78-2.4,1.51,0,1.7.98,1.7,2.62v.49h-2.37v1.2c0,.73.2,1.04.67,1.04s.6-.38.6-.99v-.36h1.08v.23c0,1.2-.47,1.94-1.69,1.94-1.41,0-1.78-.83-1.78-2.4ZM12.91,20.65v-.54c0-.74-.07-1.14-.62-1.14s-.65.32-.65,1.36v.32h1.28Z"/>
        <path d="M17.33,21.53v-2.97c0-1.7.48-2.81,2.26-2.81,1.57,0,2.12.9,2.12,2.42v.66h-1.11v-.59c0-.93-.02-1.58-1-1.58s-1.09.69-1.09,1.72v3.33c0,1.27.28,1.68,1.09,1.68.94,0,1-.67,1-1.67v-.62h1.11v.62c0,1.55-.47,2.6-2.12,2.6-1.79,0-2.26-1.23-2.26-2.79Z"/>
        <path d="M22.77,18.23h1.11v.85c.44-.73.88-.92,1.33-.92.05,0,.09,0,.18.01v1.22c-.17-.06-.39-.12-.61-.12-.34,0-.61.12-.89.58v4.38h-1.11v-6Z"/>
        <path d="M25.95,21.91v-1.37c0-1.59.39-2.4,1.78-2.4,1.51,0,1.7.98,1.7,2.62v.49h-2.37v1.2c0,.73.2,1.04.67,1.04s.6-.38.6-.99v-.36h1.08v.23c0,1.2-.47,1.94-1.69,1.94-1.41,0-1.78-.83-1.78-2.4ZM28.34,20.65v-.54c0-.74-.07-1.14-.62-1.14s-.65.32-.65,1.36v.32h1.28Z"/>
        <path d="M30.31,22.92c0-1.49,1.08-1.93,2.37-2.44v-.43c0-.73-.08-1.08-.6-1.08-.46,0-.63.33-.63.85v.3l-1.1-.04c.02-1.33.58-1.94,1.81-1.94s1.64.66,1.64,1.9v2.74c0,.56.05,1.06.1,1.44h-1.02c-.04-.22-.11-.6-.15-.88-.15.47-.53.97-1.21.97s-1.2-.69-1.2-1.39ZM32.68,22.86v-1.7c-.69.39-1.26.73-1.26,1.42,0,.49.19.78.53.78.32,0,.63-.34.73-.5Z"/>
        <path d="M35.08,22.88v-3.91h-.63v-.74h.63v-1.75h1.11v1.75h.97v.74h-.97v3.84c0,.47.11.65.55.65.1,0,.27-.01.4-.03v.82c-.28.04-.49.06-.77.06-.94,0-1.3-.56-1.3-1.43Z"/>
        <path d="M37.86,21.91v-1.37c0-1.59.39-2.4,1.78-2.4,1.51,0,1.7.98,1.7,2.62v.49h-2.37v1.2c0,.73.2,1.04.67,1.04s.6-.38.6-.99v-.36h1.08v.23c0,1.2-.47,1.94-1.69,1.94-1.41,0-1.78-.83-1.78-2.4ZM40.25,20.65v-.54c0-.74-.07-1.14-.62-1.14s-.65.32-.65,1.36v.32h1.28Z"/>
        <path d="M42.23,21.87v-1.16c0-1.37.25-2.56,1.47-2.56.4,0,.74.21,1,.47v-2.79h1.11v8.41h-1.11v-.38c-.26.28-.57.47-.97.47-1.02,0-1.51-.66-1.51-2.44ZM44.7,23.21v-3.93c-.2-.13-.44-.26-.71-.26-.52,0-.65.57-.65,1.26v1.69c0,.84.08,1.47.67,1.47.21,0,.45-.07.69-.23Z"/>
        <path d="M49.41,15.82h1.93c1.52,0,2.24.66,2.24,2.11,0,1.04-.38,1.66-1.2,1.78,1.01.24,1.43.93,1.43,2.13,0,1.45-.65,2.4-2.16,2.4h-2.24v-8.41ZM51.27,19.33c.99,0,1.29-.4,1.29-1.4,0-1.15-.51-1.24-1.7-1.24h-.28v2.64h.7ZM51.37,23.39c1.05,0,1.32-.47,1.32-1.56s-.38-1.61-1.41-1.61h-.7v3.17h.79Z"/>
        <path d="M54.66,24.88c.81,0,1.09-.09,1.09-.45,0-.12-.11-.61-.23-1.1l-1.2-5.11h1.12l.81,4.48.78-4.48h1.12l-1.43,6.33c-.2.87-.83,1.17-1.92,1.17h-.13v-.85Z"/>
      </g>
    </g>
  </g>
</svg>
  
  		</div>
</a>
</div>
<style>
	@keyframes rotate-infinite {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
	.logo-circle {
		  animation: rotate-infinite 35s linear infinite; /* Adjust the duration as needed */
  transform-origin: center;
		transform-box: fill-box;
		transform-origin: 50% 50%;
	}
	.precise-wolf-digital-logo g.precise-wolf-logo-text, 
	.precise-wolf-digital-logo g.logo-circle *{
transition:all .25s ease-in-out;
}
.precise-wolf-digital-logo:hover g.precise-wolf-logo-text {
    fill:#0f9fda;
}
.precise-wolf-digital-logo:hover g.logo-circle * {
    stroke: #0f9fda;
}
g.site-created-text {
    fill: black;
}
.text-white g.logo-circle * {
    stroke: white;
}
.text-white .precise-wolf-logo-text,
.text-white .site-created-text * {
    fill:white;
}
.text-white g.site-created-text {
    fill: white;
}
</style>
<!-- end of backlink -->

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
<div class="modal-content-menu modal-content-custom bg-white" style="padding: 50px 15px 100px;
    margin-top: 0;
    margin-left: 0;
    margin-bottom: 0;
    border-left: 0;
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    height: 100vh;">
<span class="close-custom" id="navMenuClose">&times;</span>
	<?php

echo '<div style="width:100%;max-width:165px;" id="logoMain">';
echo '<a href="' . home_url() . '" title="Homepage link for ' . get_bloginfo('name') . ' - ' . get_bloginfo('description') . '">';

if (logoImg()) {
echo wp_get_attachment_image(logoImg()['id'], 'full','',array(
'class'=>'w-100 h-auto skip-lazy',
'style'=>''
));
} else {
echo logoSVG(); 
}

echo '</a>';
echo '</div>';

wp_nav_menu(array(
    'menu' => 'primary',
    'menu_class'=>'menu list-unstyled mb-0'
));

?>
<div class="">
<?php
echo do_shortcode('[global_cta]');
?>
</div>

<?php

echo get_template_part('partials/si');

?>

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