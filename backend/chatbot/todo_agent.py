from agents import Agent, OpenAIChatCompletionsModel
from openai import AsyncOpenAI
from tools.server import todo_tools
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# Gemini via OpenAI-compatible Chat Completions API
external_client: AsyncOpenAI = AsyncOpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url=os.getenv("GEMINI_BASE_URL"),
)

llm_model: OpenAIChatCompletionsModel = OpenAIChatCompletionsModel(
    model="gemini-2.5-flash",
    openai_client=external_client
)

agent: Agent = Agent(
    name="TodoAssistant",
    model=llm_model,
    instructions=(
        "You are a helpful task manager. Use the available tools to add, list, "
        "update, complete, or delete tasks. Always use a tool when the user's "
        "request involves managing tasks. Be concise in your replies."
    ),
    tools=todo_tools,
)
