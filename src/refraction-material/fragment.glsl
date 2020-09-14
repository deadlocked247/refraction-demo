uniform sampler2D envMap;
uniform sampler2D backfaceMap;
uniform vec2 resolution;

varying vec3 worldNormal;
varying vec3 viewDirection;

float ior = 1.5;
float a = 0.33;

vec3 fogColor = vec3(1.0);
vec3 reflectionColor = vec3(1.0);

float fresnelFunc(vec3 viewDirection, vec3 worldNormal) {
	return pow( 1.0 + dot( viewDirection, worldNormal), 3.0 );
}

void main() {
	vec2 uv = gl_FragCoord.xy / resolution;

	vec3 backfaceNormal = texture2D(backfaceMap, uv).rgb;

	vec3 normal = worldNormal * (1.0 - a) - backfaceNormal * a;

	vec3 refracted = refract(viewDirection, normal, 1.0/ior);
	uv += refracted.xy;

	vec4 tex = texture2D(envMap, uv);

	float fresnel = fresnelFunc(viewDirection, normal);

	vec4 color = tex;

	color.rgb = mix(color.rgb, reflectionColor, fresnel);

	gl_FragColor = vec4(color.rgb, 1.0);
}