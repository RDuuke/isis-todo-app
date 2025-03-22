# 📋 ToDo Angular App — README
### 🚀 Overview
Una aplicación Angular 19 (Standalone Components) para gestionar una lista de tareas (“To‑Do List”) con:

- CRUD completo (Create, Read, Update, Delete)
- Filtro por estado (All / Completed / Pending)
- Modo Dark/Light toggle
- Repositorio configurable: mock (in‑memory) o backend HTTP

---

### 🔧 Instalación

``` bash
git clone https://github.com/RDuuke/isis-todo-app
cd isis-todo-app
npm install
```

---

### ⚙️ Configuración

#### Alternar Mock vs Backend
Edita `src/environments/environment.ts`
``` ts
export const environment = {
  production: false,
  useMock: true,                       // ← true = in‑memory, false = backend HTTP
  apiUrl: 'http://localhost:3000/api/todos'
};
```

- useMock: true → no necesitas backend
- useMock: false → tu backend Node.js debe correr en el puerto 3000

---

### 🚧 Desarrollo
``` bash
npm start
```
Angular CLI levanta en (http://localhost:4200)

---

### ✅ Pruebas Unitarias
``` bash
npm test
```

--- 

### 🗂 Estructura Principal
```
src/app/
├─ core/                # Lógica de dominio, casos de uso e infraestructura
├─ shared/              # Componentes reutilizables (ThemeToggle)
└─ features/todo/       # Página principal TodoListPage
```

---

### 🔒 Seguridad
Todas las peticiones requieren header:
``` bash
x-api-key: mi-secreta-api-key
```

