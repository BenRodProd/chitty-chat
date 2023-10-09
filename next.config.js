/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        HOST: process.env.HOST,
        KEY: process.env.KEY,
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECTID: process.env.PROJECTID,
        STORAGEBUCKET: process.env.STORAGEBUCKET,
        MEASUREMENTID: process.env.MEASUREMENTID,
        APPID: process.env.APPID,
        MEASUREMENTID: process.env.MEASUREMENTID,
        OPENAIKEY: process.env.OPENAIKEY
      },
      async headers() {
        return [
          {
            source: "/(.*)",
            headers: [
              {
                key: "Access-Origin-Opener-Policy",
                value: "same-origin allow-popups",
              },
            ],
          },
        ];
      }
}

module.exports = nextConfig
  
