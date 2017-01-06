float gridFactor (vec2 vBC, float width, float feather) {
  float w1 = width - feather * 0.5;
  vec3 bary = vec3(vBC.x, vBC.y, 1.0 - vBC.x - vBC.y);
  vec3 d = fwidth(bary);
  vec3 a3 = smoothstep(d * w1, d * (w1 + feather), bary);
  return min(min(a3.x, a3.y), a3.z);
}

float gridFactor (vec2 vBC, float width) {
  vec3 bary = vec3(vBC.x, vBC.y, 1.0 - vBC.x - vBC.y);
  vec3 d = fwidth(bary);
  vec3 a3 = smoothstep(d * (width - 0.5), d * (width + 0.5), bary);
  return min(min(a3.x, a3.y), a3.z);
}

#pragma glslify: export(gridFactor)
