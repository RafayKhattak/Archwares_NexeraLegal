<p align="left">
  <img src="https://github.com/user-attachments/assets/e2c9e7fe-1d3e-4ca9-9046-8066ac7747d9" alt="Nexera Legal Logo" width="100">
  <h1 style="display: inline-block; margin-left: 10px;">Nexera Legal™</h1>
</p>

### *AI-Driven Legal Automation for Pakistan*  
🚀 *NETSOL AI Hackathon 2025 Submission*  

## **Table of Contents**  
- [Introduction](#introduction)  
- [Features](#features)  
  - [Feature 1: Legal Insight & Compliance (Fast-GraphRAG)](#feature-1-legal-insight--compliance-fast-graphrag)  
  - [Feature 2: Smart Tax Assistance](#feature-2-smart-tax-assistance)  
  - [Feature 3: Litigation Assistance](#feature-3-litigation-assistance)  
- [Technical Implementation](#technical-implementation)  
- [Dataset](#dataset)  
- [AI Models & Technologies](#ai-models--technologies)  
- [Infrastructure](#infrastructure)  
- [Frontend Development](#frontend-development)  
- [Backend API Endpoints](#backend-api-endpoints)  
- [Submission Requirements](#submission-requirements)  
- [Setup & Installation](#setup--installation)  
- [Team Archwares™](#team-archwares)  

---

## **Introduction**  
Nexera Legal™ is an **AI-powered legal automation platform** designed specifically for Pakistan. It provides **real-time legal insights, tax assistance, and litigation support** using advanced **LLMs, knowledge graphs, and automation**.  

✅ **Key Capabilities**:  
- AI-powered legal guidance  
- Smart tax report generation  
- Litigation document analysis  
- Real-time compliance updates  

🛠 **Built With**:  
- **Next.js (Frontend)**  
- **FastAPI (Backend)**  
- **AWS EC2 & S3** for deployment  
- **OpenAI GPT-4o Mini, Whisper-1, Embedding Model**  
- **Fast-GraphRAG (HippoRAG)** for legal insights  

---

## **Features**  

### **Feature 1: Legal Insight & Compliance (Fast-GraphRAG)**  
📌 *Transforming legal documents into an intelligent knowledge graph for accurate insights.*  
- **Uses Fast-GraphRAG**, built on **HippoRAG**, mimicking hippocampus memory retrieval.  
- Converts **legal texts into a schemaless Knowledge Graph (KG)**.  
- Identifies **entities and relationships**, linking related concepts.  
- Optimized **graph traversal using PageRank exploration**.  
- Supports **speech-to-text for audio legal documents** using OpenAI **Whisper-1**.  
- **Stores audio and documents** securely in **AWS S3**.  

🔗 **API:**  
- `POST /api/nexgen/GraphChat/` – Start a new legal conversation.  
- `POST /api/nexgen/GraphChat/` (with ChatID) – Continue an existing chat.  

---

### **Feature 2: Smart Tax Assistance**  
📌 *AI-powered tax report generation with real-time compliance updates.*  
- Collects **user input** via a structured **single-page form**.  
- Uses **Pydantic parsers** + **LLM (OpenAI GPT-4o Mini)** to generate structured tax reports.  
- **Compliance updates in real-time** via **Tavily API**.  
- Summarizes updates using **LLM for easy understanding**.  

🔗 **API:**  
- `POST /api/nexgen/TaxAssist/` – Generate tax reports based on user input.  

---

### **Feature 3: Litigation Assistance**  
📌 *AI-driven litigation support for lawyers, extracting key points from legal documents.*  
- **Map-Reduce Chains** (if feasible) extract crucial insights from legal documents.  
- Helps **lawyers identify case-critical points efficiently**.  
- Provides **AI-driven suggestions for litigation strategy**.  

🔗 **API:**  
- `POST /api/nexgen/LitigationAssist/` – Analyze legal documents for key insights.  

---

## **Technical Implementation**  
🛠 **Key Technologies & Architecture**:  
- **Fast-GraphRAG (HippoRAG):** Transforms legal texts into an entity-based knowledge graph.  
- **Pydantic Parsers + LLM Chains (LCEL):** Ensures structured output for tax reports.  
- **Speech-to-Text (Whisper-1):** Converts legal audio recordings into text.  
- **AWS S3:** Secure document storage.  
- **Tavily API:** Fetches and summarizes real-time legal compliance updates.  

---

## **Dataset**  
📚 **Legal Data Source**:  
- Extracted from various **Pakistani legal websites & law resources**.  
- **293,256,000 tokens embedded** for RAG (Retrieval-Augmented Generation).  
- Processed using **OpenAI Embeddings Model** for efficient retrieval.  

---

## **AI Models & Technologies**  
🤖 **LLMs & AI Models Used**:  

| Model        | Purpose |  
|-------------|---------|  
| **GPT-4o Mini** | Legal text understanding, tax processing, compliance checks |  
| **Whisper-1** | Speech-to-text for legal recordings |  
| **OpenAI Embeddings** | Legal knowledge retrieval for RAG |  

---

## **Infrastructure**  
☁️ **Deployment & Cloud Services**:  

| Component | Service |  
|------------|--------|  
| **Frontend** | Vercel (nexeralegal.com) |  
| **Backend** | AWS EC2 (Django-based APIs) |  
| **Storage** | AWS S3 (Legal documents & audio) |  
| **HNSWLib** | In-Memory VectorDB|

![Untitled Diagram drawio](https://github.com/user-attachments/assets/e38b0817-4a09-43c6-9865-a30bf3ec09ab)

---

## **Frontend Development**  
🖥️ **Built with Next.js + Tailwind CSS**  
- **Fully responsive UI**  
- **Modern, attractive design**  
- **No authentication required for MVP**  

---

## **Backend API Endpoints**  
🌐 **Base URL:** `http://44.203.0.32:8000/api/nexgen/`  

| Feature | Endpoint | Method | Payload |  
|---------|---------|--------|---------|  
| Get All Chats | `/ChatList/` | GET | - |  
| Get Chat History | `/Chat/{Chat_ID}/get_chat_messages` | GET | - |  
| Create New Chat (GraphRAG) | `/GraphChat/` | POST | `{ "Query": "hi" }` |  
| Use Existing Chat | `/GraphChat/` | POST | `{ "ChatID": 2, "Query": "hi" }` |  

---

## **Setup & Installation**  
🚀 **Clone & Run Locally**:  
```
git clone https://github.com/yourteam/nexera-legal.git
cd nexera-legal
npm install
npm run dev
```

## **Team Archwares™**  
👨‍💻 **Team Members:**  

- **Rafay Khattak** – Team Lead  
- **Idrees Ghazi** – Backend Developer  
- **Qasim Hussain** – Business Analyst  
- **Ali Irfan** – Solutions Engineer

### **🙏 Special Thanks to NETSOL Technologies**  
We extend our heartfelt gratitude to **NETSOL Technologies** and **Transcend AI Lab** for organizing this incredible AI Hackathon. The opportunity to innovate, collaborate, and push the boundaries of AI-driven solutions has been truly invaluable.  

Your dedication to fostering AI talent and driving technological advancements is inspiring, and we are honored to be a part of this journey. 🚀  

Thank you for this amazing platform!  

