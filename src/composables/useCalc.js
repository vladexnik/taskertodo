import { ref } from 'vue'

export function useCalculate() {
  const result = ref(0)

  function add(a, b) {
    result.value = a + b
  }

  function subtract(a, b) {
    result.value = a - b
  }

  function multiply(a, b) {
    result.value = a * b
  }

  function divide(a, b) {
    if (b !== 0) {
      result.value = a / b
    } else {
      result.value = 'Cannot divide by zero'
    }
  }

  return {
    result,
    add,
    subtract,
    multiply,
    divide
  }
}
