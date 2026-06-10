import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* Mouse-parallax rig — reads a shared ref updated from window mousemove,
   so the whole scene reacts even though the canvas is pointer-events:none. */
function Rig({ mouse, children }) {
  const ref = useRef()
  useFrame(() => {
    if (!ref.current) return
    const { x, y } = mouse.current
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, x * 0.4, 0.045)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -y * 0.28, 0.045)
  })
  return <group ref={ref}>{children}</group>
}

function Core({ reduced }) {
  const segments = reduced ? 48 : 96
  return (
    <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.7}>
      <mesh>
        <sphereGeometry args={[1.18, segments, segments]} />
        <MeshDistortMaterial
          color="#14131c"
          metalness={0.92}
          roughness={0.22}
          distort={reduced ? 0.24 : 0.34}
          speed={1.6}
          emissive="#2a2244"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* wireframe shell */}
      <mesh scale={1.28}>
        <icosahedronGeometry args={[1.18, 1]} />
        <meshBasicMaterial color="#8b7cf6" wireframe transparent opacity={0.08} />
      </mesh>
    </Float>
  )
}

function Ring({ radius, tube = 0.012, speed = 0.2, tilt = [0, 0, 0], color = '#d8c5a0', opacity = 0.55 }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, tube, 12, 140]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
    </group>
  )
}

/* Orbiting glow dot riding a ring */
function OrbitDot({ radius, speed = 0.5, tilt = [0, 0, 0], color = '#f0e6cd', size = 0.05 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed
    if (ref.current) ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0)
  })
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

function Particles({ count = 700 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // shell distribution around the core
      const r = 2.6 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.6 - 0.5
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02
      ref.current.rotation.x += delta * 0.004
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#9b8fff" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function Hero3D({ mouse, reduced = false }) {
  return (
    <Canvas
      dpr={[1, reduced ? 1.5 : 2]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={36} color="#e8dcc0" />
      <pointLight position={[-5, -2, 3]} intensity={26} color="#8b7cf6" />
      <pointLight position={[0, -4, -3]} intensity={16} color="#5d8bff" />

      <Rig mouse={mouse}>
        <Core reduced={reduced} />
        <Ring radius={1.85} speed={0.25} tilt={[Math.PI / 2.4, 0.4, 0]} color="#d8c5a0" opacity={0.55} />
        <Ring radius={2.25} speed={-0.16} tilt={[Math.PI / 1.9, -0.5, 0.3]} color="#8b7cf6" opacity={0.35} tube={0.008} />
        {!reduced && (
          <Ring radius={2.7} speed={0.1} tilt={[Math.PI / 2.1, 0.1, -0.4]} color="#5d8bff" opacity={0.2} tube={0.006} />
        )}
        <OrbitDot radius={1.85} speed={0.5} tilt={[Math.PI / 2.4, 0.4, 0]} color="#f0e6cd" />
        {!reduced && <OrbitDot radius={2.25} speed={-0.34} tilt={[Math.PI / 1.9, -0.5, 0.3]} color="#b3a8ff" size={0.04} />}
        <Particles count={reduced ? 260 : 700} />
      </Rig>
    </Canvas>
  )
}
