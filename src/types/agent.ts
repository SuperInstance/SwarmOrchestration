/**
 * Agent types for swarm orchestration
 */

export interface Agent {
  id: string;
  name: string;
  version: string;
  capabilities: string[];
  status: AgentStatus;
  lastHeartbeat: Date;
  currentTask?: string;
  tasksCompleted: number;
  tasksFailed: number;
  metadata: AgentMetadata;
}

export type AgentStatus = 'starting' | 'idle' | 'busy' | 'draining' | 'offline';

export interface AgentMetadata {
  hostname: string;
  pid: number;
  startTime: Date;
  maxConcurrentTasks: number;
  supportedTaskTypes: string[];
}

export interface AgentHeartbeat {
  agentId: string;
  timestamp: Date;
  status: AgentStatus;
  currentTask?: string;
  load?: number;
}

export interface AgentCapabilities {
  taskTypes: string[];
  maxConcurrentTasks: number;
  priority?: number;
}
