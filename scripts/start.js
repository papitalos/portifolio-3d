const { spawn } = require('child_process');

function run(command, args, options) {
  const child = spawn(command, args, { stdio: 'inherit', ...options });
  child.on('exit', code => {
    if (code !== null) {
      console.log(`${command} exited with code ${code}`);
    }
  });
  return child;
}

const backend = run('pnpm', ['--dir', 'backend', 'start']);
const frontend = run('pnpm', ['--dir', 'frontend', 'start']);

function shutdown() {
  backend.kill('SIGTERM');
  frontend.kill('SIGTERM');
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
