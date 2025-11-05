# 🚀 Script de Despliegue a GitHub Pages

Write-Host "🚁 Simulador de Drones - Despliegue a GitHub Pages" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en la rama main
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -ne "main") {
    Write-Host "❌ Error: Debes estar en la rama 'main' para desplegar" -ForegroundColor Red
    Write-Host "   Rama actual: $currentBranch" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Rama correcta: main" -ForegroundColor Green

# Verificar cambios no commiteados
$status = git status --porcelain
if ($status) {
    Write-Host ""
    Write-Host "📝 Cambios detectados:" -ForegroundColor Yellow
    Write-Host ""
    git status --short
    Write-Host ""
    
    $commit = Read-Host "¿Deseas hacer commit de estos cambios? (s/n)"
    if ($commit -eq "s" -or $commit -eq "S") {
        $message = Read-Host "Mensaje del commit"
        if ([string]::IsNullOrWhiteSpace($message)) {
            $message = "Update: Deploy to GitHub Pages"
        }
        
        Write-Host ""
        Write-Host "📦 Agregando archivos..." -ForegroundColor Cyan
        git add .
        
        Write-Host "💾 Creando commit..." -ForegroundColor Cyan
        git commit -m "$message"
        
        Write-Host "✓ Commit creado exitosamente" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "🚀 Desplegando a GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=================================================" -ForegroundColor Green
    Write-Host "✅ ¡Despliegue iniciado exitosamente!" -ForegroundColor Green
    Write-Host "=================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
    Write-Host "1. Ve a: https://github.com/[TU-USUARIO]/Simulador-Drones/actions" -ForegroundColor White
    Write-Host "2. Espera a que el workflow termine (2-3 minutos)" -ForegroundColor White
    Write-Host "3. Tu sitio estará en: https://[TU-USUARIO].github.io/Simulador-Drones/" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 Consejo: Guarda esta URL para acceder rápidamente" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "❌ Error al hacer push" -ForegroundColor Red
    Write-Host "   Verifica tu conexión y permisos en GitHub" -ForegroundColor Yellow
}
