float gridFactor (float parameter, float width, float feather) {
  float w1 = width - feather * 0.5;
  float d = fwidth(parameter);
  float looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
  return smoothstep(d * w1, d * (w1 + feather), looped);
}

float gridFactor (vec2 parameter, float width, float feather) {
  float w1 = width - feather * 0.5;
  vec2 d = fwidth(parameter);
  vec2 looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
  vec2 a2 = smoothstep(d * w1, d * (w1 + feather), looped);
  return min(a2.x, a2.y);
}

float gridFactor (vec3 parameter, float width, float feather) {
  float w1 = width - feather * 0.5;
  vec3 d = fwidth(parameter);
  vec3 looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
  vec3 a3 = smoothstep(d * w1, d * (w1 + feather), looped);
  return min(min(a3.x, a3.y), a3.z);
}

float gridFactor (vec4 parameter, float width, float feather) {
  float w1 = width - feather * 0.5;
  vec4 d = fwidth(parameter);
  vec4 looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
  vec4 a4 = smoothstep(d * w1, d * (w1 + feather), looped);
  return min(min(min(a4.x, a4.y), a4.z), a4.w);
}

float gridFactor (float parameter, float width) {
  float d = fwidth(parameter);
  float looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
  return smoothstep(d * (width - 0.5), d * (width + 0.5), looped);
}

float gridFactor (vec2 parameter, float width) {
  vec2 d = fwidth(parameter);
  vec2 looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
  vec2 a2 = smoothstep(d * (width - 0.5), d * (width + 0.5), looped);
  return min(a2.x, a2.y);
}

float gridFactor (vec3 parameter, float width) {
  vec3 d = fwidth(parameter);
  vec3 looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
  vec3 a3 = smoothstep(d * (width - 0.5), d * (width + 0.5), looped);
  return min(min(a3.x, a3.y), a3.z);
}

float gridFactor (vec4 parameter, float width) {
  vec4 d = fwidth(parameter);
  vec4 looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
  vec4 a4 = smoothstep(d * (width - 0.5), d * (width + 0.5), looped);
  return min(min(min(a4.x, a4.y), a4.z), a4.z);
}

#pragma glslify: export(gridFactor)
