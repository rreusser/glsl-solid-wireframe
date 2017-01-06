var glsl = require('glslify');
var wireframe = require('../');
var extend = require('xtend/mutable');
var bunny = require('bunny');

var regl = require('regl')({extensions: ['oes_standard_derivatives']});
var camera = require('regl-camera')(regl, {
  distance: 20,
  center: [0, 5, 0],
  theta: Math.PI * 0.5,
  phi: 0.0
});

var params = {
  type: 'barycentric',
  standardDeriv: true,
  cartesianX: 1.0,
  cartesianY: 1.0,
  cartesianZ: 1.0,
  width: 1.0,
  feather: 0.5,
};

var panel = require('h')('div');
document.querySelector('canvas').addEventListener('mousewheel', e => e.preventDefault());
document.body.appendChild(panel);
panel.addEventListener('mousewheel', e => e.stopPropagation());
panel.addEventListener('mousemove', e => e.stopPropagation());
panel.addEventListener('mousedown', e => e.stopPropagation());
panel.addEventListener('mouseup', e => e.stopPropagation());

require('control-panel')([
  {type: 'select', label: 'type', initial: params.type, options: ['barycentric', 'cartesian']},
  {type: 'checkbox', label: 'standardDeriv', initial: params.standardDeriv},
  {type: 'range', label: 'width', initial: params.width, min: 0.0, max: 5.0, step: 0.01},
  {type: 'range', label: 'feather', initial: params.feather, min: 0.0, max: 5.0, step: 0.01},
  {type: 'range', label: 'cartesianX', initial: params.cartesianX, min: 0.0, max: 5.0, step: 0.1},
  {type: 'range', label: 'cartesianY', initial: params.cartesianY, min: 0.0, max: 5.0, step: 0.1},
  {type: 'range', label: 'cartesianZ', initial: params.cartesianZ, min: 0.0, max: 5.0, step: 0.1},
], {root: panel}).on('input', data => extend(params, data));

var draw = makeDrawCmd(regl)
regl.frame(function () {
  regl.clear({color: [0.2, 0.2, 0.2, 1], depth: 1});
  setParams(params, () => {
    camera(() => {
      draw[params.type][params.standardDeriv ? 'scaled' : 'unscaled']();
    });
  });
})

var setParams = regl({
  uniforms: {
    cartesianX: (c, p) => p.cartesianX,
    cartesianY: (c, p) => p.cartesianY,
    cartesianZ: (c, p) => p.cartesianZ,
    width: (c, p) => p.width,
    feather: (c, p) => Math.max(p.feather, 1e-4),
    feather: (c, p) => p.feather,
  }
});

function makeDrawCmd (regl) {
  var mesh = wireframe(bunny, {
    attributes: {
      positions: bunny.positions
    }
  });

  function makeCmd(frag) {
    return regl({
      frag: frag,
      vert: `
        precision mediump float;
        uniform mat4 projection, view;
        attribute vec3 position;
        attribute vec2 barycentric;
        varying vec3 p;
        varying vec2 b;
        void main () {
          b = barycentric;
          p = position;
          gl_Position = projection * view * vec4(position, 1);
        }
      `,
      attributes: {
        position: mesh.positions,
        barycentric: mesh.barycentric
      },
      elements: mesh.cells,
    })
  }

  return {
    barycentric: {
      scaled: makeCmd(glsl`
        #extension GL_OES_standard_derivatives : enable
        precision mediump float;
        #pragma glslify: grid=require(../barycentric/scaled)
        varying vec2 b;
        uniform float width, feather;
        void main () {
          float g = grid(b, width, feather);
          gl_FragColor = vec4(mix(vec3(0), vec3(0.8), g), 1);
        }
      `),
      unscaled: makeCmd(glsl`
        precision mediump float;
        #pragma glslify: grid=require(../barycentric/unscaled)
        varying vec2 b;
        uniform float width, feather;
        void main () {
          float g = grid(b, width, feather);
          gl_FragColor = vec4(mix(vec3(0), vec3(0.8), g), 1);
        }
      `),
    },
    cartesian: {
      scaled: makeCmd(glsl`
        #extension GL_OES_standard_derivatives : enable
        precision mediump float;
        #pragma glslify: grid=require(../cartesian/scaled)
        varying vec2 b;
        varying vec3 p;
        uniform float cartesianX, cartesianY, cartesianZ;
        uniform float width, feather;
        void main () {
          float g = grid(
            vec3(
              cartesianX > 0.0 ? p.x * cartesianX : 0.5,
              cartesianY > 0.0 ? p.y * cartesianY : 0.5,
              cartesianZ > 0.0 ? p.z * cartesianZ : 0.5
            ), width, feather);
          gl_FragColor = vec4(mix(vec3(0), vec3(0.8), g), 1);
        }
      `),
      unscaled: makeCmd(glsl`
        #extension GL_OES_standard_derivatives : enable
        precision mediump float;
        #pragma glslify: grid=require(../cartesian/unscaled)
        varying vec2 b;
        varying vec3 p;
        uniform float cartesianX, cartesianY, cartesianZ;
        uniform float width, feather;
        void main () {
          float g = grid(
            vec3(
              cartesianX > 0.0 ? p.x * cartesianX : 0.5,
              cartesianY > 0.0 ? p.y * cartesianY : 0.5,
              cartesianZ > 0.0 ? p.z * cartesianZ : 0.5
            ), width, feather);
          gl_FragColor = vec4(mix(vec3(0), vec3(0.8), g), 1);
        }
      `),
    }
  };
}
