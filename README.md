# [aslavchev.github.io](https://aslavchev.github.io/)

[![Workflow Validation](https://github.com/aslavchev/aslavchev.github.io/actions/workflows/linter.yml/badge.svg)](https://github.com/aslavchev/aslavchev.github.io/actions/workflows/linter.yml)

Welcome to my personal portfolio website repository! This site is hosted at aslavchev.github.io and serves as a showcase of my work, skills, and professional experience.


## 🌟 About
This repository hosts my personal portfolio website, built using [Jekyll](https://jekyllrb.com/) and styled with the [Freelancer Bootstrap theme](https://startbootstrap.com/theme/freelancer). It showcases my projects, skills, and contact information.

---

## 🚀 Features

- Responsive design
- Portfolio/project section
- Contact form
- Blog support
- Clean, modern aesthetic

---

## 🛠️ Technologies Used

- Jekyll
- Bootstrap (Freelancer theme)
- Font Awesome
- HTML5, CSS3, JavaScript
- GitHub Pages

---

## 📁 Project Structure

```
aslavchev.github.io/
├── _includes/                  # ➤ Reusable HTML partials
│   ├── css/                    # ➤ (Legacy?) CSS includes
│   ├── about.html              # ➤ About section include
│   ├── contact_disqus.html     # ➤ Contact form with Disqus
│   ├── contact_static.html     # ➤ Static version of contact form
│   ├── contact.html            # ➤ Main contact include
│   ├── footer.html             # ➤ Footer section
│   ├── head.html               # ➤ HTML <head> meta info
│   ├── header.html             # ➤ Header section
│   ├── js_disqus.html          # ➤ JavaScript for Disqus
│   ├── js.html                 # ➤ General JS include
│   ├── modals.html             # ➤ Modal dialog content
│   ├── nav.html                # ➤ Navigation bar
│   └── portfolio_grid.html     # ➤ Grid layout for portfolio
├── _layouts/                   # ➤ Page/post layout templates
├── _posts/                     # ➤ Blog post content
├── .github/                    # ➤ GitHub config (CI, templates)
│   ├── ISSUE_TEMPLATE/         # ➤ GitHub issue templates
│   └── workflows/              # ➤ GitHub Actions workflows
│       └── linter.yml          # ➤ YAML for linting CI
├── css/                        # ➤ General CSS folder
│   └── font-awesome/           # ➤ Font Awesome icon assets
│       ├── css/                # ➤ Font Awesome CSS
│       └── webfonts/           # ➤ Webfont files
├── files/                      # ➤ Miscellaneous downloads/files
├── img/                        # ➤ Image assets
│   ├── portfolio/              # ➤ Portfolio-specific images
│   ├── profile-old.png         # ➤ Old profile image
│   └── profile.png             # ➤ New/current profile image
├── js/                         # ➤ JavaScript source files
├── mail/                       # ➤ Backend server scripts
│   └── contact_me.php          # ➤ Contact form PHP handler
├── _config.yml                 # ➤ Jekyll config
├── .gitignore                  # ➤ Git ignore list
├── .htmlhintrc                 # ➤ HTMLHint config
├── .travis.yml                 # ➤ Travis CI config
├── feed.xml                    # ➤ Atom/RSS feed file
├── freelancer-theme-jekyll.gemspec  # ➤ Jekyll theme gemspec
├── Gemfile                     # ➤ Ruby gem dependencies
├── index.html                  # ➤ Home page
├── LICENCE                     # ➤ License file for the project
├── Rakefile                    # ➤ Automation tasks using Rake (like Makefile)
├── README.md                   # ➤ Project overview and instructions
├── screenshot.png              # ➤ Screenshot of the website for preview
└── style.css                   # ➤ Custom styles for the site

```


---

## 🧑‍💻 Run Locally

To run the site on your local machine:

### Prerequisites

- Ruby (>= 2.7.0)
- Bundler
- Jekyll (`gem install jekyll`)
- Optional: Docker and Docker Compose

### Steps

```bash
# Clone the repository
git clone https://github.com/aslavchev/aslavchev.github.io.git
cd aslavchev.github.io

# Install dependencies
bundle install

# Serve the site locally
bundle exec jekyll serve

# Visit http://localhost:4000

```
Visit: http://localhost:4000

---

## 🐳 Run with Docker

If you prefer Docker, here's how to containerize the Jekyll site.
### Dockerfile
```
FROM ruby:3.2

# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

# Set working directory
WORKDIR /usr/src/app

# Copy Gemfile and lockfile
COPY Gemfile Gemfile.lock ./

# Install Ruby gems
RUN bundle install

# Copy the rest of the application
COPY . .

# Expose port used by Jekyll
EXPOSE 4000

# Start the Jekyll server
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload"]

```

### Build and Run Docker Container
```
# Build the image
docker build -t personal-website .

# Run the container
docker run -p 4000:4000 personal-website
```
Visit: http://localhost:4000

---

## 🐳 Run with Docker Compose
### docker-compose.yml
```
version: "3.8"

services:
  jekyll:
    build: .
    ports:
      - "4000:4000"         # Jekyll site
      - "35729:35729"       # LiveReload port
    volumes:
      - .:/usr/src/app      # Mount local files for live updates
    command: bundle exec jekyll serve --host 0.0.0.0 --livereload

```
### Run via Compose
```
docker compose up --build

```
Visit: http://localhost:4000

### Stop Services
```
docker compose down
```
---

### 📄 License

This project is licensed under the MIT License.

--- 

### 📬 Contact
- Website: [https://aslavchev.github.io](https://aslavchev.github.io)
- LinkedIn: [https://www.linkedin.com/in/aslavchev](linkedin.com/in/aleksandar-slavchev-187313213)


---



Freelancer Jekyll theme  
=========================

Jekyll theme based on [Freelancer bootstrap theme ](http://startbootstrap.com/template-overviews/freelancer/)

## How to use
 - Place a image in `/img/portfolio/`
 - Replace `your-email@domain.com` in `_config.yml` with your email address. Refer to [formspree](http://formspree.io/) for more information.
 - Create posts to display your projects. Use the follow as an example:
```txt
---
layout: default
modal-id: 1
date: 2020-01-18
img: cabin.png
alt: image-alt
project-date: January 2020
client: The Client
category: Web Development
description: The description of the project

---
```

## Demo
View this jekyll theme in action [here](https://jeromelachaud.com/freelancer-theme)

## Screenshot
![screenshot](https://raw.githubusercontent.com/jeromelachaud/freelancer-theme/master/screenshot.png)

---------
For more details, read the [documentation](http://jekyllrb.com/)
