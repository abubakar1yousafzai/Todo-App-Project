# Quickstart: Phase 2 Frontend Features

## Development Setup

1. **Environment Variables**:
   Create a `.env.local` file in the `/frontend` directory:
   ```env
   BETTER_AUTH_SECRET=your_shared_secret_here
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

2. **Installation**:
   ```bash
   cd frontend
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Key Flows

### 1. Authentication
- **Signup**: Visit `/signup` to create a new account.
- **Login**: Visit `/login` to authenticate and obtain a JWT session.
- **Protected Routes**: `/dashboard` requires a valid session.

### 2. Task Management
- **View Tasks**: Automatic on the `/dashboard` page load.
- **Add Task**: Use the "Add Task" button to open the modal.
- **Toggle Task**: Click the checkbox on any task card.
- **Edit/Delete**: Use the action buttons on individual task cards.
