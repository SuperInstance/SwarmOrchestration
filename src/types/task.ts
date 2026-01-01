/**
 * Task types for swarm orchestration
 */

export interface Task {
  id: string;
  type: string;
  data: unknown;
  requiredCapabilities: string[];
  priority?: number;
  timeout?: number;
  retryCount?: number;
  maxRetries?: number;
  status: TaskStatus;
  assignedAgent?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  result?: TaskResult;
  error?: string;
}

export type TaskStatus =
  | 'pending'
  | 'queued'
  | 'assigned'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface TaskResult {
  output: unknown;
  metadata?: Record<string, unknown>;
}
