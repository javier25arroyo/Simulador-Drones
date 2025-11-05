#!/bin/bash

# 🚀 Script de Despliegue a GitHub Pages

echo "🚁 Simulador de Drones - Despliegue a GitHub Pages"
echo "================================================="
echo ""

# Verificar que estamos en la rama main
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "main" ]; then
    echo "❌ Error: Debes estar en la rama 'main' para desplegar"
    echo "   Rama actual: $current_branch"
    exit 1
fi

echo "✓ Rama correcta: main"

# Verificar cambios no commiteados
if [[ -n $(git status --porcelain) ]]; then
    echo ""
    echo "📝 Cambios detectados:"
    echo ""
    git status --short
    echo ""
    
    read -p "¿Deseas hacer commit de estos cambios? (s/n): " commit
    if [ "$commit" == "s" ] || [ "$commit" == "S" ]; then
        read -p "Mensaje del commit: " message
        if [ -z "$message" ]; then
            message="Update: Deploy to GitHub Pages"
        fi
        
        echo ""
        echo "📦 Agregando archivos..."
        git add .
        
        echo "💾 Creando commit..."
        git commit -m "$message"
        
        echo "✓ Commit creado exitosamente"
    fi
fi

echo ""
echo "🚀 Desplegando a GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "================================================="
    echo "✅ ¡Despliegue iniciado exitosamente!"
    echo "================================================="
    echo ""
    echo "📋 Próximos pasos:"
    echo "1. Ve a: https://github.com/[TU-USUARIO]/Simulador-Drones/actions"
    echo "2. Espera a que el workflow termine (2-3 minutos)"
    echo "3. Tu sitio estará en: https://[TU-USUARIO].github.io/Simulador-Drones/"
    echo ""
    echo "💡 Consejo: Guarda esta URL para acceder rápidamente"
else
    echo ""
    echo "❌ Error al hacer push"
    echo "   Verifica tu conexión y permisos en GitHub"
fi
