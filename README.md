# govtest

A declarative A/B testing tool for content experiments.

## Usage

Write A/B tests without any Javascript or configuration by using markup like the following.

```
<div experiment="Experiment Name">
  <div variant="default">
    Default Variant
  </div>
  <div variant="b">
    Variant B
  </div>
</div>
```

In this example, only one of the `variant`s in the `experiment` will display to users. In the event that govtest fails to load, or the user has Javascript disabled, only the variant with the attribute `variant=default` will be displayed.

The value of the `variant` attribute can be any string.

## Installation

Include the following markup in your `<head>` block. This needs to load before your actual content does, so that users don’t see a flash of incorrect content.

```
<style>[variant]{display:none}[variant=default]{display:block}</style><script src="main.js"></script>
```

## API

govtest exposes some information about current experiments through a `govtest` global object.

### activeExperiments
An object with a key corresponding to each active experiment on the current page.

Each key's value is an array of variants for that experiment.

The key also has a property – `active` – which is the variant name currently active.

```
govtest.activeExperiments

{
  "Experiment Name": [
    {
      name: "default",
      el: DOMNode
    },
    {
      name: "b",
      el: DOMNode
    },
  ]
}
```

```
govtest.activeExperiments["Experiment Name"].active

'default'
```

### profile
This allows direct access to the profile for the current user.

This might be useful to place in a user’s profile for analytics purposes as they travel around the site, if your content experiment is placed on multiple pages, or your test goal is elsewhere on the site.

It returns an object with the index of the `variant` DOMNode in each `experiment` a user has been allocated.

```
govtest.profile

{"Experiment Name": 0}

## Development

Requires

- node.js
- `uglify-js` installed globally (`npm install uglify-js -g`) to run on command line

`npm run build` outputs main.min.js.

Tests needed…

## Some timing info

This script waits `onreadystatechange` to reach `interactive`, which means it won’t block HTML from loading. The `interactive` readystate is the earliest point the underlying content is present in the page, which enables this tool to work declaratively.

This also minimises or avoids layout reflows as experiments are activated.