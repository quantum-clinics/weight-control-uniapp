export default function (origin) {
  return {
    ...origin,
    data() {
      return {
        ...origin.data(),
        errorMessage: '',
      }
    },
    methods: {
      ...origin.methods,
      callAPI(promise) {
        promise
            .then((response) => {
              return response;
            })
            .catch((err) => {
              this.errorMessage = err.message || '请稍后再试';
            })
      },
    }
  }
}