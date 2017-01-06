float gridFactor (vec2 vBC, float width, float feather) {
  vec3 bary = vec3(vBC.x, vBC.y, 1.0 - vBC.x - vBC.y) * 3.0;
  vec3 a3 = smoothstep(vec3(width - feather), vec3(width + feather), bary);
  return min(min(a3.x, a3.y), a3.z);
}

float gridFactor (vec2 vBC, float width) {
  vec3 bary = vec3(vBC.x, vBC.y, 1.0 - vBC.x - vBC.y) * 3.0;
  vec3 a3 = smoothstep(vec3(width - 0.5), vec3(width + 0.5), bary);
  return min(min(a3.x, a3.y), a3.z);
}

#pragma glslify: export(gridFactor)
