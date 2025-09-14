# Document Viewer & AI Chat Client

This is the **client-side application** for viewing documents and interacting with an AI-powered chat assistant. It is built with **React/Next.js**, **TypeScript**, and **Tailwind CSS** with ShadCN UI components.

---

## Features

- **Document Viewer**

  - Preview PDF documents directly in the browser.
  - Fallback to download or open in a new tab if preview fails.
  - Displays document metadata: title, author, category, date, summary.

- **AI Chat Assistant**

  - Ask questions about the document content.
  - Real-time chat interface with auto-scroll.
  - Messages differentiated by role (user vs AI).

- **Responsive UI**

  - Desktop: side-by-side document viewer and chat.
  - Mobile: tabbed interface for document and chat views.

- **Secure API Integration**

  - Fetches documents and chat data from a secure backend.
  - Supports authentication via Axios instance.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:

   Create a `.env.local` file in the project root:

   ```
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
   ```

   Replace the URL with your backend API endpoint.

---

## Usage

1. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

3. Navigate to a document page using its ID:

   ```
   /documents/<id>
   ```

---

## Project Structure

```
client/
├─ app/
│  ├─ document/[id]/   # Document page & chat interface
├─ components/
│  ├─ ui/             # ShadCN UI components (Card, Tabs, Button, Input, etc.)
├─ lib/
│  ├─ axios.ts        # Axios instance with auth headers
├─ styles/
│  └─ globals.css     # Tailwind CSS setup
├─ package.json
└─ .env.local
```

---

## Key Components

- **DocumentPage.tsx**

  - Fetches document details from backend.
  - Handles PDF preview via `embed` or download fallback.
  - Manages AI chat session and messages.

- **PDFViewer**

  - Renders PDF from a secure blob URL.
  - Fallback UI for unsupported browsers.

- **ChatWindow**

  - Handles sending user questions.
  - Displays AI responses and conversation history.
  - Auto-scrolls to latest message.

---

## Technologies

- React / Next.js
- TypeScript
- Tailwind CSS
- ShadCN UI Components
- Axios for API requests
- PDF `embed` for document preview
- Optional: JWT / session-based authentication

---

## Notes

- The PDF files are fetched securely via Axios to include authentication tokens.
- The chat system requires a backend session to interact with the AI model.
- Ensure your backend API is running and accessible for full functionality.

---

## License

MIT License © \[Your Name]
