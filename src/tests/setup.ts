import "@testing-library/jest-dom"
import { afterAll, afterEach, beforeAll, vi } from "vitest"
import { server } from "./mocks/server.mock"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

window.HTMLElement.prototype.scrollIntoView = vi.fn()
window.HTMLElement.prototype.hasPointerCapture = vi.fn()
window.HTMLElement.prototype.releasePointerCapture = vi.fn()
