import { rmSync, cpSync } from 'fs'
import { join } from 'path'

const sourceDir = join(__dirname, 'dist', 'app', 'rpc')
const targetDir = join(__dirname, '..', 'tech-triangle', 'src', 'rpc')

// Remove existing files in the target directory
rmSync(targetDir, { recursive: true, force: true })

// Copy files from source to target directory
cpSync(sourceDir, targetDir, { recursive: true })

console.log('RPC Copied ✅')
