<?php
/*
Plugin Name: Woo Example Cart API
Plugin URI: https://example.com/
Description: A very basic WooCommerce example interaction with the cart API.
Version: 1.0.0
Author: Your Name
Author URI: https://example.com/
License: GPL2
*/

function woo_test_enqueue_scripts() {
    if (!is_admin() && ! is_checkout()) {
        wp_enqueue_script(
            'woo-test-frontend',
            plugin_dir_url(__FILE__) . 'build/index.js',
            array('wc-blocks-data-store'), // dependencies
            filemtime(plugin_dir_path(__FILE__) . 'build/index.js'),
            true // load in footer
        );
    }
}
add_action('wp_enqueue_scripts', 'woo_test_enqueue_scripts');


add_action('wp_body_open', function() {
    echo '<ul id="woo-test-cart" style="position:fixed; bottom:20px; right:20px; padding:32px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.1); border-radius:8px; z-index:9999;"></ul>';
});