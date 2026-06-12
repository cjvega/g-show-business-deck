# G-Show HTML Deck Publish Package

This directory is a self-contained GitHub Pages package for the G-Show
business presentation.

## Structure

```text
g-show-business-html-deck-pages/
├── index.html
├── slides/
├── shared/
├── images/
│   └── thumbs/
└── .nojekyll
```

## GitHub Pages

If GitHub Pages is configured to publish from the repository `docs/`
directory, the deck URL will be:

```text
https://<user-or-org>.github.io/<repo>/g-show-business-html-deck-pages/
```

The deck supports Chinese / English switching:

- Click `中文 / EN` in the top-right corner.
- Press `L` during presentation to switch language instantly.

## Image Optimization

The original PNG scenario photos were converted to 1400px-wide WebP files.
The index overview defaults to a full-screen auto-sliding gallery using
separate 720px-wide WebP thumbnails from `images/thumbs/`, so the first screen
does not load slide iframes or large display images.

The publish package is about 1.4 MB and is intended for browser sharing.
