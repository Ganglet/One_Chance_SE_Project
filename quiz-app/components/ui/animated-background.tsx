"use client"

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface AnimatedBackgroundProps {
  children: React.ReactNode
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    try {
      console.log('🚀 Starting Three.js animation...')
      
      const width = window.innerWidth
      const height = window.innerHeight

      console.log('📏 Dimensions:', width, height)

      // Scene setup
      const scene = new THREE.Scene()
      
      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.z = 30

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
      })
      renderer.setSize(width, height)
      renderer.setClearColor(0x000000, 0.2) // More visible background
      
      // Make canvas visible and properly positioned
      const canvas = renderer.domElement
      canvas.style.position = 'fixed'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.width = '100vw'
      canvas.style.height = '100vh'
      canvas.style.zIndex = '-1'
      canvas.style.pointerEvents = 'none'
      
      // Add to body instead of container to avoid positioning issues
      document.body.appendChild(canvas)
      console.log('✅ Canvas added to body')

      // Test: Add a simple visible object first
      const testGeometry = new THREE.SphereGeometry(2, 16, 16)
      const testMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff0000, // Red
        transparent: true,
        opacity: 0.8
      })
      const testSphere = new THREE.Mesh(testGeometry, testMaterial)
      testSphere.position.set(0, 0, 0)
      scene.add(testSphere)
      console.log('🧪 Added test sphere')

      // Create a simple net effect
      const nodes: THREE.Mesh[] = []
      const lines: THREE.Line[] = []
      const gridSize = 6
      const spacing = 8

      console.log('🔧 Creating net effect...')

      // Create nodes
      for (let i = 0; i <= gridSize; i++) {
        for (let j = 0; j <= gridSize; j++) {
          const x = (i - gridSize / 2) * spacing
          const y = (j - gridSize / 2) * spacing
          
          const geometry = new THREE.CircleGeometry(0.4, 16)
          const material = new THREE.MeshBasicMaterial({ 
            color: 0xffd700, // Golden
            transparent: true,
            opacity: 0.9
          })
          const node = new THREE.Mesh(geometry, material)
          node.position.set(x, y, 0)
          scene.add(node)
          nodes.push(node)
        }
      }

      // Create lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = nodes[i].position.distanceTo(nodes[j].position)
          if (distance <= spacing * 1.5) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              nodes[i].position.clone(),
              nodes[j].position.clone()
            ])
            const material = new THREE.LineBasicMaterial({
              color: 0xffd700,
              transparent: true,
              opacity: 0.6
            })
            const line = new THREE.Line(geometry, material)
            scene.add(line)
            lines.push(line)
          }
        }
      }

      console.log('✅ Created', nodes.length, 'nodes and', lines.length, 'lines')

      // Animation loop
      let animationId: number
      const animate = () => {
        animationId = requestAnimationFrame(animate)
        
        const time = Date.now() * 0.001
        
        // Animate test sphere
        testSphere.rotation.x += 0.01
        testSphere.rotation.y += 0.01
        
        // Animate nodes
        nodes.forEach((node, index) => {
          const baseX = (Math.floor(index / (gridSize + 1)) - gridSize / 2) * spacing
          const baseY = (index % (gridSize + 1) - gridSize / 2) * spacing
          
          const dx = Math.sin(time + baseX * 0.1) * 0.5
          const dy = Math.cos(time + baseY * 0.1) * 0.5
          
          node.position.x = baseX + dx
          node.position.y = baseY + dy
        })
        
        // Update lines
        let lineIndex = 0
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const distance = nodes[i].position.distanceTo(nodes[j].position)
            if (distance <= spacing * 1.5 && lineIndex < lines.length) {
              const line = lines[lineIndex]
              const positions = (line.geometry as THREE.BufferGeometry).attributes.position as THREE.BufferAttribute
              positions.setXYZ(0, nodes[i].position.x, nodes[i].position.y, nodes[i].position.z)
              positions.setXYZ(1, nodes[j].position.x, nodes[j].position.y, nodes[j].position.z)
              positions.needsUpdate = true
              lineIndex++
            }
          }
        }
        
        renderer.render(scene, camera)
      }

      console.log('🎬 Starting animation loop...')
      animate()

      // Handle resize
      const handleResize = () => {
        const newWidth = window.innerWidth
        const newHeight = window.innerHeight
        
        camera.aspect = newWidth / newHeight
        camera.updateProjectionMatrix()
        renderer.setSize(newWidth, newHeight)
        
        console.log('📐 Resized to:', newWidth, newHeight)
      }
      window.addEventListener('resize', handleResize)

      return () => {
        console.log('🧹 Cleaning up Three.js...')
        if (animationId) {
          cancelAnimationFrame(animationId)
        }
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas)
        }
        renderer.dispose()
        window.removeEventListener('resize', handleResize)
      }
    } catch (error) {
      console.error('❌ Three.js animation failed:', error)
      setHasError(true)
    }
  }, [])

  // Fallback background
  if (hasError) {
    console.log('🔄 Using fallback background')
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-50 via-white to-yellow-50">
        <div className="absolute inset-0 bg-gradient-to-r from-red-100/20 via-yellow-100/20 to-yellow-100/20 animate-pulse"></div>
        {children}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      {children}
    </div>
  )
} 