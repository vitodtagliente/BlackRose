const VertexSource: string = `#version 300 es
in vec4 a_position;
in vec2 a_texcoord;
in mat4 a_transform;
 
// a varying to pass the texture coordinates to the fragment shader
out vec2 v_texcoord;
 
void main() {
  // Multiply the position by the matrix.
  gl_Position = a_transform * a_position;
 
  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}
`;

const FragmentSource: string = `#version 300 es
precision highp float;
 
// Passed in from the vertex shader.
in vec2 v_texcoord;
 
// The texture.
uniform sampler2D u_texture;
 
out vec4 outColor;
 
void main() {
   outColor = texture(u_texture, v_texcoord);
}
`;

export 
{
    VertexSource,
    FragmentSource
}