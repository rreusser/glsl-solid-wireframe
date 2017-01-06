float gridFactor (float parameter, float width, float feather) {
  float l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
  return smoothstep(width - feather, width + feather, l);
}

float gridFactor (vec2 parameter, float width, float feather) {
  vec2 l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
  vec2 a2 = smoothstep(width - feather, width + feather, l);
  return min(a2.x, a2.y);
}

float gridFactor (vec3 parameter, float width, float feather) {
  vec3 l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
  vec3 a3 = smoothstep(width - feather, width + feather, l);
  return min(min(a3.x, a3.y), a3.z);
}

float gridFactor (vec4 parameter, float width, float feather) {
  vec4 l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
  vec4 a4 = smoothstep(width - feather, width + feather, l);
  return min(min(min(a4.x, a4.y), a4.z), a4.w);
}

float gridFactor (float parameter, float width) {
  float l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
  return smoothstep(width - 0.05, width + 0.05, l);
}

float gridFactor (vec2 parameter, float width) {
  vec2 l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
  vec2 a2 = smoothstep(width - 0.05, width + 0.05, l);
  return min(a2.x, a2.y);
}

float gridFactor (vec3 parameter, float width) {
  vec3 l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
  vec3 a3 = smoothstep(width - 0.05, width + 0.05, l);
  return min(min(a3.x, a3.y), a3.z);
}

float gridFactor (vec4 parameter, float width) {
  vec4 l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
  vec4 a4 = smoothstep(width - 0.05, width + 0.05, l);
  return min(min(min(a4.x, a4.y), a4.z), a4.w);
}

#pragma glslify: export(gridFactor)
