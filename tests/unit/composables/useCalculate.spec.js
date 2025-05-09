import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { useCalculate } from '@/composables/useCalc'

describe('useCalculate composable', () => {
  const { result, add, multiply, divide } = useCalculate()

  it('should add two numbers correctly', async () => {
    add(5, 3)

    // Wait for the next tick to ensure reactivity
    await nextTick()

    expect(result.value).toBe(8)
  })

  it('should subtract two numbers correctly', async () => {
    const { result, subtract } = useCalculate()
    console.log(result.value)
    subtract(5, 3)

    await nextTick()
    console.log(result.value)
    expect(result.value).toBe(2)
  })

  it('should multiply two numbers correctly', async () => {
    const { result, multiply } = useCalculate()

    multiply(5, 3)

    await nextTick()

    expect(result.value).toBe(15)
  })

  it('should divide two numbers correctly', async () => {
    const { result, divide } = useCalculate()

    divide(6, 3)

    await nextTick()

    expect(result.value).toBe(2)
  })

  it('should handle division by zero', async () => {
    const { result, divide } = useCalculate()

    divide(6, 0)

    await nextTick()

    expect(result.value).toBe('Cannot divide by zero')
  })
})
