import { create } from "zustand";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ReadingState {
    passage: string;
    missingWords: string[];
    userInputs: string[];
    response: string;
    error: string;
    isLoading: boolean;
    translations: string[];
    setPassage: (passage: string) => void;
    setMissingWords: (words: string[]) => void;
    setUserInputs: (inputs: string[]) => void;
    setResponse: (response: string) => void;
    setError: (error: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    setTranslations: (translations: string[]) => void;
    handleInputChange: (text: string, index: number) => void;
    getPassageAndMissingWords: () => Promise<void>;
    handleSubmit: () => Promise<void>;
    handleRefresh: () => void;
    validateInputs: () => boolean;
    translateWords: (words: string[]) => Promise<void>;
}

const genAI = new GoogleGenerativeAI("AIzaSyA9LA03RXl-StAKbt7_gT4zD0yHExzuMN4");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const useReadingStore = create<ReadingState>((set, get) => ({
    passage: "",
    missingWords: [],
    userInputs: [],
    response: "",
    error: "",
    isLoading: false,
    translations: [],
    setPassage: (passage) => set({ passage }),
    setMissingWords: (words) => set({ missingWords: words }),
    setUserInputs: (inputs) => set({ userInputs: inputs }),
    setResponse: (response) => set({ response }),
    setError: (error) => set({ error }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setTranslations: (translations) => set({ translations }),
    handleInputChange: (text, index) => {
        const newInputs = [...get().userInputs];
        newInputs[index] = text;
        set({ userInputs: newInputs });
    },
    getPassageAndMissingWords: async () => {
        try {
            set({ isLoading: true });
            const result = await model.generateContent("Tạo một đoạn văn ngắn IELTS Reading với ít nhất 15 từ bị thiếu. Đánh dấu các từ bị thiếu bằng [___]. Cung cấp một danh sách riêng các từ bị thiếu. Đoạn văn nên dài khoảng 250 từ.");
            const response = await result.response;
            const text = response.text();
            const parts = text.split("Danh sách các từ bị thiếu:");

            if (parts.length === 2) {
                const [passageWithBlanks, wordList] = parts;
                if (passageWithBlanks && wordList) {
                    set({ passage: passageWithBlanks.trim() });
                    const words = wordList.trim().split(", ");
                    set({ missingWords: words, userInputs: new Array(words.length).fill("") });
                    get().translateWords(words);
                } else {
                    throw new Error("Định dạng đoạn văn không hợp lệ");
                }
            } else {
                throw new Error("Định dạng phản hồi không hợp lệ");
            }
        } catch (error) {
            console.error("Không thể tạo đoạn văn và danh sách các từ bị thiếu:", error);
            set({ error: "Đã xảy ra lỗi khi tạo bài tập. Vui lòng thử lại." });
            if (error instanceof Error) {
                console.error("Chi tiết lỗi:", error.message);
            }
        } finally {
            set({ isLoading: false });
        }
    },
    handleSubmit: async () => {
        const { passage, userInputs } = get();
        if (!get().validateInputs()) {
            set({ error: "Vui lòng điền đầy đủ tất cả các từ còn thiếu." });
            return;
        }
        try {
            set({ isLoading: true });
            const filledPassage = passage.replace(/\[___\]/g, (match, index) => {
                const userInput = userInputs[index];
                return userInput ? userInput : '___';
            });
            const result = await model.generateContent(`Đánh giá câu trả lời sau cho bài tập điền từ IELTS Reading:\n\nĐoạn văn gốc: "${passage}"\n\nĐoạn văn đã điền: "${filledPassage}"\n\nVui lòng đánh giá theo tiêu chí band 8.0, chỉ ra điểm mạnh, điểm yếu và cách cải thiện.`);
            const response = await result.response;
            set({ response: response.text(), error: "" });
        } catch (error) {
            console.error("Lỗi trong quá trình đánh giá:", error);
            set({ error: "Đã xảy ra lỗi trong quá trình đánh giá. Vui lòng thử lại." });
        } finally {
            set({ isLoading: false });
        }
    },
    handleRefresh: () => {
        set({
            passage: "",
            missingWords: [],
            userInputs: [],
            response: "",
            error: "",
            translations: []
        });
        get().getPassageAndMissingWords();
    },
    validateInputs: () => {
        const { userInputs } = get();
        return userInputs.every(input => input.trim() !== "");
    },
    translateWords: async (words: string[]) => {
        try {
            const result = await model.generateContent(`Translate the following English words to Vietnamese:\n\n${words.join(", ")}`);
            const response = await result.response;
            const translations = response.text().split(", ");
            set({ translations });
        } catch (error) {
            console.error("Error translating words:", error);
            set({ translations: words.map(() => "Translation error") });
        }
    }
}));


interface MultiChoiceState {
    passage: string
    questions: Array<{ question: string; options: string[] }>
    userAnswers: string[]
    response: string
    error: string
    isLoading: boolean
    savedAnswers: string[]
    setPassage: (passage: string) => void
    setQuestions: (questions: Array<{ question: string; options: string[] }>) => void
    setUserAnswers: (answers: string[]) => void
    setResponse: (response: string) => void
    setError: (error: string) => void
    setIsLoading: (isLoading: boolean) => void
    setSavedAnswers: (answers: string[]) => void
    getPassageAndQuestions: () => Promise<void>
    handleAnswerSelect: (questionIndex: number, answer: string) => void
    handleSaveAnswers: () => void
    handleSubmit: () => Promise<void>
    handleRefresh: () => void
  }
  
  export const useMultiChoiceStore = create<MultiChoiceState>((set, get) => ({
    passage: '',
    questions: [],
    userAnswers: [],
    response: '',
    error: '',
    isLoading: false,
    savedAnswers: [],
    setPassage: (passage) => set({ passage }),
    setQuestions: (questions) => set({ questions }),
    setUserAnswers: (answers) => set({ userAnswers: answers }),
    setResponse: (response) => set({ response }),
    setError: (error) => set({ error }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setSavedAnswers: (answers) => set({ savedAnswers: answers }),
    getPassageAndQuestions: async () => {
      try {
        set({ isLoading: true })
        const result = await model.generateContent(
          'Create a short IELTS Reading passage at band 8.0 level on a difficult topic, about 150 words long, and 4 multiple-choice questions about that passage. Each question should have 4 options. Please format the result as follows: [PASSAGE] Content of the passage [/PASSAGE] [QUESTIONS] 1. Question 1? A. Option A B. Option B C. Option C D. Option D 2. Question 2? A. ... [/QUESTIONS]',
        )
        const response = await result.response
        const text = response.text()
  
        const passageMatch = text.match(/\[PASSAGE\]([\s\S]*?)\[\/PASSAGE\]/)
        const questionsMatch = text.match(/\[QUESTIONS\]([\s\S]*?)\[\/QUESTIONS\]/)
        if (passageMatch && questionsMatch) {
          const passageText = passageMatch[1]?.trim() ?? ''
          const questionsText = questionsMatch[1]?.trim() ?? ''
  
          set({ passage: passageText })
          const questionsList = questionsText.split(/\d+\./).filter((q) => q.trim() !== '')
          const formattedQuestions = questionsList.map((q) => {
            const [question, ...options] = q.split(/[A-D]\./).map((item) => item.trim())
            return { question: question || '', options }
          })
  
          set({ questions: formattedQuestions })
          set({ userAnswers: new Array(formattedQuestions.length).fill('') })
          set({ savedAnswers: new Array(formattedQuestions.length).fill('') })
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
    handleAnswerSelect: (questionIndex, answer) => {
      const newAnswers = [...get().userAnswers]
      newAnswers[questionIndex] = answer
      set({ userAnswers: newAnswers })
      set({ savedAnswers: newAnswers })
    },
    handleSaveAnswers: () => {
      set({ savedAnswers: [...get().userAnswers] })
    },
    handleSubmit: async () => {
      try {
        set({ isLoading: true })
        const { savedAnswers, questions, passage } = get()
        const answersString = savedAnswers
          .map((answer, index) => `Câu ${index + 1}: ${answer}`)
          .join('\n')
        const questionsString = questions
          .map((q, index) => {
            const optionsString = q.options
              .map((option, optIndex) => `   (${String.fromCharCode(65 + optIndex)}) ${option}`)
              .join('\n')
            return `Câu ${index + 1}: ${q.question}\n${optionsString}`
          })
          .join('\n\n')
  
        const result = await model.generateContent(`Đánh giá câu trả lời sau cho bài đọc IELTS:
  Đoạn văn: ${passage}
  Câu hỏi:
  ${questionsString}
  Câu trả lời:
  ${answersString}
  Vui lòng chỉ ra đáp án đúng, giải thích đủ và chi tiết của câu hỏi và đáp án đúng, bỏ qua kết luận.`)
        const response = await result.response
        set({ response: response.text() })
      } catch (error) {
        console.error('Lỗi khi đánh giá câu trả lời:', error)
        set({ error: 'Đã xảy ra lỗi khi đánh giá câu trả lời. Vui lòng thử lại.' })
      } finally {
        set({ isLoading: false })
      }
    },
    handleRefresh: () => {
      set({
        passage: '',
        questions: [],
        userAnswers: [],
        savedAnswers: [],
        response: '',
        error: '',
      })
      get().getPassageAndQuestions()
    },
  }))