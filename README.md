# Triangulate plugin
Built by Tedi @RepEquity

## Run plugin with defaults
Include triangulate javascript and css files. Javascript file must be included after jQuery is included.
```js
$('body').triangulate();
```

## Plugin options
```js
$('body').triangulate({
  // Default stroke colors are #CED2D5 and #F6D3D2. Accepts all css color formats.
  colors: ['#000', 'red'],
  // Frequency of triangles. Default is 5.
  frequency: 8
});
```
