# Research: UI Redesign

## Neumorphism / Soft UI implementation with Tailwind CSS
- **Decision**: Use a light gray background (`#F7F7F8`) and custom utility classes for "Soft Shadows".
- **Rationale**: Neumorphism relies on subtle color differences and specific shadow offsets. Standard Tailwind `shadow` utility is too harsh.
- **Alternatives**: Using full neumorphic generator libraries, but custom CSS variables in `globals.css` are more maintainable and lightweight.

## Inter Font in Next.js
- **Decision**: Use `next/font/google` in `frontend/app/layout.tsx`.
- **Rationale**: This is the recommended way to use Google Fonts in Next.js 15, providing automatic self-hosting and zero layout shift.
- **Implementation**:
  ```typescript
  import { Inter } from 'next/font/google';
  const inter = Inter({ subsets: ['latin'] });
  // Apply to body className
  ```

## Real-time Search and Filtering
- **Decision**: Local filtering using `useMemo` within the `useTasks` hook.
- **Rationale**: Since the task list is relatively small (typically < 1000 items), client-side filtering provides an "instant" feel without backend round-trips.
- **Pattern**:
  ```typescript
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || 
                            (activeFilter === 'Completed' && task.completed) ||
                            (activeFilter === 'Pending' && !task.completed) ||
                            (activeFilter === 'High Priority' && task.priority === 'High');
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, activeFilter]);
  ```

## Mobile Responsive Patterns
- **Decision**: Stack stats cards on mobile, use horizontal overflow for filter tabs if they exceed screen width.
- **Rationale**: Standard patterns for high-density information displays.
- **Constraints**: Maintain minimum touch target of 44x44px for all interaction points.
