import { ref } from 'vue'

export function useLoader() {
  const isLoading = ref(false)

  function showLoader() {
    isLoading.value = true
  }

  function hideLoader() {
    isLoading.value = false
  }

  return {
    isLoading,
    showLoader,
    hideLoader
  }
}
