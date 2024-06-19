#!/usr/bin/env node

const { program } = require('commander');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

program
  .version('1.0.0')
  .description('CLI tool to create a website environment, add Tailwind CSS, push to GitHub, and deploy to Netlify')
  .arguments('<projectName>')
  .action((projectName) => {
    console.log(`Creating project '${projectName}'...`);

    // Check if project name is supplied
    if (!projectName) {
      console.error("Error: No project name supplied");
      process.exit(1);
    }

    // Create project folder and navigate into it
    fs.mkdirSync(projectName);
    process.chdir(projectName);

    // Initialize Vite project
    execSync(`npm create vite@latest ${projectName} -- --template react`, { stdio: 'inherit' });
    process.chdir(projectName);

    // Install dependencies
    execSync('npm install', { stdio: 'inherit' });

    // Modify package.json for mobile access
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    let packageJson = fs.readFileSync(packageJsonPath, 'utf8');
    packageJson = packageJson.replace('"dev": "vite"', '"dev": "vite --host"');
    fs.writeFileSync(packageJsonPath, packageJson, 'utf8');

    // Install Tailwind CSS
    execSync('npm install -D tailwindcss postcss autoprefixer', { stdio: 'inherit' });
    execSync('npx tailwindcss init -p', { stdio: 'inherit' });

    // Update Tailwind config
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }`;
    fs.writeFileSync('tailwind.config.js', tailwindConfig, 'utf8');

    // Add Tailwind directives to index.css
    const tailwindDirectives = `@tailwind base;
    @tailwind components;
    @tailwind utilities;`;
    fs.writeFileSync('./src/index.css', tailwindDirectives, 'utf8');

    // Modify App.jsx
    const appJsx = `import React, { useState, useEffect } from 'react';

    function App() {
      const [dateTime, setDateTime] = useState(new Date());

      useEffect(() => {
        const timer = setInterval(() => {
          setDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
      }, []);

      return (
        <div className='w-screen h-screen bg-blue-300 flex flex-col justify-center items-center'>
          <div className='text-yellow-200 text-4xl mb-4'>Hello World</div>
          <div className='text-yellow-200 text-2xl'>
            {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
          </div>
        </div>
      );
    }

    export default App;`;
    fs.writeFileSync('src/App.jsx', appJsx, 'utf8');

    // Initialize Git and create GitHub repository
    execSync('git init', { stdio: 'inherit' });
    execSync(`gh repo create ${projectName} --public --source=. --remote=origin`, { stdio: 'inherit' });

    // Make initial commit
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Initial commit"', { stdio: 'inherit' });
    execSync('git push -u origin main', { stdio: 'inherit' });
    execSync('npm run build', { stdio: 'inherit' });

    // Deploy to Netlify
    execSync('ntl init', { stdio: 'inherit' });
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "netlify"', { stdio: 'inherit' });
    execSync('git push origin main', { stdio: 'inherit' });
    execSync('netlify deploy --prod', { stdio: 'inherit' });
    execSync('netlify open:site', { stdio: 'inherit' });
  });

program.parse(process.argv);
