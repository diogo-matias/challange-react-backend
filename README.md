# 🏪 Loja de Brinquedos - Backend API

Backend desenvolvido em NestJS para gerenciamento de uma loja de brinquedos, incluindo clientes, vendas e autenticação.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js para aplicações escaláveis
- **TypeScript** - Linguagem de programação
- **TypeORM** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **Passport** - Estratégias de autenticação
- **Class Validator** - Validação de dados
- **Jest** - Framework de testes

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/diogo-matias/challange-react-backend.git
   cd challange-react-backend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp env.example .env
   ```
   
   Edite o arquivo `.env` com suas configurações:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   JWT_SECRET=sua_chave_secreta_aqui
   JWT_EXPIRES_IN=24h
   PORT=3001
   NODE_ENV=development
   ```

4. **Configure o banco de dados**
   - Crie um banco PostgreSQL
   - Atualize a `DATABASE_URL` no arquivo `.env`

## 🚀 Executando o Projeto

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

### Testes
```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:cov

# Executar apenas testes de clientes e vendas
npm test -- --testPathPattern="(clientes|vendas)"
```

## 📚 Estrutura do Projeto

```
src/
├── auth/                    # Autenticação e autorização
│   ├── auth.controller.ts   # Controller de autenticação
│   ├── auth.service.ts      # Service de autenticação
│   ├── auth.module.ts       # Módulo de autenticação
│   ├── jwt.strategy.ts      # Estratégia JWT
│   └── jwt-auth.guard.ts    # Guard de autenticação
├── clientes/                # Módulo de clientes
│   ├── clientes.controller.ts
│   ├── clientes.service.ts
│   ├── clientes.module.ts
│   ├── dto/                 # Data Transfer Objects
│   │   ├── create-cliente.dto.ts
│   │   └── update-cliente.dto.ts
│   └── entities/            # Entidades do banco
│       └── cliente.entity.ts
├── vendas/                  # Módulo de vendas
│   ├── vendas.controller.ts
│   ├── vendas.service.ts
│   ├── vendas.module.ts
│   └── entities/
│       └── venda.entity.ts
├── config/                  # Configurações
│   └── database.config.ts
├── app.controller.ts        # Controller principal
├── app.module.ts           # Módulo principal
└── main.ts                 # Arquivo de inicialização
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação.

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usar Token
```http
Authorization: Bearer <seu_token_aqui>
```

## 📡 Endpoints da API

### 🔐 Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/login` | Login de usuário |

### 👥 Clientes
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/clientes` | Listar todos os clientes | ✅ |
| GET | `/clientes?filtro=nome` | Buscar clientes por filtro | ✅ |
| GET | `/clientes/:id` | Buscar cliente por ID | ✅ |
| POST | `/clientes` | Criar novo cliente | ✅ |
| PATCH | `/clientes/:id` | Atualizar cliente | ✅ |
| DELETE | `/clientes/:id` | Deletar cliente | ✅ |

### 🛒 Vendas
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/vendas` | Criar nova venda | ✅ |
| GET | `/vendas/por-dia` | Vendas agrupadas por dia | ✅ |
| GET | `/vendas/estatisticas` | Estatísticas de vendas | ✅ |
| GET | `/vendas/cliente/:clienteId` | Vendas por cliente | ✅ |

### 🏥 Health Check
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Mensagem de boas-vindas |
| GET | `/health` | Status da aplicação |

## 📊 Modelos de Dados

### Cliente
```typescript
{
  id: number;
  nomeCompleto: string;
  email: string;
  dataNascimento: Date;
  vendas: Venda[];
}
```

### Venda
```typescript
{
  id: number;
  valor: number;
  data: Date;
  clienteId: number;
  cliente: Cliente;
}
```

## 🔧 Exemplos de Uso

### Criar Cliente
```bash
curl -X POST http://localhost:3001/clientes \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "nomeCompleto": "João Silva",
    "email": "joao@example.com",
    "dataNascimento": "1990-01-01"
  }'
```

### Criar Venda
```bash
curl -X POST http://localhost:3001/vendas \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": 1,
    "valor": 100.50,
    "data": "2024-01-01"
  }'
```

### Buscar Estatísticas
```bash
curl -X GET http://localhost:3001/vendas/estatisticas \
  -H "Authorization: Bearer <token>"
```

## 🧪 Testes

O projeto possui uma suíte completa de testes:

- **Controllers**: Testam todos os endpoints
- **Services**: Testam a lógica de negócio
- **DTOs**: Testam validações
- **Entities**: Testam estrutura das entidades
- **Modules**: Testam configuração dos módulos

### Executar Testes
```bash
# Todos os testes
npm test

# Apenas testes de clientes e vendas
npm test -- --testPathPattern="(clientes|vendas)"

# Com coverage
npm run test:cov
```

## 🚀 Deploy

### Render
O projeto está configurado para deploy no Render:

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Build Command: `npm install && npm run build`
4. Start Command: `npm run start:prod`

### Variáveis de Ambiente para Produção
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://...
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=24h
```

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run start` | Inicia a aplicação |
| `npm run start:dev` | Inicia em modo desenvolvimento |
| `npm run start:prod` | Inicia em modo produção |
| `npm run build` | Compila o projeto |
| `npm test` | Executa os testes |
| `npm run test:watch` | Executa testes em modo watch |
| `npm run test:cov` | Executa testes com coverage |
| `npm run lint` | Executa o linter |

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Diogo Matias**
- GitHub: [@diogo-matias](https://github.com/diogo-matias)

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando NestJS** 