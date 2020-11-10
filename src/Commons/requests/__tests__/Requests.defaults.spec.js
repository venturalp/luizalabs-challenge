import { waitFor } from '@testing-library/dom'
import { renderHook } from '@testing-library/react-hooks'
import { rest, server } from 'Commons/tests/Tests.MockServer'

import { useRequests } from '../Requests.defaults'

describe('test requests defaults', () => {
  it('test request without loading', async () => {
    const { result } = renderHook(() => useRequests())
    const response = await result.current
      .get('http://foo.bar')
      .then(resp => resp.data)
    expect(response).toMatchObject({ success: true })
  })
  it('test request without loading and error', async () => {
    const { result } = renderHook(() => useRequests())
    server.use(
      rest.get('http://foo.bar', (req, res, ctx) => res(ctx.status(400))),
    )
    const response = await result.current
      .get('http://foo.bar')
      .then(resp => resp.data)
      .catch(err => err.status)
    waitFor(() => {
      expect(response).toEqual(400)
    })
  })
  it('test request with loading and error', async () => {
    const { result } = renderHook(() => useRequests())
    server.use(
      rest.get('http://foo.bar', (req, res, ctx) => res(ctx.status(400))),
    )
    const response = await result.current
      .get('http://foo.bar', { showLoading: true })
      .then(resp => resp.data)
      .catch(err => err.status)
    waitFor(() => {
      expect(response).toEqual(400)
    })
  })
})
