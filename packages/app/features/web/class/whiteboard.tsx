'use client'

import React, { useState, useRef, useEffect } from 'react'

const WhiteboardScreen: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<string | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [paths, setPaths] = useState<CanvasPath[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          setPdfFile(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages || 1))
  }

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
    ctx.stroke()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
  }, [])

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        onChange={onFileChange}
        accept=".pdf"
        className="mb-4"
      />

      <div className="mt-4 flex w-full justify-between">
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="text-blue-500"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= (numPages || 1)}
          className="text-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default WhiteboardScreen
