import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { mockLocalStorage } from './mocks/localStorage';

// Extend Vitest's expect with Testing Library's matchers
expect.extend(matchers);

// Mock localStorage
beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage(),
  });
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  window.localStorage.clear();
}); 