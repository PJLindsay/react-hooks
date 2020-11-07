# react-hooks

refactor an app to replace Redux with react hooks

## Concepts

### Why would you want to replace redux?

- To stay in "React only" world
- smaller bundle (ship less code)

### Alternative: Context API

- great for Authentication

### When would you *not* want to use Context API

- high frequency (e.g. toggling Favourites)

### Alternative: Custom Hook as a Store

- use React.memo to make sure items don't re-render if props don't change

## Installation

npm install



## Serve

Launch (Development mode)

  $ npm run dev



## Build

Build (Production)

  $ npm run build

Ship entire project to a host which can host Node.js
