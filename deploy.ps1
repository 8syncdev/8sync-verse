<#
  8 Sync Verse — Deploy to Vercel
  Usage:
    .\deploy.ps1              # Deploy all apps
    .\deploy.ps1 main         # Deploy chỉ 8syncdev.com
    .\deploy.ps1 main --prod  # Deploy production
#>

param(
  [Parameter(Position=0)]
  [ValidateSet("all", "main", "learn", "agent", "admin")]
  [string]$App = "all",

  [switch]$Prod
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "  ========================================" -ForegroundColor Magenta
Write-Host "  8 Sync Verse — Vercel Deploy" -ForegroundColor Magenta
Write-Host "  ========================================" -ForegroundColor Magenta
Write-Host ""

# Check vercel CLI
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
  Write-Host "  Installing Vercel CLI..." -ForegroundColor Yellow
  bun add -g vercel
}

$prodFlag = if ($Prod) { "--prod" } else { "" }

$apps = @{
  "main"  = @{ dir = "apps/main";  domain = "8syncdev.com" }
  "learn" = @{ dir = "apps/learn"; domain = "learn-it.8syncdev.com" }
  "agent" = @{ dir = "apps/agent"; domain = "agent.8syncdev.com" }
  "admin" = @{ dir = "apps/admin"; domain = "admin.8syncdev.com" }
}

function Deploy-App($name) {
  $app = $apps[$name]
  if (!(Test-Path $app.dir)) {
    Write-Host "  [SKIP] $name — app not found at $($app.dir)" -ForegroundColor Yellow
    return
  }

  $env = if ($Prod) { "production" } else { "preview" }
  Write-Host "  Deploying $name -> $($app.domain) ($env)..." -ForegroundColor Cyan

  Push-Location $app.dir
  try {
    if ($Prod) {
      vercel --prod
    } else {
      vercel
    }
    Write-Host "  [OK] $name deployed!" -ForegroundColor Green
  } finally {
    Pop-Location
  }
}

if ($App -eq "all") {
  # Build first
  Write-Host "  Building all apps..." -ForegroundColor Yellow
  bunx turbo build
  Write-Host ""

  foreach ($name in @("main", "learn", "agent", "admin")) {
    Deploy-App $name
    Write-Host ""
  }
} else {
  Write-Host "  Building $App..." -ForegroundColor Yellow
  bunx turbo build --filter="@8sync/$App"
  Write-Host ""
  Deploy-App $App
}

Write-Host ""
Write-Host "  Domain mapping (set in Vercel dashboard):" -ForegroundColor DarkGray
Write-Host "    main   -> 8syncdev.com" -ForegroundColor DarkGray
Write-Host "    learn  -> learn-it.8syncdev.com" -ForegroundColor DarkGray
Write-Host "    agent  -> agent.8syncdev.com" -ForegroundColor DarkGray
Write-Host "    admin  -> admin.8syncdev.com" -ForegroundColor DarkGray
Write-Host ""
