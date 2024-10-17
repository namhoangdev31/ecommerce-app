import { Course } from "../types/course"
import { useRef, useEffect } from "react"
import { create } from "zustand"
import { HiXMark as HiX, HiPaperAirplane } from "react-icons/hi2"

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
  }
  
  interface ChatState {
    messages: Message[]
    addMessage: (message: Message) => void
    clearMessages: () => void
  }
  
  const useChatStore = create<ChatState>((set) => ({
    messages: [],
    addMessage: (message) =>
      set((state) => ({ messages: [...state.messages, message] })),
    clearMessages: () => set({ messages: [] }),
  }))
  
export const ChatWindow = ({
    isOpen,
    onClose,
    course,
  }: {
    isOpen: boolean
    onClose: () => void
    course: Course
  }) => {
    const { messages, addMessage } = useChatStore()
    const chatEndRef = useRef<HTMLDivElement>(null)
  
    const scrollToBottom = () => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages, scrollToBottom])
  
    const handleSendMessage = (text: string) => {
      if (text.trim()) {
        addMessage({
          id: Date.now().toString(),
          text,
          sender: 'user',
        })
        setTimeout(() => {
          addMessage({
            id: (Date.now() + 1).toString(),
            text: `Echo: ${text}`,
            sender: 'bot',
          })
        }, 1000)
      }
    }
  
    if (!isOpen) return null
  
    return (
      <div className="fixed bottom-4 right-4 mx-2 flex h-96 w-80 flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg">
        <div className="flex items-center justify-between bg-gray-700 p-2">
          <h3 className="text-sm font-semibold text-gray-100">
            Chat with {course.instructor}
          </h3>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-100">
            <HiX className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`my-4 flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-32 rounded-lg p-3 shadow-md ${
                  message.sender === 'user'
                    ? 'bg-gray-300 text-gray-800'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>
        <div className="flex border-t border-gray-700 p-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-11/12 rounded-lg bg-gray-700 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(e.currentTarget.value)
                e.currentTarget.value = ''
              }
            }}
          />
          <HiPaperAirplane
            className="m-1 h-6 w-6 hover:cursor-pointer"
            onClick={() => {
              const input = document.querySelector(
                'input[type="text"]',
              ) as HTMLInputElement
              handleSendMessage(input.value)
              input.value = ''
            }}
          />
        </div>
      </div>
    )
  }