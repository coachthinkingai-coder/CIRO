# ChatWithDocument

A clean and modern web application for searching and querying documents with email validation.

## Features

- Email validation with real-time feedback
- Clean white and blue interface
- Form submission to custom API endpoint
- Responsive design
- Built with React and TypeScript

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
```bash
   npm install
```

2. Run the app:
```bash
   npm run dev
```

3. Open browser at `http://localhost:3000`

## Configuration

Update the API endpoint in `App.tsx` (line 46):
```typescript
const API_URL = 'https://your-api-endpoint.com/submit';
```

The application will send POST requests with the following JSON structure:
```json
{
  "user_email": "user@example.com",
  "user_request": "search query text"
}
```

## Project Structure
```
├── App.tsx           # Main application component
├── index.tsx         # React entry point
├── index.html        # HTML template
├── metadata.json     # Project metadata
├── package.json      # Dependencies
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration
```

## Build for Production
```bash
npm run build
```

## License

MIT
