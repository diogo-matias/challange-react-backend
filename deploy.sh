#!/bin/bash

echo "🚀 Preparando deploy para o Render..."

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Há mudanças não commitadas. Fazendo commit..."
    git add .
    git commit -m "Deploy automático - $(date)"
fi

# Fazer push para o GitHub
echo "📤 Fazendo push para o GitHub..."
git push origin main

echo "✅ Deploy iniciado!"
echo "📋 Próximos passos:"
echo "1. Acesse https://dashboard.render.com/"
echo "2. Crie um novo Web Service"
echo "3. Conecte seu repositório GitHub"
echo "4. Configure:"
echo "   - Build Command: npm install && npm run build"
echo "   - Start Command: npm run start:prod"
echo "5. Adicione as variáveis de ambiente:"
echo "   - NODE_ENV: production"
echo "   - PORT: 3001"
echo "   - DATABASE_URL: (URL do seu banco PostgreSQL)"
echo "   - JWT_SECRET: (chave secreta para JWT)"
echo "   - JWT_EXPIRES_IN: 24h"
echo ""
echo "🌐 Sua API estará disponível em: https://seu-app.onrender.com"
echo "🏥 Health check: https://seu-app.onrender.com/health" 