const { mock } = require('bun:test');

/**
 * PRISMA MOCK
 * * Fake database for testing. No real DB needed.
 * * Usage in tests:
 * const { mockUser } = require('./path-to-this-file');
 * mockUser.findMany.mockReturnValue([...]); 
 */

const mockUser = {
  findMany: mock(() => []),
  findUnique: mock(() => null),
  create: mock(() => ({})),
  update: mock(() => ({})),
  delete: mock(() => ({}))
};

const prismaMock = {
  user: mockUser
};

// Reset all mocks between tests
const resetMocks = () => {
  mockUser.findMany.mockReset();
  mockUser.findUnique.mockReset();
  mockUser.create.mockReset();
  mockUser.update.mockReset();
  mockUser.delete.mockReset();
};

module.exports = {
  mockUser,
  prismaMock,
  resetMocks
};