# Webslinger CLI Tool

## Overview

The webslinger CLI tool automates the setup of a full-stack website environment, integrates Tailwind CSS for styling, pushes the project to GitHub, and deploys it to Netlify—all in one streamlined process. It's designed to save developers time by handling tedious setup and deployment tasks.

## Author

Created by Josh Garvey

## Features

- Initializes a Vite-based React project with necessary configurations.
- Integrates Tailwind CSS with default styles and configurations.
- Sets up a basic React component (`App.jsx`) with date and time display.
- Initializes Git repository, creates a new GitHub repository, and makes an initial commit.
- Deploys the project to Netlify, making it instantly accessible via a live URL.

## Prerequisites

Before using webslinger, ensure you have the following installed and set up on your machine:

- **Node.js:** Make sure Node.js is installed. You can download it from [nodejs.org](https://nodejs.org).
- **GitHub CLI:** Install GitHub CLI to automate GitHub repository creation and interaction. Instructions can be found [here](https://cli.github.com).
- **Netlify CLI:** Install Netlify CLI to deploy your project to Netlify directly from the command line. You can install it with `npm install -g netlify-cli`.


## Installation Steps:

- **Demonstration:** (Show command line)
"Let's get started! First, install webslinger globally using npm:

```
npm install -g webslinger
```


## Usage

To create a new project using webslinger, run the following command followed by your desired project name:
```
webslinger <projectName>
```


Replace `<projectName>` with the name of your project.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request on [GitHub](https://github.com/Jgar514/npm/issues).

## License

This project is licensed under the ISC License. See the [LICENSE](https://github.com/Jgar514/npm/blob/main/LICENSE) file for details.
