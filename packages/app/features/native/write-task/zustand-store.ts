import { create } from 'zustand'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface WriteTaskState {
  input: string
  responses: string[]
  errors: string[]
  question: string
  suggestion: string
  isLoading: boolean
  setInput: (input: string) => void
  setResponses: (responses: string[]) => void
  setErrors: (errors: string[]) => void
  setQuestion: (question: string) => void
  setIsLoading: (isLoading: boolean) => void
  setSuggestion: (suggestion: string) => void
  getQuestion: () => Promise<void>
  handleSubmit: () => Promise<void>
  handleRefresh: () => void
}

const genAI = new GoogleGenerativeAI('AIzaSyA9LA03RXl-StAKbt7_gT4zD0yHExzuMN4')
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export const useWriteTaskStore = create<WriteTaskState>((set, get) => ({
  input: '',
  responses: [],
  errors: [],
  question: '',
  isLoading: false,
  suggestion: '',
  setInput: (input) => set({ input }),
  setResponses: (responses) => set({ responses }),
  setErrors: (errors) => set({ errors }),
  setQuestion: (question) => set({ question }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSuggestion: (suggestion: string) => set({ suggestion }),
  getQuestion: async () => {
    set({ isLoading: true })
    try {
      const result = await model.generateContent(
        'Generate an IELTS Writing Task question with a common or complex topic, suitable for band 8.0. Then, provide a suggestion for the answer. Separate the question and suggestion with "###".'
      )
      const response = await result.response
      const text = response.text()
      const [topic, suggestion] = text.split('###').map(item => item.trim())
      set({ question: topic, suggestion: suggestion || '' })
    } catch (error) {
      console.error('Lỗi khi tạo câu hỏi:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  handleSubmit: async () => {
    const { input, question, responses, errors } = get()
    set({ isLoading: true })
    try {
      if (question) {
        const result = await model.generateContent(
          `Đánh giá và giải thích câu trả lời sau cho câu hỏi IELTS Writing Task: "${question}"\n\nCâu trả lời của thí sinh: ${input}\n\nVui lòng đánh giá theo tiêu chí band 8.0, chỉ ra điểm mạnh, điểm yếu và cách cải thiện.`
        )
        const response = await result.response
        const text = response.text()
        set({ responses: [...responses, text], errors: [...errors, ''] })
      }
    } catch (error) {
      set({
        responses: [...responses, ''],
        errors: [...errors, error instanceof Error ? error.message : 'Đã xảy ra lỗi'],
      })
    } finally {
      set({ isLoading: false, input: '' })
    }
  },

  handleRefresh: () => {
    set({ input: '', responses: [], errors: [] })
    get().getQuestion()
  },
}))
