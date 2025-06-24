import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from '../../styles/Banner.module.css';

const Banner3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Tắt trên mobile để tối ưu
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      return;
    }

    if (!canvasRef.current) return;

    // Thiết lập scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1200 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(1200, 400);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Tạo khối Rubik 3x3x3
    const rubikGroup = new THREE.Group();
    const cubeSize = 1;
    const spacing = 0.05; // Khoảng cách giữa các cubelet
    const cubelets: THREE.Mesh[] = [];
    const colors = [
      new THREE.Color(0xff0000), // Đỏ (trái)
      new THREE.Color(0x00ff00), // Xanh lá (phải)
      new THREE.Color(0xffffff), // Trắng (trên)
      new THREE.Color(0xffff00), // Vàng (dưới)
      new THREE.Color(0x0000ff), // Xanh dương (trước)
      new THREE.Color(0xffa500), // Cam (sau)
    ];

    // Tạo 27 cubelets
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const material = new THREE.MeshPhongMaterial({
            color: 0x000000, // Màu mặc định (đen)
            shininess: 50,
          });
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(
            x * (cubeSize + spacing),
            y * (cubeSize + spacing),
            z * (cubeSize + spacing)
          );
          cube.userData = { x, y, z }; // Lưu tọa độ logic
          cubelets.push(cube);
          rubikGroup.add(cube);
        }
      }
    }

    // Gán màu cho các mặt ngoài
    cubelets.forEach(cube => {
      const { x, y, z } = cube.userData;
      const materials = [
        x === -1
          ? new THREE.MeshPhongMaterial({ color: colors[0], shininess: 50 })
          : new THREE.MeshPhongMaterial({ color: 0x000000 }),
        x === 1
          ? new THREE.MeshPhongMaterial({ color: colors[1], shininess: 50 })
          : new THREE.MeshPhongMaterial({ color: 0x000000 }),
        y === 1
          ? new THREE.MeshPhongMaterial({ color: colors[2], shininess: 50 })
          : new THREE.MeshPhongMaterial({ color: 0x000000 }),
        y === -1
          ? new THREE.MeshPhongMaterial({ color: colors[3], shininess: 50 })
          : new THREE.MeshPhongMaterial({ color: 0x000000 }),
        z === 1
          ? new THREE.MeshPhongMaterial({ color: colors[4], shininess: 50 })
          : new THREE.MeshPhongMaterial({ color: 0x000000 }),
        z === -1
          ? new THREE.MeshPhongMaterial({ color: colors[5], shininess: 50 })
          : new THREE.MeshPhongMaterial({ color: 0x000000 }),
      ];
      cube.material = materials;
    });

    scene.add(rubikGroup);

    // Ánh sáng
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);

    // Tương tác chuột
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isRotating = false;
    let rotationAxis: string | null = null;
    let rotationAngle = 0;
    const rotationSpeed = 0.05;
    let selectedFace: number | null = null;
    let rotationGroup: THREE.Group | null = null; // Nhóm tạm để xoay mặt

    // Xoay khối bằng kéo chuột
    let isDragging = false;
    // eslint-disable-next-line prefer-const
    let previousMouse = new THREE.Vector2();
    const rotationMatrix = new THREE.Matrix4();

    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMouse.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const deltaX = mouse.x - previousMouse.x;
      const deltaY = mouse.y - previousMouse.y;

      // Xoay khối Rubik dựa trên delta chuột
      rotationMatrix.makeRotationY(deltaX * Math.PI);
      rubikGroup.applyMatrix4(rotationMatrix);
      rotationMatrix.makeRotationX(deltaY * Math.PI);
      rubikGroup.applyMatrix4(rotationMatrix);

      previousMouse.set(mouse.x, mouse.y);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseClick = (event: MouseEvent) => {
      if (isRotating || isDragging) return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubelets);

      if (intersects.length > 0) {
        const cube = intersects[0].object as THREE.Mesh;
        const normal = intersects[0].normal!;

        // Xác định mặt và trục xoay
        if (
          Math.abs(normal.x) > Math.abs(normal.y) &&
          Math.abs(normal.x) > Math.abs(normal.z)
        ) {
          rotationAxis = 'x';
          selectedFace = normal.x > 0 ? 1 : -1;
        } else if (
          Math.abs(normal.y) > Math.abs(normal.x) &&
          Math.abs(normal.y) > Math.abs(normal.z)
        ) {
          rotationAxis = 'y';
          selectedFace = normal.y > 0 ? 1 : -1;
        } else {
          rotationAxis = 'z';
          selectedFace = normal.z > 0 ? 1 : -1;
        }

        // Tạo nhóm xoay
        rotationGroup = new THREE.Group();
        cubelets.forEach(cube => {
          if (
            (rotationAxis === 'x' &&
              Math.round(cube.userData.x) === selectedFace) ||
            (rotationAxis === 'y' &&
              Math.round(cube.userData.y) === selectedFace) ||
            (rotationAxis === 'z' &&
              Math.round(cube.userData.z) === selectedFace)
          ) {
            rubikGroup.remove(cube);
            rotationGroup!.add(cube); // Non-null assertion vì rotationGroup vừa được khởi tạo
          }
        });
        scene.add(rotationGroup!); // Non-null assertion vì rotationGroup vừa được khởi tạo

        isRotating = true;
        rotationAngle = 0;
      }
    };

    canvasRef.current.addEventListener('mousedown', onMouseDown);
    canvasRef.current.addEventListener('mousemove', onMouseMove);
    canvasRef.current.addEventListener('mouseup', onMouseUp);
    canvasRef.current.addEventListener('click', onMouseClick);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Xử lý xoay mặt
      if (
        isRotating &&
        rotationAxis &&
        selectedFace !== null &&
        rotationGroup
      ) {
        rotationAngle += rotationSpeed;
        const angle =
          ((rotationAngle * Math.PI) / 2) * (selectedFace > 0 ? 1 : -1);

        // Xoay nhóm cubelet
        if (rotationAxis === 'x') {
          rotationGroup.rotation.x = angle;
        } else if (rotationAxis === 'y') {
          rotationGroup.rotation.y = angle;
        } else if (rotationAxis === 'z') {
          rotationGroup.rotation.z = angle;
        }

        if (rotationAngle >= 1) {
          // Khi xoay hoàn tất, cập nhật vị trí logic và vật lý
          cubelets.forEach(cube => {
            if (
              (rotationAxis === 'x' &&
                Math.round(cube.userData.x) === selectedFace) ||
              (rotationAxis === 'y' &&
                Math.round(cube.userData.y) === selectedFace) ||
              (rotationAxis === 'z' &&
                Math.round(cube.userData.z) === selectedFace)
            ) {
              // Cập nhật tọa độ logic
              const matrix = new THREE.Matrix4();
              if (rotationAxis === 'x') {
                matrix.makeRotationX(
                  (Math.PI / 2) * (selectedFace > 0 ? 1 : -1)
                );
              } else if (rotationAxis === 'y') {
                matrix.makeRotationY(
                  (Math.PI / 2) * (selectedFace > 0 ? 1 : -1)
                );
              } else if (rotationAxis === 'z') {
                matrix.makeRotationZ(
                  (Math.PI / 2) * (selectedFace > 0 ? 1 : -1)
                );
              }

              const pos = new THREE.Vector3(
                cube.userData.x,
                cube.userData.y,
                cube.userData.z
              ).applyMatrix4(matrix);
              cube.userData.x = Math.round(pos.x);
              cube.userData.y = Math.round(pos.y);
              cube.userData.z = Math.round(pos.z);

              // Cập nhật vị trí vật lý
              cube.position.set(
                cube.userData.x * (cubeSize + spacing),
                cube.userData.y * (cubeSize + spacing),
                cube.userData.z * (cubeSize + spacing)
              );

              // Reset rotation của cube riêng lẻ
              cube.rotation.set(0, 0, 0);
              cube.updateMatrix();

              // Thêm lại vào rubikGroup
              rotationGroup!.remove(cube); // Non-null assertion vì rotationGroup được kiểm tra trong điều kiện
              rubikGroup.add(cube);
            }
          });

          // Xóa nhóm xoay và reset trạng thái
          scene.remove(rotationGroup);
          rotationGroup = null;
          isRotating = false;
          rotationAxis = null;
          selectedFace = null;
          rotationAngle = 0;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Xử lý resize
    const handleResize = () => {
      if (canvasRef.current) {
        const width = canvasRef.current.parentElement?.clientWidth || 1200;
        renderer.setSize(width, 400);
        camera.aspect = width / 400;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Dọn dẹp
    return () => {
      window.removeEventListener('resize', handleResize);
      canvasRef.current?.removeEventListener('mousedown', onMouseDown);
      canvasRef.current?.removeEventListener('mousemove', onMouseMove);
      canvasRef.current?.removeEventListener('mouseup', onMouseUp);
      canvasRef.current?.removeEventListener('click', onMouseClick);
      renderer.dispose();
    };
  }, []);

  // Fallback cho mobile
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    return (
      <div className={styles['banner-fallback']}>
        <img
          src="https://via.placeholder.com/1200x400?text=Banner"
          alt="Banner Fallback"
          className={styles['banner-image']}
        />
      </div>
    );
  }

  return <canvas ref={canvasRef} className={styles.banner} />;
};

export default Banner3D;
