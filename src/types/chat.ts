export interface ChatEntry {
  from: string;
  text: string;
  date: string;
}

export type ChatHistoryResponse = {
  user_input: string;
  ai_output: string;
  created_at: string;
};