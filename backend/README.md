# Evolution of Todo - FastAPI Backend

A production-ready FastAPI backend for the Evolution of Todo project.

## Features
- **FastAPI**: Modern, fast (high-performance) web framework.
- **SQLModel**: Pydantic + SQLAlchemy for data modeling.
- **JWT Auth**: Bearer token verification with HS256.
- **CORS**: Configured for frontend communication.
- **TDD**: 100% test coverage for core business logic.

## Tech Stack
- Python 3.13+
- uv (Package Manager)
- SQLModel (ORM)
- Neon (Serverless PostgreSQL)
- python-jose (JWT Verification)

## Setup

1. **Install uv**:
   ```bash
   pip install uv
   ```

2. **Install dependencies**:
   ```bash
   uv sync
   ```

3. **Configure Environment**:
   Create a `.env` file based on `.env.example`:
   ```bash
   DATABASE_URL=postgresql://...
   BETTER_AUTH_SECRET=...
   ```

4. **Run the server**:
   ```bash
   uv run uvicorn main:app --reload --port 8000
   ```

## Testing

Run the test suite using pytest:
```bash
$env:PYTHONPATH = "."
uv run pytest
```

## API Endpoints

- `GET /health`: Health check.
- `GET /api/{user_id}/tasks`: List tasks.
- `POST /api/{user_id}/tasks`: Create task.
- `GET /api/{user_id}/tasks/{task_id}`: Get task details.
- `PUT /api/{user_id}/tasks/{task_id}`: Update task.
- `DELETE /api/{user_id}/tasks/{task_id}`: Delete task.
- `PATCH /api/{user_id}/tasks/{task_id}/complete`: Toggle task completion.
