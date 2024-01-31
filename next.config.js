module.exports = {
    async redirects() {
      return [
        {
          source: '/register',
          destination: '/',
          permanent: true,
        },
      ]
    },
  }
