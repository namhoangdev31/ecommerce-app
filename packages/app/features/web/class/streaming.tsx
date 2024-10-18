'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  HiMicrophone,
  HiVideoCamera,
  HiChat,
  HiHand,
  HiUsers,
  HiX,
  HiUpload,
  HiPresentationChartBar,
  HiShare,
} from 'react-icons/hi'

const StreamingRoom: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isPresentationMode, setIsPresentationMode] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const screenShareRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch(err => console.error("Error accessing media devices.", err))
    }
  }, [])

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = screenStream
        }
        setIsScreenSharing(true)
      } else {
        if (screenShareRef.current && screenShareRef.current.srcObject) {
          const tracks = (screenShareRef.current.srcObject as MediaStream).getTracks()
          tracks.forEach(track => track.stop())
        }
        setIsScreenSharing(false)
      }
    } catch (err) {
      console.error("Error toggling screen share:", err)
    }
  }

  const togglePresentationMode = () => {
    setIsPresentationMode(!isPresentationMode)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle file upload logic here
      console.log("File uploaded:", file.name)
    }
  }

  const toggleVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const videoTrack = (videoRef.current.srcObject as MediaStream).getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOff;
      }
    }
    setIsVideoOff(!isVideoOff);
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="flex-1 p-4">
        <div className="mb-4 h-4/5 rounded-lg bg-gray-800 overflow-hidden">
          {isScreenSharing ? (
            <video ref={screenShareRef} autoPlay playsInline className="w-full h-full object-contain">
              Your browser does not support the video tag.
            </video>
          ) : (
            <video ref={videoRef} autoPlay playsInline muted={isMuted} className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}>
              Your browser does not support the video tag.
            </video>
          )}
          {isVideoOff && !isScreenSharing && (
            <div className="w-full h-full flex items-center justify-center bg-gray-700">
              <HiVideoCamera size={64} className="text-gray-500" />
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMuted(!isMuted)}
              className={`rounded-full p-3 ${
                isMuted ? 'bg-red-500' : 'bg-gray-700'
              }`}
            >
              <HiMicrophone size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleVideo}
              className={`rounded-full p-3 ${
                isVideoOff ? 'bg-red-500' : 'bg-gray-700'
              }`}
            >
              <HiVideoCamera size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`rounded-full p-3 ${
                isChatOpen ? 'bg-blue-500' : 'bg-gray-700'
              }`}
            >
              <HiChat size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsHandRaised(!isHandRaised)}
              className={`rounded-full p-3 ${
                isHandRaised ? 'bg-yellow-500' : 'bg-gray-700'
              }`}
            >
              <HiHand size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleScreenShare}
              className={`rounded-full p-3 ${
                isScreenSharing ? 'bg-green-500' : 'bg-gray-700'
              }`}
            >
              <HiShare size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePresentationMode}
              className={`rounded-full p-3 ${
                isPresentationMode ? 'bg-purple-500' : 'bg-gray-700'
              }`}
            >
              <HiPresentationChartBar size={24} />
            </motion.button>
            <motion.label
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full bg-gray-700 p-3 cursor-pointer"
            >
              <input type="file" className="hidden" onChange={handleFileUpload} />
              <HiUpload size={24} />
            </motion.label>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-full bg-red-500 p-3"
          >
            <HiX size={24} />
          </motion.button>
        </div>
      </div>
      <div className="w-1/4 bg-gray-800 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Participants</h2>
          <HiUsers size={24} />
        </div>
        <ul className="space-y-2">
          <li className="rounded bg-gray-700 p-2">John Doe</li>
          <li className="rounded bg-gray-700 p-2">Jane Smith</li>
          <li className="rounded bg-gray-700 p-2">Alice Johnson</li>
        </ul>
      </div>
    </div>
  )
}

export default StreamingRoom
