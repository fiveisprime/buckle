http_path = "/"
sass_dir = "client/styles/sass/"

css_dir = "client/styles/"
http_stylesheets_path = "/styles/"

images_dir = "client/img/"
http_images_path = "/img/"

javascripts_dir = "client/js"
http_javascripts_path = "js"

fonts_dir = "client/fonts/"
http_fonts_path = "/fonts/"

output_style = (environment == :production) ? :compressed : :expanded
line_comments = (environment == :production) ? false : true
relative_assets = false
