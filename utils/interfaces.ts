export interface Project {
    id: number;
    title: string;
    created_at: string;
    user_id: number;
    is_completed: boolean;
    progress: number;
}