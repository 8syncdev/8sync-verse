<# 
  8 Sync Verse — Dev Runner
  Usage:
    .\dev.ps1              # FE (all web) + BE (encore)
    .\dev.ps1 web          # All web apps only
    .\dev.ps1 be           # Backend only (encore)
    .\dev.ps1 main         # Only 8syncdev.com
    .\dev.ps1 learn        # Only learn-it
    .\dev.ps1 agent        # Only agent
    .\dev.ps1 admin        # Only admin
#>

param(
  [Parameter(Position=0)]
  [ValidateSet("all", "web", "be", "main", "learn", "agent", "admin")]
  [string]$App = "all"
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "  8 Sync Verse — Dev Server" -ForegroundColor Cyan
Write-Host ""

if (!(Get-Command bun -ErrorAction SilentlyContinue)) {
  Write-Host "  [ERROR] Bun not found. Install: https://bun.sh" -ForegroundColor Red; exit 1
}

if (!(Test-Path "node_modules")) { bun install }

switch ($App) {
  "all" {
    Write-Host "  [BE]  Encore   -> http://localhost:4000  (dashboard: localhost:9400)" -ForegroundColor Yellow
    Write-Host "  [FE]  main     -> http://localhost:3000" -ForegroundColor Green
    Write-Host "  [FE]  learn    -> http://localhost:3001" -ForegroundColor Green
    Write-Host "  [FE]  agent    -> http://localhost:3002" -ForegroundColor Green
    Write-Host "  [FE]  admin    -> http://localhost:3003" -ForegroundColor Green
    Write-Host ""
    # Start BE in background, FE in foreground
    Start-Process -NoNewWindow powershell -ArgumentList "-Command", "cd apps/backend; encore run"
    bunx turbo dev --filter='./apps/web/*'
  }
  "web" {
    Write-Host "  main   -> http://localhost:3000" -ForegroundColor Green
    Write-Host "  learn  -> http://localhost:3001" -ForegroundColor Green
    Write-Host "  agent  -> http://localhost:3002" -ForegroundColor Green
    Write-Host "  admin  -> http://localhost:3003" -ForegroundColor Green
    Write-Host ""
    bunx turbo dev --filter='./apps/web/*'
  }
  "be" {
    Write-Host "  Encore -> http://localhost:4000  (dashboard: localhost:9400)" -ForegroundColor Yellow
    Write-Host ""
    Set-Location apps/backend
    encore run
  }
  default {
    $ports = @{ main=3000; learn=3001; agent=3002; admin=3003 }
    Write-Host "  $App -> http://localhost:$($ports[$App])" -ForegroundColor Green
    Write-Host ""
    bunx turbo dev --filter="@8sync/$App"
  }
}
