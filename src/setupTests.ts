
import '@testing-library/jest-dom'
import { server } from './__mocks__/msw/node'
 
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())