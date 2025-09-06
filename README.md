# EcoSprout 🌱

A sustainable development project focused on environmental solutions.

## Quick Start

### Prerequisites
- Git installed and configured
- GitHub account
- Node.js (for JavaScript scripts)

### GitHub Setup

1. **Create a GitHub repository** (if you haven't already):
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `EcoSprout` or your preferred name
   - Don't initialize with README (since this project already exists)

2. **Configure Git** (if not already done):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. **Add your GitHub repository as remote**:
   ```bash
   git remote add origin https://github.com/yourusername/ecosprout.git
   ```
   Or with SSH:
   ```bash
   git remote add origin git@github.com:yourusername/ecosprout.git
   ```

### Pushing to GitHub

#### Method 1: Using the Shell Script (Recommended)
```bash
# Make the script executable (already done)
chmod +x push-to-github.sh

# Run the script
./push-to-github.sh

# Or with a custom commit message
./push-to-github.sh "Your commit message here"

# Check configuration only
./push-to-github.sh --check

# View help
./push-to-github.sh --help
```

#### Method 2: Using the Node.js Script
```bash
# Deploy with default message
node github-manager.js deploy

# Deploy with custom message
node github-manager.js deploy "Add new features"

# Initialize and add remote
node github-manager.js init https://github.com/yourusername/ecosprout.git

# Check status
node github-manager.js status

# Push only
node github-manager.js push

# Pull latest changes
node github-manager.js pull

# View help
node github-manager.js help
```

#### Method 3: Manual Git Commands
```bash
# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

### Features of the GitHub Scripts

#### Shell Script (`push-to-github.sh`)
- ✅ Colorized output for better readability
- ✅ Comprehensive error checking
- ✅ Git configuration validation
- ✅ Remote repository verification
- ✅ Interactive commit message input
- ✅ Automatic branch detection
- ✅ Force push option (use with caution)
- ✅ Configuration check mode

#### Node.js Script (`github-manager.js`)
- ✅ Programmatic Git operations
- ✅ Complete workflow automation
- ✅ Status reporting
- ✅ Error handling and recovery
- ✅ Remote repository management
- ✅ Branch management
- ✅ Modular design for integration

### Project Structure
```
EcoSprout-1/
├── frontend/           # Frontend application
├── .gitignore         # Git ignore rules
├── push-to-github.sh  # Shell script for GitHub operations
├── github-manager.js  # Node.js script for GitHub operations
└── README.md          # This file
```

### Troubleshooting

#### Common Issues

1. **"Git user.name is not configured"**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

2. **"No remote origin found"**
   ```bash
   git remote add origin https://github.com/yourusername/repository-name.git
   ```

3. **"Permission denied (publickey)"**
   - Set up SSH keys or use HTTPS with personal access token
   - See [GitHub SSH documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

4. **"Failed to push some refs"**
   ```bash
   git pull origin main --rebase
   git push origin main
   ```

### GitHub Authentication

#### Using HTTPS with Personal Access Token
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` permissions
3. Use the token as your password when prompted

#### Using SSH Keys
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your.email@example.com"`
2. Add to SSH agent: `ssh-add ~/.ssh/id_ed25519`
3. Add public key to GitHub account

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Use the provided scripts to push: `./push-to-github.sh "Add feature-name"`
5. Create a Pull Request

### License

This project is open source. Please check the LICENSE file for details.

---

**Happy coding! 🚀**
