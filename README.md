# 🎓 UniHub Front

Aplicação web desenvolvida para gerenciamento de espaços acadêmicos, permitindo que alunos e professores realizem agendamentos de salas, mesas de estudo e recursos institucionais de forma simples e organizada.

---

# 📌 Sobre o Projeto

O **UniHub** é um sistema voltado para o ambiente universitário, com o objetivo de centralizar:

* 📅 Agendamento de salas de aula
* 📚 Reserva de mesas de estudo
* 🖥️ Solicitação de recursos (projetores, notebooks, etc.)
* 📊 Visualização de cronogramas de professores

A proposta é melhorar a organização e o aproveitamento dos espaços físicos da instituição.

---

# 🚀 Tecnologias Utilizadas

## 🧠 Core da Aplicação

### ⚛️ React

Biblioteca principal para construção da interface.

* Permite criação de componentes reutilizáveis
* Facilita a manutenção e escalabilidade

### ⚡ Vite

Ferramenta de build moderna.

* Inicialização extremamente rápida
* Hot reload eficiente
* Ideal para desenvolvimento ágil

### 🟦 TypeScript

Superset do JavaScript com tipagem.

* Reduz erros em tempo de desenvolvimento
* Melhora a legibilidade e manutenção do código

---

## 🎨 Estilização

### 🌬️ TailwindCSS

Framework utilitário para estilização.

* Permite desenvolvimento rápido de UI
* Facilita consistência visual
* Evita excesso de CSS customizado

### 🧩 clsx

Manipulação de classes CSS condicionalmente.

* Torna o código mais limpo
* Facilita uso com Tailwind

---

## 📦 Gerenciamento de Rotas

### 🌐 React Router DOM

Responsável pela navegação entre páginas.

* Permite SPA (Single Page Application)
* Controle de rotas protegidas (login)

---

## 📝 Formulários e Validação

### 📋 React Hook Form

Gerenciamento de formulários.

* Melhor performance (menos re-renderizações)
* Fácil integração com validação

### ✅ Valibot

Biblioteca de validação de dados.

* Leve e performática
* Tipagem forte com TypeScript
* Alternativa moderna ao Zod

### 🔗 @hookform/resolvers

Integra React Hook Form com Valibot.

---

## 🔌 Comunicação com Back-end

### 🌍 Axios

Cliente HTTP para consumir API.

* Suporte a interceptors
* Configuração global de requisições
* Integração simples com Spring Boot

---

## 🎯 UX e Utilidades

### 🔔 react-hot-toast

Sistema de notificações.

* Feedback visual para ações do usuário

### 📅 date-fns

Manipulação de datas.

* Utilizado em agendamentos e calendários

### 🎨 Phosphor Icons

Biblioteca de ícones.

* Ícones modernos e personalizáveis

---

## 🧪 Testes

### 🧪 Vitest

Framework de testes.

* Rápido e integrado com Vite
* Ideal para testes unitários

---

## 🧹 Qualidade de Código

### 🧼 ESLint

Ferramenta de análise de código.

* Garante boas práticas
* Evita erros comuns

### ✨ Prettier

Formatador de código.

* Padroniza o estilo do código automaticamente

---

# 📁 Estrutura do Projeto

```
src
 ├── assets
 ├── components
 ├── pages
 ├── routes
 ├── services
 ├── schemas
 ├── hooks
 ├── types
 ├── utils
 └── styles
```

---

# ▶️ Como Rodar o Projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/rrezeendisa/UniHub-Front
```

## 2️⃣ Acessar a pasta do projeto

```bash
cd UniHub-Front
```

## 3️⃣ Instalar as dependências

```bash
npm install
```

## 4️⃣ Rodar o projeto

```bash
npm run dev
```

---

# 🌐 Acesso

Após iniciar o projeto, acesse:

```
http://localhost:5173
```

---

# 👩‍💻 Desenvolvido por

Projeto acadêmico desenvolvido para a disciplina de Engenharia de Software.

---

# 📌 Observações

* O back-end da aplicação é desenvolvido em **Java com Spring Boot**
* Integração via API REST
* Banco de dados PostgreSQL

---

✨ UniHub — Gerencie espaços acadêmicos com facilidade.
