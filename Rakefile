require 'html-proofer'

desc 'Build Jekyll site'
task :build do
  sh 'bundle exec jekyll build'
end

desc 'Run html-proofer tests on built site'
task :test => :build do
  options = {
    # Validation options
    assume_extension: true,        # /about matches /about.html
    check_html: true,              # Validate HTML structure
    check_img_http: true,          # Ensure images exist
    allow_hash_href: true,         # Allow href="#" for JS links

    # External link options
    only_4xx: true,                # Only fail on 4xx errors (not 5xx server errors)
    typhoeus: {
      timeout: 30,                 # 30 seconds per request
      connecttimeout: 20           # 20 seconds to connect
    },

    # Ignore patterns
    ignore_urls: [
      /linkedin\.com/,             # Often blocks bots
      /formspree\.io/              # Form submission endpoint
    ],
    ignore_files: [
      /\/_site\/files\//           # Skip downloadable files
    ],

    # Parallel execution
    parallel: {
      in_processes: 4              # Run 4 parallel processes
    }
  }

  HTMLProofer.check_directory('./_site', options).run
end

desc 'Run security audit on dependencies'
task :audit do
  sh 'bundle audit check --update'
end

task default: :test
