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

import google.generativeai as genai

def get_answer_from_document(document_path, query):
    """
    Uses Google Gemini API to answer questions based on the PDF document.
    """
    full_text = extract_text_from_pdf(document_path)
    if not full_text:
        return "Could not read the document."

    # Configure Gemini
    api_key = getattr(settings, "GEMINI_API_KEY", None)
    if not api_key:
        return "Gemini API Key is missing."
    
    genai.configure(api_key=api_key)
    
    # Use Gemini Pro
    model = genai.GenerativeModel('gemini-1.5-flash')

    prompt = f"""
    You are an intelligent study assistant. 
    Use the following document text to answer the student's question.
    If the answer is not in the text, say you don't know but try to be helpful based on the context.
    
    Document Content (Truncated/Summary):
    {full_text[:30000]}  # Limit context to avoid token limits if file is huge
    
    Student Question: {query}
    
    Answer:
    """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"AI Error: {str(e)}"
