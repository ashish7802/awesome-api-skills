// server/api/hello.ts
export default defineEventHandler((event) => {
  return { hello: 'world' }
})