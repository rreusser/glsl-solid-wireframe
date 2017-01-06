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

float gridFactor (float parameter, float width) {
  float l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
  return smoothstep(width - 0.5, width + 0.5, l);
}

float gridFactor (vec2 parameter, float width) {
  vec2 l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
  vec2 a2 = smoothstep(width - 0.5, width + 0.5, l);
  return min(a2.x, a2.y);
}

float gridFactor (vec3 parameter, float width) {
  vec3 l = 1.0 - 2.0 * abs(mod(parameter, 1.0) - 0.5);
  vec3 a3 = smoothstep(width - 0.5, width + 0.5, l);
  return min(min(a3.x, a3.y), a3.z);
}


#pragma glslify: export(gridFactor)
