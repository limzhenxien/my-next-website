# Sydney Badminton Court Finder - Deployment Script
Write-Host "Preparing for deployment to Vercel..." -ForegroundColor Cyan

# Navigate to the project directory
Set-Location $PSScriptRoot

# Ensure we have the latest dependencies
Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

# Clean the build directory
if (Test-Path ".next") {
    Write-Host "Cleaning previous build..." -ForegroundColor Green
    Remove-Item -Path ".next" -Recurse -Force
}

# Run type checking
Write-Host "Running type check..." -ForegroundColor Green
npx tsc --noEmit

# Run linting
Write-Host "Running linting..." -ForegroundColor Green
npx next lint --fix

# Build the project
Write-Host "Building project..." -ForegroundColor Green
npm run build

# Deploy to Vercel
Write-Host "Deploying to Vercel..." -ForegroundColor Green
# Check if Vercel CLI is installed
$vercelInstalled = $null
try {
    $vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
} catch {
    # Vercel not installed
}

if ($vercelInstalled) {
    # Vercel CLI is installed, use it for deployment
    vercel --prod
} else {
    # Vercel CLI is not installed, prompt to install
    Write-Host "Vercel CLI is not installed. Would you like to install it now? (y/n)" -ForegroundColor Yellow
    $installVercel = Read-Host
    if ($installVercel -eq 'y') {
        Write-Host "Installing Vercel CLI..." -ForegroundColor Green
        npm install -g vercel
        Write-Host "Deploying to Vercel..." -ForegroundColor Green
        vercel --prod
    } else {
        Write-Host "To deploy to Vercel, please install the Vercel CLI:" -ForegroundColor Yellow
        Write-Host "npm install -g vercel" -ForegroundColor Yellow
        Write-Host "Then run 'vercel --prod' from this directory." -ForegroundColor Yellow
        Write-Host "Alternatively, you can deploy directly from the Vercel dashboard: https://vercel.com/import" -ForegroundColor Yellow
    }
}

Write-Host "Deployment process completed." -ForegroundColor Cyan 