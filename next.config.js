module.exports = {
    async redirects() {
      return [
        {
          source: '/register',
          destination: '/register',
          permanent: true,
        },
      ]
    },
  }
