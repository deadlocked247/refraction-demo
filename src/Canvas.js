import "./styles.css";
import loadTexture from "./util/texture-loader";
import loadModel from "./util/model-loader";
import * as THREE from "three";
import BackfaceMaterial from "./backface-material";
import RefractionMaterial from "./refraction-material";

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}
function scaleCanvas(canvas, ctx, width, height) {
  var dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  var ctx = canvas.getContext("2d");
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
}

export default class Canvas {
  constructor() {
    this.render = this.render.bind(this);
    this.resize = this.resize.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.vp = {
      width: window.innerWidth,
      height: window.innerHeight,
      dpr: Math.min(devicePixelRatio, 2 || 1),
    };

    this.velocity = 0.005;

    this.velocity2 = 0.005;
    this.pointerDown = false;
    this.pointer = {
      x: 0,
      y: 0,
    };
    this.setup();
  }

  addEvents() {
    if ("ontouchmove" in window) {
      window.addEventListener("touchstart", this.handleMouseDown);
      window.addEventListener("touchmove", this.handleMouseMove);
      window.addEventListener("touchend", this.handleMouseUp);
    } else {
      window.addEventListener("mousedown", this.handleMouseDown);
      window.addEventListener("mousemove", this.handleMouseMove);
      window.addEventListener("mouseup", this.handleMouseUp);
    }
  }

  async setup() {
    this.createScene();

    this.envFbo = new THREE.WebGLRenderTarget(
      this.vp.width * this.vp.dpr,
      this.vp.height * this.vp.dpr
    );
    this.backfaceFbo = new THREE.WebGLRenderTarget(
      this.vp.width * this.vp.dpr,
      this.vp.height * this.vp.dpr
    );

    this.textCanvas = document.createElement("canvas");
    this.textCanvas.style = "z-index: -1";
    this.renderText();

    document.body.append(this.textCanvas);

    this.quad = await this.createBackground();
    this.scene.add(this.quad);

    this.model = await this.createModel();
    this.model.scale.set(.1, .1, .1);

    this.scene.add(this.model);

    this.camera.position.z = 5;
    this.orthoCamera.position.z = 5;

    window.addEventListener("resize", this.resize);

    this.addEvents();
    this.render();
  }

  renderText() {
    const ctx = this.textCanvas.getContext("2d");
    scaleCanvas(this.textCanvas, ctx, window.innerWidth, window.innerHeight);
    const scale = Math.min(window.innerHeight, window.innerWidth);
    ctx.font = `${0.2 * scale}px aeonik`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    const OFFSET = scale * 0.15;
    const yOFFSET = scale * 0.1;
    ctx.fillText(
      "DIAMOND",
      this.textCanvas.width / 2,
      this.textCanvas.height / 2 - OFFSET + yOFFSET
    );

    ctx.fillText(
      "HANDS",
      this.textCanvas.width / 2,
      this.textCanvas.height / 2 + OFFSET + yOFFSET
    );
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.vp.width / this.vp.height,
      0.1,
      1000
    );
    this.orthoCamera = new THREE.OrthographicCamera(
      this.vp.width / -2,
      this.vp.width / 2,
      this.vp.height / 2,
      this.vp.height / -2,
      1,
      1000
    );

