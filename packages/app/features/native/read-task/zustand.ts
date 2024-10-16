import { create } from 'zustand'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface ReadTaskState {
  passage: string
  question: { question: string; options: string[] }
  userAnswer: string
  response: string
  error: string
  isLoading: boolean
  setPassage: (passage: string) => void
  setQuestion: (question: { question: string; options: string[] }) => void
  setUserAnswer: (answer: string) => void
  setResponse: (response: string) => void
  setError: (error: string) => void
  setIsLoading: (isLoading: boolean) => void
  getPassageAndQuestion: () => Promise<void>
  handleSubmit: () => Promise<void>
  handleRefresh: () => void
}

const genAI = new GoogleGenerativeAI('AIzaSyA9LA03RXl-StAKbt7_gT4zD0yHExzuMN4')
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export const useReadTaskStore = create<ReadTaskState>((set, get) => ({
  passage: '',
  question: { question: '', options: [] },
  userAnswer: '',
  response: '',
  error: '',
  isLoading: false,
  setPassage: (passage) => set({ passage }),
  setQuestion: (question) => set({ question }),
  setUserAnswer: (answer) => set({ userAnswer: answer }),
  setResponse: (response) => set({ response }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),

  getPassageAndQuestion: async () => {
    try {
      set({ isLoading: true })
      const result = await model.generateContent(
        'Create a short passage on diverse IELTS Reading band 9.0 topics of about 80 words and 1 multiple-choice question about that passage. The question should have 4 options. Please format the result as follows: [PASSAGE] Content of the passage [/PASSAGE] [QUESTION] Question? A. Option A B. Option B C. Option C D. Option D [/QUESTION]',
      )
      const response = await result.response
      const text = response.text()

      const passageMatch = text.match(/\[PASSAGE\]([\s\S]*?)\[\/PASSAGE\]/)
      const questionMatch = text.match(/\[QUESTION\]([\s\S]*?)\[\/QUESTION\]/)
      if (passageMatch && questionMatch) {
        const passageText = passageMatch[1]?.trim() ?? ''
        const questionText = questionMatch[1]?.trim() ?? ''

        set({ passage: passageText })
        const [questionContent, ...options] = questionText
          .split(/[A-D]\./)
          .map((item) => item.trim())
        set({ question: { question: questionContent || '', options } })
        set({ userAnswer: '' })
      } else {
        throw new Error('Định dạng phản hồi không hợp lệ')
      }
    } catch (error) {
      console.error('Không thể tạo đoạn văn và câu hỏi:', error)
      set({ error: 'Đã xảy ra lỗi khi tạo bài tập. Vui lòng thử lại.' })
    } finally {
      set({ isLoading: false })
    }
  },

  handleSubmit: async () => {
    const { passage, question, userAnswer } = get()
    try {
      set({ isLoading: true })
      const optionsString = question.options
        .map(
          (option, optIndex) =>
            `   (${String.fromCharCode(65 + optIndex)}) ${option}`,
        )
        .join('\n')
      const questionString = `${question.question}\n${optionsString}`

      const result =
        await model.generateContent(`Đánh giá câu trả lời sau cho bài đọc IELTS:
Đoạn văn: ${passage}
Câu hỏi:
${questionString}
Câu trả lời: ${userAnswer}
Vui lòng chỉ ra đáp án đúng, giải thích đủ và chi tiết của câu hỏi và đáp án đúng, bỏ qua kết luận.`)
      const response = await result.response
      set({ response: response.text() })
    } catch (error) {
      console.error('Lỗi khi đánh giá câu trả lời:', error)
      set({
        error: 'Đã xảy ra lỗi khi đánh giá câu trả lời. Vui lòng thử lại.',
      })
    } finally {
      set({ isLoading: false })
    }
  },

  handleRefresh: () => {
    set({
      passage: '',
      question: { question: '', options: [] },
      userAnswer: '',
      response: '',
      error: '',
    })
    get().getPassageAndQuestion()
  },
}))
