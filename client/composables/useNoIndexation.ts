export default function useNoIndexation() {
  return useHead({
    meta: [
      { name: 'robots', content: 'noindex, nofollow' }
    ],
  })
}