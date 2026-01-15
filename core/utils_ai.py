import os
from pypdf import PdfReader
from django.conf import settings

def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a PDF file.
    """
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""

def get_answer_from_document(document_path, query):
    """
    Simple RAG: Extracts text and finds relevant context.
    For a production app, replace this with LangChain + Vector DB (FAISS/Pinecone).
    """
    full_text = extract_text_from_pdf(document_path)
    if not full_text:
        return "Could not read the document."

    # Simple Keyword Search (Baseline "AI")
    # Splits text into paragraphs and finds the most relevant one
    paragraphs = full_text.split('\n\n')
    best_paragraph = ""
    max_matches = 0

    query_words = query.lower().split()

    for para in paragraphs:
        match_count = sum(1 for word in query_words if word in para.lower())
        if match_count > max_matches:
            max_matches = match_count
            best_paragraph = para

    if max_matches > 0:
        return f"Found relevant section:\n\n{best_paragraph.strip()}..."
    else:
        # Fallback: Return first 500 chars if no match (or say no match)
        return "I couldn't find a specific answer to that in the document, but here is the beginning:\n\n" + full_text[:500] + "..."
