(this.webpackJsonprefraction=this.webpackJsonprefraction||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,i){e.exports=i(28)},,,,,function(e,t,i){},function(e,t,i){e.exports=i.p+"static/media/logo.5d5d9eef.svg"},function(e,t,i){},,function(e,t,i){},function(e,t,i){e.exports=i.p+"static/media/vertex.2ded267d.glsl"},function(e,t,i){e.exports=i.p+"static/media/fragment.28d3296b.glsl"},function(e,t,i){e.exports=i.p+"static/media/vertex.1468f7a2.glsl"},function(e,t,i){e.exports=i.p+"static/media/fragment.2d5e6faf.glsl"},function(e,t,i){"use strict";i.r(t);var n=i(7),r=i.n(n),a=i(12),o=i.n(a);i(19),i(20),i(21);var s=function(){return r.a.createElement("div",{className:"App"})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var h=i(8),c=i.n(h),d=i(10),l=i(1),v=i(4),u=(i(23),i(0));var p=new(i(13).a),m=function(e,t){return new Promise((function(t,i){p.load(e,(function(e){var i={model:e.scene};t(i)}))}))},f=i(2),w=i(3),g=(i(24),i(25),function(e){Object(f.a)(i,e);var t=Object(w.a)(i);function i(e){return Object(l.a)(this,i),t.call(this,{vertexShader:"varying vec3 worldNormal;\n\n      void main() {\n        worldNormal = normalize( modelViewMatrix * vec4(normal, 0.)).xyz;\n      \n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n      }",fragmentShader:"varying vec3 worldNormal;\n\n      void main() {\n        gl_FragColor = vec4(worldNormal, 1.0);\n      }",side:u.b})}return i}(u.bb)),x=(i(26),i(27),function(e){Object(f.a)(i,e);var t=Object(w.a)(i);function i(e){var n;return Object(l.a)(this,i),(n=t.call(this,{vertexShader:"varying vec3 worldNormal;\n      varying vec3 viewDirection;\n      \n      void main() {\n        vec4 worldPosition = modelMatrix * vec4( position, 1.0);\n        worldNormal = normalize( modelViewMatrix * vec4(normal, 0.)).xyz;\n        viewDirection = normalize(worldPosition.xyz - cameraPosition);;\n      \n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n      }",fragmentShader:"uniform sampler2D envMap;\n      uniform sampler2D backfaceMap;\n      uniform vec2 resolution;\n      \n      varying vec3 worldNormal;\n      varying vec3 viewDirection;\n      \n      float ior = 1.5;\n      float a = 0.33;\n      \n      vec3 fogColor = vec3(1.0);\n      vec3 reflectionColor = vec3(1.0);\n      \n      float fresnelFunc(vec3 viewDirection, vec3 worldNormal) {\n        return pow( 1.0 + dot( viewDirection, worldNormal), 3.0 );\n      }\n      \n      void main() {\n        vec2 uv = gl_FragCoord.xy / resolution;\n      \n        vec3 backfaceNormal = texture2D(backfaceMap, uv).rgb;\n      \n        vec3 normal = worldNormal * (1.0 - a) - backfaceNormal * a;\n      \n        vec3 refracted = refract(viewDirection, normal, 1.0/ior);\n        uv += refracted.xy;\n      \n        vec4 tex = texture2D(envMap, uv);\n      \n        float fresnel = fresnelFunc(viewDirection, normal);\n      \n        vec4 color = tex;\n      \n        color.rgb = mix(color.rgb, reflectionColor, fresnel);\n      \n        gl_FragColor = vec4(color.rgb, 1.0);\n      }"})).uniforms={envMap:{value:e.envMap},backfaceMap:{value:e.backfaceMap},resolution:{value:e.resolution}},n}return i}(u.bb));function b(e,t,i){return e*(1-i)+t*i}var y=function(){function e(){var t=this;Object(l.a)(this,e),this.handleMouseMove=function(e){var i=Date.now(),n=e.screenX-t.lastMouseX;if(t.dx=n,t.timestamp=i,t.lastMouseX=e.screenX,t.lastX=e.clientX/window.innerWidth-.5,t.lastY=.5*(1-e.clientY/window.innerHeight),t.pointerDown){var r=e.touches?e.touches[0].clientX:e.clientX,a=e.touches?e.touches[0].clientY:e.clientY;t.velocity+=.001*(r-t.pointer.x),t.pointer.x=r,t.velocity2+=.001*(a-t.pointer.y),t.pointer.y=a}},this.render=this.render.bind(this),this.resize=this.resize.bind(this),this.handleMouseDown=this.handleMouseDown.bind(this),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseUp=this.handleMouseUp.bind(this),this.vp={width:window.innerWidth,height:window.innerHeight,dpr:Math.min(devicePixelRatio,2)},this.velocity=.005,this.velocity2=.005,this.pointerDown=!1,this.pointer={x:0,y:0},this.setup()}return Object(v.a)(e,[{key:"addEvents",value:function(){var e=this;window.addEventListener("blur",(function(){e.velocity=.005,e.dx=0,e.velocity2=.005})),"ontouchmove"in window?(window.addEventListener("touchstart",this.handleMouseDown),window.addEventListener("touchmove",this.handleMouseMove),window.addEventListener("touchend",this.handleMouseUp)):(window.addEventListener("mousedown",this.handleMouseDown),window.addEventListener("mousemove",this.handleMouseMove),window.addEventListener("mouseup",this.handleMouseUp))}},{key:"setup",value:function(){var e=Object(d.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.createScene(),this.envFbo=new u.nb(this.vp.width*this.vp.dpr,this.vp.height*this.vp.dpr),this.backfaceFbo=new u.nb(this.vp.width*this.vp.dpr,this.vp.height*this.vp.dpr),this.textCanvas=document.createElement("canvas"),this.textCanvas.style="z-index: -1",this.renderText(),document.body.append(this.textCanvas),e.next=9,this.createBackground();case 9:return this.quad=e.sent,this.scene.add(this.quad),e.next=13,this.createModel();case 13:this.model=e.sent,this.model.scale.set(.1,.1,.1),this.scene.add(this.model),this.camera.position.z=5,this.orthoCamera.position.z=5,window.addEventListener("resize",this.resize),this.addEvents(),this.render();case 21:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"renderText",value:function(){var e=this.textCanvas.getContext("2d");!function(e,t,i,n){var r=window.devicePixelRatio||1;e.width=i*r,e.height=n*r,e.getContext("2d").scale(r,r)}(this.textCanvas,0,window.innerWidth,window.innerHeight);var t=Math.min(window.innerHeight,window.innerWidth);e.font="".concat(.2*t,"px aeonik"),e.fillStyle="white",e.textAlign="center";var i=.15*t,n=.1*t;e.fillText("DIAMOND",this.textCanvas.width/2,this.textCanvas.height/2-i+n),e.fillText("HANDS",this.textCanvas.width/2,this.textCanvas.height/2+i+n)}},{key:"createScene",value:function(){this.scene=new u.ab,this.camera=new u.R(50,this.vp.width/this.vp.height,.1,1e3),this.orthoCamera=new u.Q(this.vp.width/-2,this.vp.width/2,this.vp.height/2,this.vp.height/-2,1,1e3),this.orthoCamera.layers.set(1),this.renderer=new u.ob({antialias:!0}),this.renderer.setSize(this.vp.width,this.vp.height),this.renderer.setPixelRatio(this.vp.dpr),this.renderer.autoClear=!1,document.body.appendChild(this.renderer.domElement)}},{key:"createBackground",value:function(){var e=Object(d.a)(c.a.mark((function e(){var t,i,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new u.hb).setCrossOrigin(""),(i=t.load(this.textCanvas.toDataURL())).needsUpdate=!0,(n=new u.G(new u.S(2,2),new u.bb({uniforms:{time:{value:1},image:{type:"t",value:i},offset:{value:new u.kb},resolution:{value:new u.kb}},vertexShader:"        void main() {\n          gl_Position = vec4( position, 1.0 );\n      }",fragmentShader:"#ifdef GL_ES\n        precision mediump float;\n        #endif\n        \n        uniform vec2 resolution;\n        uniform vec2 offset;\n        uniform float time;\n        uniform sampler2D image;\n              float random (in vec2 st) {\n            return fract(sin(dot(st.xy,\n                                 vec2(12.9898,78.233)))*\n                43758.5453123);\n        }\n        \n        void main() {\n          vec2 uv = gl_FragCoord.xy / resolution.xy;\n          float def = (cos((uv.x + 0.15*time) * 10.0)*0.01)-(sin((uv.y + 0.15*time) * 10.00)*0.01);\n          gl_FragColor= texture2D(image,  vec2(def + uv) - offset);\n        \n          \n        }"}))).layers.set(1),n.scale.set(this.vp.width,this.vp.height,1),e.abrupt("return",n);case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"createModel",value:function(){var e=Object(d.a)(c.a.mark((function e(){var t,i;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.refractionMaterial=new x({envMap:this.envFbo.texture,backfaceMap:this.backfaceFbo.texture,resolution:[this.vp.width*this.vp.dpr,this.vp.height*this.vp.dpr]}),this.backfaceMaterial=new g,e.next=4,m("/refraction-demo/diamond.glb");case 4:return t=e.sent,i=t.model,e.abrupt("return",i.children[0]);case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(e){requestAnimationFrame(this.render),this.renderer.clear(),this.velocity*=.87,this.velocity2*=.87,this.model.rotation.y+=this.velocity+.005*Math.sign(this.velocity)*(1-Number(this.pointerDown)),this.model.rotation.z=.5*Math.sin(1e-4*e),this.model.rotation.x+=this.velocity2+.005*Math.sign(this.velocity2)*(1-Number(this.pointerDown)),this.renderer.setRenderTarget(this.envFbo),this.renderer.render(this.scene,this.orthoCamera);var t=b(this.model.scale.x,.8,.05);this.model.scale.set(t,t,t),this.model.material=this.backfaceMaterial,this.renderer.setRenderTarget(this.backfaceFbo),this.renderer.clearDepth(),this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.orthoCamera),this.renderer.clearDepth(),this.model.material=this.refractionMaterial,this.renderer.render(this.scene,this.camera),this.lastX&&(this.camera.position.x=b(this.camera.position.x,this.lastX,.1),this.quad.material.uniforms.offset.value.x=b(this.quad.material.uniforms.offset.value.x,.1*this.lastX,.1)),this.lastY&&(this.camera.position.y=b(this.camera.position.y,this.lastY,.1),this.quad.material.uniforms.offset.value.y=b(this.quad.material.uniforms.offset.value.y,.1*this.lastY,.1)),this.dx&&(this.quad.material.uniforms.time.value=b(this.quad.material.uniforms.time.value,this.quad.material.uniforms.time.value+Math.min(Math.abs(this.dx),30),.001)),this.quad.material.uniforms.time.value+=.015,this.quad.material.uniforms.resolution.value=[this.vp.width*this.vp.dpr,this.vp.height*this.vp.dpr],this.renderText()}},{key:"resize",value:function(){this.vp.width=window.innerWidth,this.vp.height=window.innerHeight,this.renderer.setSize(this.vp.width,this.vp.height),this.envFbo.setSize(this.vp.width*this.vp.dpr,this.vp.height*this.vp.dpr),this.backfaceFbo.setSize(this.vp.width*this.vp.dpr,this.vp.height*this.vp.dpr),this.quad.scale.set(2*this.vp.height,this.vp.height,1),this.model.material.uniforms.resolution.value=[this.vp.width*this.vp.dpr,this.vp.height*this.vp.dpr],this.camera.aspect=this.vp.width/this.vp.height,this.camera.updateProjectionMatrix(),this.orthoCamera.left=this.vp.width/-2,this.orthoCamera.right=this.vp.width/2,this.orthoCamera.top=this.vp.height/2,this.orthoCamera.bottom=this.vp.height/-2,this.orthoCamera.updateProjectionMatrix(),this.renderText()}},{key:"handleMouseDown",value:function(e){this.pointerDown=!0,this.pointer.x=e.touches?e.touches[0].clientX:e.clientX,this.pointer.y=e.touches?e.touches[0].clientY:e.clientY}},{key:"handleMouseUp",value:function(){this.pointerDown=!1}}]),e}();o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(s,null)),document.getElementById("root")),document.fonts.onloadingdone=function(){new y},"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[14,1,2]]]);
//# sourceMappingURL=main.60074c0f.chunk.js.map