"use client"
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ThreeScene = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        var scene = new THREE.Scene()
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        var renderer = new THREE.WebGLRenderer({ alpha: true })

        renderer.setSize(window.innerWidth, window.innerHeight)
        ref!.current!.appendChild(renderer.domElement)

        var positions = new Float32Array(1000 * 3)
        var colors = new Float32Array(1000 * 3)

        function resetParticles() {
            for (var i = 0; i < positions.length; i += 3) {
                positions[i] = Math.random() * 1000 - 500
                positions[i + 1] = Math.random() * 1000 - 500
                positions[i + 2] = Math.random() * 1000 - 500

                colors[i] = Math.random()
                colors[i + 1] = Math.random()
                colors[i + 2] = Math.random()
            }
        }

        resetParticles()

        var geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        var material = new THREE.PointsMaterial({ size: 1, vertexColors: true })

        var stars = new THREE.Points(geometry, material)
        scene.add(stars)

        camera.position.z = 200

        var cameraSpeed = 0.05

        var animate = function () {
            requestAnimationFrame(animate)

            camera.position.z -= cameraSpeed

            if (camera.position.z < -3) {
                resetParticles()
                geometry.attributes.position.needsUpdate = true
                geometry.attributes.color.needsUpdate = true
                camera.position.z = 200
            }

            renderer.render(scene, camera)
        }

        animate()

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }, false)
    }, [])

    return (
        <div style={{ position: 'relative' }}>
            {children}
            <div ref={ref} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />
        </div>
    )
}

export default ThreeScene
