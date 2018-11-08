An Overview of this Repo
===

Maybe you are looking at this repo because you would like to know how I built this website. I have looked a good handful of personal websites myself, and often the source is jumbled and can be confusing. My first iteration of `resprit.com` was extremely simple and basic. My second iteration attempted to be more structured, use a build process, and follow more idiomatic conventions. This is currently the third iteration, with the second iteration converted into the resume page. The way this code base is setup is not perfect, and it is certainly already outdated, but I have been at least a little bit careful to make sure things are somewhat sensible.

So, despite the fact that my Github insights claim that this repo gets so few visitors there isn't even any traffic data to show me, I will attempt to explain how all of this nonsense works.

## Getting Started

If you would like to get this website up and running locally, you can do the following:

- Clone this repo from `https://github.com/RESPRiT/resprit.github.io.git` (HTTPS)
- Run `npm i` (or `npm install`) to install all the dependencies
- Run `npm start` to get a local development server on port 9000
- Open `localhost:9000` in your web browser to see the website

## Build Process

To actually build the website for "production," you can simply run `npm run build`. This script does two things: it runs Harp's build command and copies the CNAME file to the output folder. This will create a folder called `build` that contains the resulting file output.

To deploy the website to Github pages, you can run `npm run deploy`. This script does a full build via `npm run build` and then uses a package called [gh-pages](https://www.npmjs.com/package/gh-pages) to make it easy to publish to Github pages. Finally, the build folder is deleted.

User pages (`[name].github.io` sites) must be built from the `master` branch. Since my website must be built to run on standard browsers, I target `master` as my production branch and work on a `dev` branch I made for the actual source code.

## Tools

### Harp

[Harp](http://harpjs.com/) is a "static web server with built-in preprocessing." It might also be called a "static site generator." Neither of those terms are that clear in my opinion, but basically it means that Harp aggregates and processes a lot of your content for you so that you don't need to worry about that part of the build process. The output is simple HTML and CSS that can be rendered on any browser.

### Sass
[Sass](https://sass-lang.com/) is a CSS extension language that adds a lot of functionality to CSS (such as variables) and can be compiled down to vanilla CSS. I use it in this project because I honestly don't know how to write normal CSS since I started with SCSS first, and it's really cheap in the build process and makes things easier.

### Jade/Pug

[Jade](https://github.com/pugjs/pug) is the former name of Pug, a template engine. In understandable terms, Pug is a flavor of HTML that looks kind of like Python and adds a lot of dynamic features to the language. I use Pug (technically Jade in this project because Harp is old and only supports Jade) because I don't like closing tags and it lets me reuse layouts easily and generate layouts from data in a somewhat elegant way.

## Files Structure
Below, I annotate the different files in this repo:

```
.
├── CNAME  // This file lets me use my own URL for the site
├── _harp  // The source directory, probably should be called `src` instead
│   ├── harp.json // Default data, not sure I actually need this
│   └── public    // Contains everything that I expect to become public facing
│       ├── about.md  // Each Markdown file is for an individual page and contains the body content
│       ├── assets  // This is where I put things that are either media or styling
│       │   ├── css
│       │   │   ├── main.scss  // Aggregates all the SCSS into one sheet
│       │   │   └── _partials
│       │   │       ├── _base.scss        // "Universal" styling
│       │   │       ├── _fonts.scss       // Handles fonts
│       │   │       ├── _mainpage.scss    // Styling for the standard layout
│       │   │       ├── _reset.scss       // A "reset" sheet to have a clean slate for styling
│       │   │       ├── _resume.scss      // Styling for the resume page
│       │   │       └── _typography.scss  // Styling for how text is laid out
│       │   ├── docs
│       │   │   └── ...
│       │   ├── fonts
│       │   │   └── ...
│       │   └── img
│       │       └── ...
│       ├── _data.json  // Contains all the metadata for each of the pages, including all my resume info and page titles
│       ├── index.md
│       ├── _layout.jade  // The layout for the general site, mainly the header data and footer
│       ├── _partials
│       │   ├── _main.jade   // The layout for the main content, mainly the menu and text body
│       │   └── _resume.jade // The layout for the resume page, which is generated from the data
│       ├── research.md
│       └── resume.jade  // This is a Jade file unlike the Markdown files so that I can slot in the resume partial somewhere and still get the `/resume` path
├── package.json      // Scripts and dependencies
├── package-lock.json // Standard generated lock file
└── README.md         // This file
```

## Final Thoughts

This README is not a tutorial but hopefully gives some overview and context for this repository. It is worth noting that this website has no JavaScript on it. This is because I wanted to reduce the download size and have a performant site, especially considering how simple the design is. I also manually compile and publish all the content, rather than using a service such as Firebase to serve dynamic JSON content to each page. For similar reasons as before, I figured that I won't need to update the site that often, and it's quite easy to do with the `deploy` script if it do. This allows me to have a perfectly static site that is also small in size and simple.