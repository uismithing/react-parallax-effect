## React Parallax Effect

React-Parallax-Effect is a React component designed for deploying content into a view that relies on srolling for navigation. The content can be arranged in layers that mimic the parallax effect, and move at different velocities while scrolling. Layers are assigned by passing them in as children to the component. The first child node determines the scrolling range and motion of its siblings. The parallax differential is determined by the rangeIndex property assigned to each child. The value of the rangeIndex determines the magnitude of the speed differential applied to the layer. Callbacks are abailable for onReady and onChange, and a jumpTo() method is used to adjuste the scroll location of the first child. The effect presents the designer and user creative ways for presenting and interacting with content.

### Features
  * Full React/Flux pattern
  * Minimal dependencies (lodash, react-velocity)
  * Callbacks for onReady and onChange
  * Method for jumpTo
  * Fluid layout
  * CSS Rich

### Learn more
See the demo at [http://www.uismithing.com/main/wares/parallax](http://www.uismithing.com/main/wares/parallax).

### Repository
[https://github.com/uismithing/react-parallax-effect](https://github.com/uismithing/react-parallax-effect)

### Install
`npm install react-parallax-effect -s`

### Deploy
`import Parallax from "react-parallax-effect"`
```html
<Parallax ref="reactparallax" {...props}>
  <!--
    - parallax children
    - rangeIndex must be >= 1
    - the first child assumes scroll authority of sibling child layers
    - rangeIndex determines the scroll speed; e.g. rangeIndex=2 scrolls half the speed of rangeIndex=1
    - the stack order of the children determines thier order in the z-index stack
  -->
  <div ref="layer_0" rangeIndex="1">
    <!-- layer children -->
  </div>
  <div ref="layer_1" rangeIndex="2">
    <!-- layer children -->
  </div>
  ...
  <div ref="layer_n" rangeIndex="n">
    <!-- layer children -->
  </div>
</Parallax>
```

### props
  * Panel:{}
  * Viewport:{}