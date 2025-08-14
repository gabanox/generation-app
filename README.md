# Generation App

Una API REST serverless completa construida con AWS SAM (Serverless Application Model) para la gestión de items.

## 🏗️ Arquitectura

Esta aplicación utiliza una arquitectura serverless completamente administrada por AWS:

- **API Gateway**: Maneja los endpoints REST con soporte CORS
- **5 Funciones Lambda**: Cada función maneja una operación CRUD específica
  - `ListItems`: Lista todos los items
  - `CreateItem`: Crea nuevos items 
  - `GetItem`: Obtiene un item por ID
  - `UpdateItem`: Actualiza un item existente
  - `DeleteItem`: Elimina un item
- **DynamoDB**: Base de datos NoSQL para almacenar items con facturación PAY_PER_REQUEST
- **X-Ray Tracing**: Habilitado en todas las funciones y API Gateway para monitoreo

## 🚀 Estado del Despliegue

**✅ Desplegado exitosamente**

- **Stack**: `generation-app`
- **Región**: `us-east-1` 
- **Estado**: `CREATE_COMPLETE`
- **Runtime**: Node.js 22.x (actualizado desde 18.x)
- **API Base URL**: `https://wiv06gfrnj.execute-api.us-east-1.amazonaws.com/Prod`

## 📚 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/items` | Lista todos los items |
| `POST` | `/items` | Crea un nuevo item |
| `GET` | `/items/{id}` | Obtiene un item específico |
| `PUT` | `/items/{id}` | Actualiza un item existente |
| `DELETE` | `/items/{id}` | Elimina un item |

## 🧪 Ejemplos de Uso

### Listar todos los items
```bash
curl -X GET "https://wiv06gfrnj.execute-api.us-east-1.amazonaws.com/Prod/items"
```

### Crear un nuevo item
```bash
curl -X POST "https://wiv06gfrnj.execute-api.us-east-1.amazonaws.com/Prod/items" \
  -H "Content-Type: application/json" \
  -d '{"name":"Mi Item","description":"Descripción del item"}'
```

### Obtener un item específico
```bash
curl -X GET "https://wiv06gfrnj.execute-api.us-east-1.amazonaws.com/Prod/items/{id}"
```

### Actualizar un item
```bash
curl -X PUT "https://wiv06gfrnj.execute-api.us-east-1.amazonaws.com/Prod/items/{id}" \
  -H "Content-Type: application/json" \
  -d '{"name":"Item Actualizado","description":"Nueva descripción"}'
```

### Eliminar un item
```bash
curl -X DELETE "https://wiv06gfrnj.execute-api.us-east-1.amazonaws.com/Prod/items/{id}"
```

## 🛠️ Desarrollo Local

### Prerrequisitos
- AWS CLI configurado
- SAM CLI instalado
- Node.js 22.x
- Docker (para desarrollo local)

### Comandos Disponibles

```bash
# Construir la aplicación
sam build

# Desplegar a AWS
sam deploy

# Validar template
sam validate

# Desarrollo local
sam local start-api --port 3000

# Probar función individual
sam local invoke ListItems -e events/event.json
```

### Scripts NPM
```bash
npm run build       # sam build
npm run deploy      # sam deploy  
npm run local       # sam local start-api
npm run validate    # sam validate
npm run clean       # limpiar artifacts
```

## 📁 Estructura del Proyecto

```
generation-app/
├── src/
│   ├── ListItems/
│   │   ├── index.js
│   │   └── package.json
│   ├── CreateItem/
│   │   ├── index.js
│   │   └── package.json
│   ├── GetItem/
│   │   ├── index.js
│   │   └── package.json
│   ├── UpdateItem/
│   │   ├── index.js  
│   │   └── package.json
│   └── DeleteItem/
│       ├── index.js
│       └── package.json
├── template.yaml
├── samconfig.toml
├── package.json
└── README.md
```

## 🔧 Configuración

- **template.yaml**: Define todos los recursos AWS
- **samconfig.toml**: Configuración de despliegue de SAM
- **package.json**: Scripts del proyecto y dependencias de desarrollo
- **src/*/package.json**: Dependencias específicas de cada función Lambda

## 📝 Notas Técnicas

- Todas las funciones Lambda usan AWS SDK v2 con DynamoDB DocumentClient
- Respuestas JSON estandarizadas con headers CORS
- Manejo completo de errores con códigos HTTP apropiados
- La función CreateItem genera UUIDs automáticamente e incluye timestamps
- Facturación PAY_PER_REQUEST en DynamoDB para optimización de costos
- X-Ray habilitado para trazabilidad completa

## 🚨 Historial de Cambios

- **v1.1.0**: Actualización a Node.js 22.x runtime (desde 18.x deprecated)
- **v1.0.0**: Implementación inicial de API REST serverless completa

---

**🤖 Generado con [Claude Code](https://claude.ai/code)**