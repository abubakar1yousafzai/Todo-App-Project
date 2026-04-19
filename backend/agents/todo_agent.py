from agents import Agent, OpenAIChatCompletionsModel, AsyncOpenAI
import os
from backend.mcp.server import mcp

# Google Generative AI (OpenAI-compatible)
client = AsyncOpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url=os.getenv("GEMINI_BASE_URL"),
)

model = OpenAIChatCompletionsModel(
    model="gemini-2.0-flash",
    openai_client=client
)

# Agent setup would normally bridge with MCP tools here
# For the purpose of this implementation, we define the agent
agent = Agent(name="TodoAssistant", model=model, system_prompt="You are a helpful task manager.")
