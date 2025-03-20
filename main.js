import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';

// シーン、カメラ、レンダラーの設定
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x87CEEB); // 空色の背景
document.body.appendChild(renderer.domElement);

// カメラの位置を設定
camera.position.set(5, 3, 5);
camera.lookAt(0, 0, 0);

// OrbitControlsの設定
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// ライトの設定
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 地面の作成
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8B4513,
    roughness: 0.8,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -2;
scene.add(ground);

// アックスドラゴンの作成
function createAxeDragon() {
    const dragon = new THREE.Group();

    // 体の作成（緑色のメインボディ）
    const bodyGeometry = new THREE.CapsuleGeometry(1, 2, 4, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1D8348, // 濃い緑色
        roughness: 0.7,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 2;
    body.scale.set(1, 1, 1.3);
    dragon.add(body);

    // 腹部（白色）
    const bellyGeometry = new THREE.SphereGeometry(0.9, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const bellyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFDE7, // オフホワイト
        roughness: 0.5,
    });
    const belly = new THREE.Mesh(bellyGeometry, bellyMaterial);
    belly.position.set(0, -0.5, 0);
    belly.rotation.x = Math.PI / 2;
    belly.rotation.y = Math.PI;
    belly.scale.set(0.9, 1.3, 0.7);
    dragon.add(belly);

    // 頭の作成
    const headGeometry = new THREE.SphereGeometry(0.6, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1D8348, // 体と同じ色
        roughness: 0.7,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(1.5, 0.6, 0);
    head.scale.set(1.2, 0.9, 1);
    dragon.add(head);

    // 口の作成（赤色）
    const mouthGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const mouthMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xC0392B, // 赤色
        roughness: 0.6,
        emissive: 0x570000,
        emissiveIntensity: 0.3
    });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(2, 0.4, 0);
    mouth.scale.set(1, 0.7, 0.8);
    dragon.add(mouth);

    // 歯の作成（白色）
    const toothGeometry = new THREE.ConeGeometry(0.1, 0.2, 8);
    const toothMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF, // 白色
        roughness: 0.3,
    });

    // 上の歯
    const tooth1 = new THREE.Mesh(toothGeometry, toothMaterial);
    tooth1.position.set(2, 0.5, 0.15);
    tooth1.rotation.set(Math.PI / 2, 0, 0);
    dragon.add(tooth1);

    const tooth2 = new THREE.Mesh(toothGeometry, toothMaterial);
    tooth2.position.set(2, 0.5, -0.15);
    tooth2.rotation.set(Math.PI / 2, 0, 0);
    dragon.add(tooth2);

    // 下の歯
    const tooth3 = new THREE.Mesh(toothGeometry, toothMaterial);
    tooth3.position.set(2, 0.3, 0.15);
    tooth3.rotation.set(-Math.PI / 2, 0, 0);
    dragon.add(tooth3);

    const tooth4 = new THREE.Mesh(toothGeometry, toothMaterial);
    tooth4.position.set(2, 0.3, -0.15);
    tooth4.rotation.set(-Math.PI / 2, 0, 0);
    dragon.add(tooth4);

    // 目の作成
    const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF39C12, // 黄色
        roughness: 0.3,
        emissive: 0xF39C12,
        emissiveIntensity: 0.5
    });

    const eyeL = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeL.position.set(1.8, 0.8, 0.3);
    dragon.add(eyeL);

    const eyeR = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeR.position.set(1.8, 0.8, -0.3);
    dragon.add(eyeR);

    // 瞳の作成
    const pupilGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const pupilL = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupilL.position.set(1.89, 0.8, 0.3);
    dragon.add(pupilL);

    const pupilR = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupilR.position.set(1.89, 0.8, -0.3);
    dragon.add(pupilR);

    // 首と背中の鱗
    function createSpike(x, y, z, scaleX = 1, scaleY = 1, scaleZ = 1) {
        const spikeGeometry = new THREE.ConeGeometry(0.15, 0.4, 8);
        const spikeMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x145A32, // 濃い緑
            roughness: 0.8,
        });
        const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
        spike.position.set(x, y, z);
        spike.scale.set(scaleX, scaleY, scaleZ);
        spike.rotation.set(0, 0, -Math.PI / 2);
        return spike;
    }

    // 背中の鱗を追加
    for (let i = 0; i < 5; i++) {
        const spike = createSpike(0.6 - i * 0.5, 1 - i * 0.15, 0, 1, 1 - i * 0.1, 1);
        dragon.add(spike);
    }

    // 腕の作成
    const armGeometry = new THREE.CapsuleGeometry(0.25, 1, 4, 8);
    const armMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1D8348, // 体と同じ緑色
        roughness: 0.7,
    });

    // 左腕
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(0.5, 0, 0.8);
    leftArm.rotation.set(0, 0, -Math.PI / 4);
    dragon.add(leftArm);

    // 右腕
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.5, 0, -0.8);
    rightArm.rotation.set(0, 0, -Math.PI / 4);
    dragon.add(rightArm);

    // 手の作成
    const handGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const handMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x186A3B, // 少し濃い緑
        roughness: 0.7,
    });

    // 左手
    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(0, -0.5, 1);
    leftHand.scale.set(1.2, 0.8, 1);
    dragon.add(leftHand);

    // 右手
    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(0, -0.5, -1);
    rightHand.scale.set(1.2, 0.8, 1);
    dragon.add(rightHand);

    // 指の作成
    const fingerGeometry = new THREE.CapsuleGeometry(0.05, 0.2, 4, 8);
    const fingerMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x145A32, // 濃い緑
        roughness: 0.7,
    });

    // 左手の指
    for (let i = 0; i < 3; i++) {
        const finger = new THREE.Mesh(fingerGeometry, fingerMaterial);
        finger.position.set(-0.1 - i * 0.05, -0.6, 1 + (i - 1) * 0.1);
        finger.rotation.set(0, 0, Math.PI / 4);
        dragon.add(finger);
    }

    // 右手の指
    for (let i = 0; i < 3; i++) {
        const finger = new THREE.Mesh(fingerGeometry, fingerMaterial);
        finger.position.set(-0.1 - i * 0.05, -0.6, -1 + (i - 1) * 0.1);
        finger.rotation.set(0, 0, Math.PI / 4);
        dragon.add(finger);
    }

    // 足の作成
    const legGeometry = new THREE.CapsuleGeometry(0.3, 1.2, 4, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1D8348, // 体と同じ緑色
        roughness: 0.7,
    });

    // 左足
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.8, -1, 0.5);
    dragon.add(leftLeg);

    // 右足
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(-0.8, -1, -0.5);
    dragon.add(rightLeg);

    // 足首の作成
    const footGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const footMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x186A3B, // 少し濃い緑
        roughness: 0.7,
    });

    // 左足首
    const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
    leftFoot.position.set(-0.8, -1.7, 0.5);
    leftFoot.scale.set(1, 0.5, 1.5);
    dragon.add(leftFoot);

    // 右足首
    const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
    rightFoot.position.set(-0.8, -1.7, -0.5);
    rightFoot.scale.set(1, 0.5, 1.5);
    dragon.add(rightFoot);

    // 爪の作成
    const clawGeometry = new THREE.ConeGeometry(0.08, 0.25, 8);
    const clawMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF0F0F0, // オフホワイト
        roughness: 0.3,
    });

    // 左足の爪
    for (let i = 0; i < 3; i++) {
        const claw = new THREE.Mesh(clawGeometry, clawMaterial);
        claw.position.set(-0.9 - i * 0.05, -1.8, 0.7 + (i - 1) * 0.15);
        claw.rotation.set(Math.PI / 2, 0, 0);
        dragon.add(claw);
    }

    // 右足の爪
    for (let i = 0; i < 3; i++) {
        const claw = new THREE.Mesh(clawGeometry, clawMaterial);
        claw.position.set(-0.9 - i * 0.05, -1.8, -0.7 + (i - 1) * 0.15);
        claw.rotation.set(Math.PI / 2, 0, 0);
        dragon.add(claw);
    }

    // 尻尾の作成（特徴的な斧型）
    const tailGroup = new THREE.Group();
    
    // 尻尾の根元
    const tailBaseGeometry = new THREE.CapsuleGeometry(0.25, 1, 4, 8);
    const tailBaseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1D8348, // 体と同じ緑色
        roughness: 0.7,
    });
    const tailBase = new THREE.Mesh(tailBaseGeometry, tailBaseMaterial);
    tailBase.position.set(-1.5, 0, 0);
    tailBase.rotation.set(0, 0, -Math.PI / 8);
    tailGroup.add(tailBase);

    // 尻尾の先端（斧型）
    const axeGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
    const axeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x117A65, // 暗めの緑
        metalness: 0.5,
        roughness: 0.5,
    });
    const axe = new THREE.Mesh(axeGeometry, axeMaterial);
    axe.position.set(-2.5, 0.3, 0);
    axe.rotation.set(0, 0, Math.PI / 4);
    tailGroup.add(axe);

    // 斧の刃の部分（金属的な質感）
    const bladeGeometry = new THREE.BoxGeometry(0.7, 0.05, 0.3);
    const bladeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x7B7D7D, // 灰色（金属的）
        metalness: 0.8,
        roughness: 0.2,
    });
    const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
    blade.position.set(-2.7, 0.6, 0);
    blade.rotation.set(0, 0, Math.PI / 4);
    tailGroup.add(blade);

    dragon.add(tailGroup);

    // 全体の調整
    dragon.position.set(0, 0, 0);
    dragon.rotation.set(0, -Math.PI / 2, 0);
    dragon.scale.set(0.8, 0.8, 0.8);

    return dragon;
}

// アックスドラゴンを作成してシーンに追加
const axeDragon = createAxeDragon();
scene.add(axeDragon);

// ドラゴンのアニメーション（呼吸と軽い揺れ）
let breatheDirection = 0.001;
let breatheScale = 0;

// ウィンドウのリサイズ対応
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);

    // 呼吸アニメーション
    breatheScale += breatheDirection;
    if (breatheScale > 0.03 || breatheScale < 0) {
        breatheDirection *= -1;
    }
    axeDragon.scale.set(0.8 + breatheScale, 0.8 + breatheScale, 0.8 + breatheScale);

    // 軽い揺れ
    axeDragon.rotation.z = Math.sin(Date.now() * 0.001) * 0.05;
    
    // OrbitControlsの更新
    controls.update();

    renderer.render(scene, camera);
}

animate();