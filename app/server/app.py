from flask import Flask,request,jsonify
from flask_cors import CORS
import torch
from langchain.embeddings import OpenAIEmbeddings
from transformers import (
    AutoModelForCausalLM, 
    AutoTokenizer
)
from langchain.llms import OpenAI
import os
from langchain import PromptTemplate
from langchain.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.chains.conversational_retrieval.prompts import CONDENSE_QUESTION_PROMPT
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains.question_answering import load_qa_chain
from langchain.chains import ConversationalRetrievalChain

app=Flask(__name__)

# Enable CORS
CORS(app,resources={r"/*": {"origins": "http://localhost:3000"}})


# os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
os.environ["OPENAI_API_KEY"] = "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"
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

prompt_template = """
     You are a helpful assistant that answers questions about the person based on their personal documents.
    Use the following context to answer the question. If you don't know the answer, just say you don't know.
    Don't make things up.
    {context}
    Question: {question}
    Answer:
    """.strip()

PROMPT = PromptTemplate.from_template(
    template = prompt_template
)
PROMPT.format(
    context = "The person is a mechanical engineer and he has switched his career to data science and AI and is currently pursuing his masters in data science and AI.",
    question = "Who is this person"
)
nlp_docs = './aboutMe.pdf'

loader = PyMuPDFLoader(nlp_docs)
documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 700,
    chunk_overlap = 100
)

doc = text_splitter.split_documents(documents)
embedding_model = OpenAIEmbeddings()

vector_path = './vector-store-openai'
if not os.path.exists(vector_path):
    os.makedirs(vector_path)
    
vectordb = FAISS.from_documents(
    documents = doc,
    embedding = embedding_model
)

db_file_name = 'nlp_stanford'

vectordb.save_local(
    folder_path = os.path.join(vector_path, db_file_name),
    index_name = 'nlp' #default index
)

vectordb = FAISS.load_local(
    folder_path = os.path.join(vector_path, db_file_name),
    embeddings = embedding_model,
    index_name = 'nlp' #default index
)  

retriever = vectordb.as_retriever()

# Initialize OpenAI's GPT model
llm = ChatOpenAI(
    model_name="gpt-4o-mini",  
    temperature=0.7  # Control randomness
)

doc_chain = load_qa_chain(
    llm = llm,
    chain_type = 'stuff',
    prompt = PROMPT,
    verbose = True
)

@app.route('/get-answer', methods=['GET'])
def predict():
    try:
        question =  request.args.get('question') 
        # Tokenize input
        input_document = retriever.get_relevant_documents(question)
        response=doc_chain({'input_documents':input_document, 'question':question})
        return jsonify({'answer': response['output_text'],'source':response['input_documents'][0].metadata['source']})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/', methods=['GET'])
def call():
    return jsonify({'Name':"Suryansh Srivastava", 'ID':124997,'proglib':'NLP Assignment 6'})
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)