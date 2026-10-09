fraude-recetas-app/
├── .env.local                    # Variables de entorno locales (ignoradas en git)
├── .gitignore                    # Archivos a ignorar en Git (node_modules, .env, etc.)
├── package.json                  # Scripts y dependencias npm
├── next.config.js                # Configuración de Next.js
│
├── public/                       # Archivos estáticos públicos
│   └── favicon.ico               # Ícono de la app
│
├── src/
│   ├── components/               # Componentes de la interfaz de usuario
│   │   ├── FileUploader.jsx      # Selector/Dropzone para subir la receta
│   │   ├── HeatmapViewer.jsx     # Visualizador del mapa de calor de alteración de píxeles
│   │   └── ResultCard.jsx        # Tarjeta de diagnóstico y veredicto final
│   │
│   ├── pages/                    # Enrutamiento de Next.js
│   │   ├── _app.jsx              # Estilos globales y wrapper de Next.js
│   │   ├── index.jsx             # Dashboard / Página principal de validación
│   │   │
│   │   └── api/                  # Serverless Functions (Backend orquestador)
│   │       ├── analyze.js        # Endpoint principal POST /api/analyze
│   │       └── health.js         # Endpoint de chequeo de estado
│   │
│   ├── services/                 # Clientes para consumir servicios externos
│   │   ├── autoencoderClient.js  # Lógica para comunicarse con la Capa 1
│   │   └── llmClient.js          # Lógica para invocar a la Capa 2 (LLM Multimodal)
│   │
│   └── utils/                    # Funciones de apoyo y preprocesamiento
│       └── imagePreprocessing.js # Redimensionamiento a 256x256 / normalización básica
│
└── README.md                     # Documentación del proyecto