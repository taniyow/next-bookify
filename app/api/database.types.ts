export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          author: string | null
          created_at: string
          genre: string | null
          id: number
          publishedDate: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string
          genre?: string | null
          id?: number
          publishedDate?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string
          genre?: string | null
          id?: number
          publishedDate?: string | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
