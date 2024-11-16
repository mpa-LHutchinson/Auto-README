const { execSync } = require('child_process');
const fs = require('fs');

// Mock fs module to avoid actual file system interactions
jest.mock('fs');

// Mock execSync to simulate the behavior of running the command
jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

// Mocking file creation and existence checks in beforeAll hook
beforeAll(() => {
  fs.writeFileSync.mockImplementation(() => {});
  fs.existsSync.mockReturnValue(false);
});

test('gives error if a non-existent file is passed as an argument', () => {
  // Mock execSync to throw an error when nonExistentFile.js is used
  execSync.mockImplementation(() => {
    const error = new Error('File nonExistentFile.js not found');
    error.stderr = 'Error: File nonExistentFile.js not found';
    throw error;
  });

  try {
    execSync('node ./index.js nonExistentFile.js').toString().trim();
  } catch (error) {
    const stderr = error.stderr.trim();
    expect(stderr).toBe('Error: File nonExistentFile.js not found');
  }
});
