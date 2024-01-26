# Top-Bottom-Scroll

Enhance your React components with dual-scroll functionality using the react-top-bottom-scroll package. By default, HTML provides a single scrollbar at the bottom of a container when overflow occurs. However, with react-top-bottom-scroll, you can effortlessly add mirrored scrollbars at both the top and bottom of any component or HTML element.

## Features

- Add scroll on top and bottom of HTML elements.
- Mirrors the scrolls.

## Installation

Top bottom scroll requires [React.js](https://react.dev/) to run.

Install the package.

```sh
npm i top-bottom-scroll
```

To using this package, wrap your components into this. Below code snippet shows a working example. 

```
<TopBottomScroll styling={{ position: 'relative' }}>
    <newDataTable
        data={data}
        columns={columns}
    />
</TopBottomScroll>
```
***Happy Coding :)***
## License

MIT
