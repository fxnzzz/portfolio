import os
import asyncio
from langchain_google_genai import ChatGoogleGenerativeAI
from browser_use import Agent, Controller
from pydantic import ConfigDict

# 1. API Key & Mute Telemetry
os.environ["GOOGLE_API_KEY"] = "AIzaSyA3s05mYcT2tHAmxv8usOT-ipeXl9qnwII"
os.environ["ANONYMIZED_TELEMETRY"] = "false"

# 2. THE MASTER BYPASS v3
class UnchainedGemini(ChatGoogleGenerativeAI):
    model_config = ConfigDict(extra="allow", arbitrary_types_allowed=True)
    
    @property
    def model_name(self):
        return self.model
        
    @property
    def provider(self):
        return "google"

llm = UnchainedGemini(model="gemini-1.5-pro", temperature=0)

# 3. TANGAN CYBERNETIC
controller = Controller()

@controller.action('Tulis Kode ke App.jsx')
def write_react_code(code: str):
    """Gunakan alat ini untuk menyimpan kode React buatanmu langsung ke file App.jsx"""
    filepath = "C:/makan nih windows/src/App.jsx"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(code)
    return f"SUKSES! Kode berhasil disimpan ke {filepath}"

async def run_automation():
    # 4. INSTRUKSI BARU YANG MASUK AKAL
    task_prompt = (
        "OBJECTIVE: Buat UI High-End Portfolio.\n"
        "1. Buka URL 'http://localhost:5173'.\n"
        "2. Gunakan alat 'Tulis Kode ke App.jsx' untuk menulis struktur React.\n"
        "   - Wajib gunakan Tailwind v4.\n"
        "   - Background seluruh layar harus gelap pekat (#0a0a0a).\n"
        "   - Buat Hero Section dengan teks gradasi elegan untuk nama 'Fathan Mulia'.\n"
        "   - Buat satu area Card bergaya Glassmorphism (blur dan semi transparan).\n"
        "3. Setelah berhasil menggunakan alat tersebut, REFRESH halaman http://localhost:5173.\n"
        "4. Selesai."
    )
    
    agent = Agent(task=task_prompt, llm=llm, controller=controller)
    await agent.run()

if __name__ == "__main__":
    asyncio.run(run_automation())