    this.orthoCamera.layers.set(1);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.vp.width, this.vp.height);
    this.renderer.setPixelRatio(this.vp.dpr);
    this.renderer.autoClear = false;
    document.body.appendChild(this.renderer.domElement);
  }

  async createBackground() {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("");
    let texture = loader.load(this.textCanvas.toDataURL());

    texture.needsUpdate = true;
    const quad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 1.0 },
          image: { type: "t", value: texture },
          offset: { value: new THREE.Vector2()},
          resolution: { value: new THREE.Vector2() },
        },

        vertexShader: `        void main() {
          gl_Position = vec4( position, 1.0 );
      }`,

        fragmentShader: `#ifdef GL_ES
        precision mediump float;
        #endif
        
        uniform vec2 resolution;
        uniform vec2 offset;
        uniform float time;
        uniform sampler2D image;
              float random (in vec2 st) {
            return fract(sin(dot(st.xy,
                                 vec2(12.9898,78.233)))*
                43758.5453123);
        }
        
        void main() {
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          float def = (cos((uv.x + 0.15*time) * 10.0)*0.01)-(sin((uv.y + 0.15*time) * 10.00)*0.01);
          gl_FragColor= texture2D(image,  vec2(def + uv) - offset);
        
          
        }`,
      })
    );

    quad.layers.set(1);

    quad.scale.set(this.vp.width, this.vp.height, 1);

    return quad;
  }

  async createModel() {
    this.refractionMaterial = new RefractionMaterial({
      envMap: this.envFbo.texture,
      backfaceMap: this.backfaceFbo.texture,
      resolution: [this.vp.width * this.vp.dpr, this.vp.height * this.vp.dpr],
    });

    this.backfaceMaterial = new BackfaceMaterial();

    let { model } = await loadModel(process.env.PUBLIC_URL + "/diamond.glb");
    return model.children[0];
  }

  render(time) {
    requestAnimationFrame(this.render);

    this.renderer.clear();

    this.velocity *= 0.87;

    this.velocity2 *= 0.87;


    this.model.rotation.y +=
      this.velocity +
      Math.sign(this.velocity) * 0.005 * (1 - Number(this.pointerDown));
      this.model.rotation.z = Math.sin(time * .0001) * .5;

      this.model.rotation.x +=
      this.velocity2 +
      Math.sign(this.velocity2) * 0.005 * (1 - Number(this.pointerDown));

    // render env to fbo
    this.renderer.setRenderTarget(this.envFbo);
    this.renderer.render(this.scene, this.orthoCamera);
    const scale = lerp(this.model.scale.x, .8, .05);
    this.model.scale.set(scale, scale, scale);

    // render cube backfaces to fbo
    this.model.material = this.backfaceMaterial;
    this.renderer.setRenderTarget(this.backfaceFbo);
    this.renderer.clearDepth();
    this.renderer.render(this.scene, this.camera);

    // render env to screen
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.orthoCamera);
    this.renderer.clearDepth();

    // render cube with refraction material to screen
    this.model.material = this.refractionMaterial;
    this.renderer.render(this.scene, this.camera);

    if (this.lastX) {
      this.camera.position.x = lerp(this.camera.position.x, this.lastX, 0.1);
      this.quad.material.uniforms.offset.value.x = lerp(this.quad.material.uniforms.offset.value.x, this.lastX * .1, 0.1);
    }

    if (this.lastY) {
      this.camera.position.y = lerp(this.camera.position.y, this.lastY, 0.1);
      this.quad.material.uniforms.offset.value.y = lerp(this.quad.material.uniforms.offset.value.y, this.lastY * .1, 0.1);

    }

    if (this.dx) {

      this.quad.material.uniforms.time.value = lerp(this.quad.material.uniforms.time.value, this.quad.material.uniforms.time.value + Math.abs(this.dx), .001);


    }
    this.quad.material.uniforms.time.value += 0.015;

    this.quad.material.uniforms.resolution.value = [
      this.vp.width * this.vp.dpr,
      this.vp.height * this.vp.dpr,
    ];
    this.renderText();
  }

  resize() {
    this.vp.width = window.innerWidth;
    this.vp.height = window.innerHeight;

    this.renderer.setSize(this.vp.width, this.vp.height);
    this.envFbo.setSize(
      this.vp.width * this.vp.dpr,
      this.vp.height * this.vp.dpr
    );
    this.backfaceFbo.setSize(
      this.vp.width * this.vp.dpr,
      this.vp.height * this.vp.dpr
    );

    this.quad.scale.set(this.vp.height * 2, this.vp.height, 1);

    this.model.material.uniforms.resolution.value = [
      this.vp.width * this.vp.dpr,
      this.vp.height * this.vp.dpr,
    ];

    this.camera.aspect = this.vp.width / this.vp.height;
    this.camera.updateProjectionMatrix();

    this.orthoCamera.left = this.vp.width / -2;
    this.orthoCamera.right = this.vp.width / 2;
    this.orthoCamera.top = this.vp.height / 2;
    this.orthoCamera.bottom = this.vp.height / -2;
    this.orthoCamera.updateProjectionMatrix();

    this.renderText();
  }

  handleMouseDown(e) {
    this.pointerDown = true;
    this.pointer.x = e.touches ? e.touches[0].clientX : e.clientX;

    this.pointer.y = e.touches ? e.touches[0].clientY : e.clientY;

  }

  handleMouseMove = (e) => {
    var now = Date.now();
    var dt =  now - this.timestamp;
    var dx = e.screenX - this.lastMouseX;
    var dy = e.screenY - this.lastMouseY;
    var speedX = Math.round(dx / dt * 100);
    var speedY = Math.round(dy / dt * 100);
    this.dx = dx;
    this.dy = dy;

    this.timestamp = now;
    this.lastMouseX = e.screenX;
    this.lastMouseY = e.screenY; 
    
    this.lastX = e.clientX / window.innerWidth - 0.5;
    this.lastY = 0.5 * (1 - e.clientY / window.innerHeight);

    if (!this.pointerDown) return;

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    this.velocity += (x - this.pointer.x) * 0.001;

    this.pointer.x = x;

    this.velocity2 += (y - this.pointer.y) * 0.001;

    this.pointer.y = y;
  };

  handleMouseUp() {
    this.pointerDown = false;
  }
}
