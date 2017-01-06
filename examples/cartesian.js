const regl = require('regl')({
  extensions: ['oes_standard_derivatives']
});
const glsl = require('glslify');
document.querySelector('canvas').addEventListener('mousewheel', e => e.preventDefault());
const camera = require('regl-camera')(regl, {distance: 15, center: [0, 4, 0], theta: 1.9, phi: 0.3});
const mesh = require('bunny');

const draw = regl({
  frag: glsl`
    #extension GL_OES_standard_derivatives : enable
    precision mediump float;
    #pragma glslify: grid = require(../cartesian/scaled)
    varying vec3 p;
    void main () {
      gl_FragColor = vec4(vec3(grid(p.xy * 5.0, 1.0)), 1);
    }
  `,
  vert: `
    precision mediump float;
    uniform mat4 projection, view;
    attribute vec3 position;
    varying vec3 p;
    void main () {
      p = position;
      gl_Position = projection * view * vec4(position, 1);
    }
  `,
  attributes: {
    position: mesh.positions,
  },
  elements: mesh.cells,
});

regl.frame(function () {
  regl.clear({color: [1, 1, 1, 0], depth: 1});
  camera(draw);
});
