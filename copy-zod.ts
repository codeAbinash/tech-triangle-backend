import { rmSync, cpSync } from 'fs'
import { join } from 'path'

const sourceDir = join(__dirname, 'zod')
const targetDir = join(__dirname, '..', 'tech-triangle', 'src', 'zod')

// Remove existing files in the target directory
rmSync(targetDir, { recursive: true, force: true })

// Copy files from source to target directory
cpSync(sourceDir, targetDir, { recursive: true })

console.log('Zod Copied ✅')
