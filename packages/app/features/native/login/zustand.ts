import { create } from 'zustand/index'

interface LoginState {
  email: string
  password: string
  isPasswordVisible: boolean
  emailError: string
  passwordError: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  togglePasswordVisibility: () => void
  validateEmail: () => boolean
  validatePassword: () => boolean
}

export const useLoginStore = create<LoginState>((set) => ({
  email: '',
  password: '',
  isPasswordVisible: false,
  emailError: '',
  passwordError: '',
  setEmail: (email) => set({ email, emailError: '' }),
  setPassword: (password) => set({ password, passwordError: '' }),
  togglePasswordVisibility: () =>
    set((state) => ({ isPasswordVisible: !state.isPasswordVisible })),
  validateEmail: () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let isValid = true
    set((state) => {
      if (!state.email) {
        isValid = false
        return { emailError: 'Email không được để trống', email: state.email }
      }
      if (!emailRegex.test(state.email)) {
        isValid = false
        return { emailError: 'Email không hợp lệ', email: state.email }
      }
      return { emailError: '', email: state.email }
    })
    return isValid
  },
  validatePassword: () => {
    let isValid = true
    set((state) => {
      if (!state.password) {
        isValid = false
        return {
          passwordError: 'Mật khẩu không được để trống',
          password: state.password,
        }
      }
      if (state.password.length < 6) {
        isValid = false
        return {
          passwordError: 'Mật khẩu phải có ít nhất 6 ký tự',
          password: state.password,
        }
      }
      return { passwordError: '', password: state.password }
    })
    return isValid
  },
}))
