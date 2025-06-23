"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn } from "lucide-react"

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const meshRef = useRef<any>()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return <primitive ref={meshRef} object={scene} scale={1.5} />
}

interface Model3DViewerProps {
  modelUrl: string
  title: string
  className?: string
}

export function Model3DViewer({ modelUrl, title, className = "" }: Model3DViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div
      className={`relative bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg border-2 border-black ${className}`}
    >
      <div className="h-64 w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Model url={modelUrl} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-2 left-2 right-2">
        <div className="bg-black/80 text-white p-2 rounded text-center">
          <p className="font-serif text-sm">{title}</p>
        </div>
      </div>

      <div className="absolute top-2 right-2 flex gap-1">
        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
          <RotateCcw className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
          <ZoomIn className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
