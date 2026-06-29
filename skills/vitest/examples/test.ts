import { expect, test, vi } from 'vitest'

test('mocks fetch', async () => {
  const spy = vi.spyOn(global, 'fetch').mockResolvedValue(new Response('OK'))
  const res = await fetch('https://example.com')
  expect(await res.text()).toBe('OK')
  expect(spy).toHaveBeenCalledTimes(1)
})