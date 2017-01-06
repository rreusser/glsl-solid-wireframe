const regl = require('regl')({
  extensions: ['oes_standard_derivatives']
});
const glsl = require('glslify');
document.querySelector('canvas').addEventListener('mousewheel', e => e.preventDefault());
const camera = require('regl-camera')(regl, {distance: 15, center: [0, 4, 0], theta: 1.9, phi: 0.3});
const mesh = require('../')(require('bunny'));

const draw = regl({
  frag: glsl`
    #extension GL_OES_standard_derivatives : enable
    precision mediump float;
    #pragma glslify: grid = require(../barycentric/scaled)
    varying vec2 b;
    void main () {
      gl_FragColor = vec4(vec3(grid(b, 1.0)), 1);
    }
  `,
  vert: `
    precision mediump float;
    uniform mat4 projection, view;
    attribute vec3 position;
    attribute vec2 barycentric;
    varying vec2 b;
    void main () {
      b = barycentric;
      gl_Position = projection * view * vec4(position, 1);
    }
  `,
  attributes: {
    position: mesh.positions,
    barycentric: mesh.barycentric
  },
  elements: mesh.cells,
});

regl.frame(function () {
  regl.clear({color: [1, 1, 1, 0], depth: 1});
  camera(draw);
});
