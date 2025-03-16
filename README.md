# AIT-NLP-Assignment6

## 🤖 RAG with FAISS & GPT-4o-Mini

This repository demonstrates a Retrieval-Augmented Generation (RAG) chatbot using FAISS for retrieval and different language models (Hugging Face’s fastchat-t5-3v-v1 and a custom GPT-4o-Mini model). The system retrieves context from a local knowledge source and generates answers based on user queries. Two main approaches are explored in the included notebooks:

- FAISS + fastchat-t5-3v-v1
- FAISS + GPT-4o-Mini (via OpenAI)

<hr>

## 🚀 **Features**

- 🖥️ **FAISS Retriever:** Efficient similarity search on local documents (aboutMe.pdf) for relevant context retrieval.<br>

- 🧠 **Multiple Generator Models –:**

  - fastchat-t5-3v-v1
  - GPT-4o-Mini through OpenAI integration

- 📖 **Question Logging:** Stores questions and the chatbot’s responses in question-answer.json.<br>

- ✅ **Full-Stack Setup** – React TypeScript frontend and Flask backend for quick demonstration.<br>

<hr>

## 🎥 App Demo

The application flow:

- User enters a question in the React UI.
- Question is sent to the Flask backend at `http://localhost:5000/get-answer`.
- The model fetches relevant context from FAISS (using `aboutMe.pdf`).
- The GPT-4o-Mini composes an answer.
- The answer (and source if available) is returned to the UI and displayed to the user.
![Untitled video - Made with Clipchamp](https://github.com/user-attachments/assets/42779f7f-03cc-4595-82a2-5da1c24c3ee7)
<hr>

The structure is organized as follows:

```
AIT-NLP-Assignment6/
│── app/
│   ├── client/   # React TS frontend
│   │   ├── public/
│   │   ├── src/
│   │   └── ...
│   ├── server/   # Flask backend
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   └── aboutMe.pdf
│
│── notebooks/
│   ├── 01-rag-langchain.ipynb                  # Initial RAG implementation (FAISS + fastchat-t5-3v-v1)
│   ├── 02-rag-langchain-openAI-task-1_3.ipynb  # RAG w/ GPT-4o-Mini (OpenAI-based)
│   ├── docs
│   │   └── aboutMe.pdf
│
│── question-answer.json
│
│── README.md
└── ...
```

<hr>

## Key Directories & Files

- `app/client` : Contains a React TypeScript application running on http://localhost:3000.
- `app/server` : Contains a Flask-based server application running on http://localhost:5000.
- `aboutMe.pdf`: The document used as the knowledge source for retrieval.
- `notebooks/01-rag-langchain.ipynb`: Explores an RAG pipeline using FAISS and fastchat-t5-3v-v1.
- `notebooks/02-rag-langchain-openAI-task-1_3.ipynb`: Demonstrates an RAG pipeline using FAISS and GPT-4o-Mini from OpenAI.
- `question-answer.json`: A record of queries and answers exchanged with the chatbot.

<hr>

## 📊 Model Overview

- FAISS (Retriever)

  - Creates an index from the aboutMe.pdf.
  - When a user asks a question, FAISS identifies top relevant chunks of text to feed into the model.

- Generators

  - fastchat-t5-3v-v1: A T5-based large model from Hugging Face, fine-tuned for chat-like interactions.
  - GPT-4o-Mini: A smaller variant of GPT-4 integrated through OpenAI to experiment with retrieval-augmented generation.

- RAG Process
  - Retrieve relevant context from your local documents via FAISS.
  - Generate an answer using either fastchat-t5-3v-v1 or GPT-4o-Mini, guided by the retrieved context.

<hr>

## 🛠️ How It Works

### Frontend (React TypeScript)

- User Input:
  - A user enters a question in the input field of the chatbot.
- The frontend sends a GET request to `http://localhost:5000/get-answer` with the query parameter `question`.
- The resulting answer (and source if relevant) is displayed in the UI.

### Backend (Flask)

- The Flask server receives the request at /get-answer with:
  - question → The user’s query text.
- On receiving a question, the server retrieves relevant context from FAISS.
- The r GPT-4o-Mini model generates an answer.
- The Flask server responds with a JSON payload containing the answer and optional source text.

<hr>

### Application Endpoints

- **Frontend (React app):** Runs on http://localhost:3000
- **Backend (Flask API):** Runs on http://localhost:5000

### API Endpoints

#### **`GET /`**- Returns author information.

#### **`GET /predict`** - Takes a prompt and sequence length, passes it to the model for prediction, and returns the result.

- Description: Accepts a user’s query and generates an answer using the RAG pipeline.
- Parameters:
  - question (string) → The user’s query text.
- Example Request:

  ```
  curl "http://localhost:5000/get-answer?question=What+is+your+name?"
  ```

- Response Format:
  ```
  {
    "answer": "My name is GPT-4o-Mini, how can I help you today?",
    "source": "aboutMe.pdf"
  }
  ```

## Installation and Setup

### Step 1: Clone the Repository

```
git clone https://github.com/Suryansh2204/AIT-NLP-Assignment6.git
cd AIT-NLP-Assignment5
```

## Setup and Running the Application

##### Install Backend Dependencies

```
cd server
pip install -r requirements.txt
```

#### Install Frontend Dependencies

```
cd client
npm install
```

#### Run the Flask Backend

```
cd server
python app.py
```

#### Run the React Frontend

```
cd client
npm start
```

- Open http://localhost:3000/ in your browser.
