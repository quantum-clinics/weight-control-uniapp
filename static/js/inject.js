export default function (origin) {
  const originData = origin.data ? { ...origin.data() } : null;
  const originMethods = origin.methods ? { ...origin.methods } : null;
  return {
    ...origin,
    data() {
      return {
        ...originData,
        errorMessage: '',
      }
    },
    methods: {
      ...originMethods,
      callAPI(promise) {
        return promise
            .catch((err) => {
              this.errorMessage = err.message || '请稍后再试';
            })
      },
    }
  }
}
