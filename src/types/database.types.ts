export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          category: string;
          community: boolean;
          created_at: string;
          featured: boolean;
          shares: number;
          slug: string;
          status: Database["public"]["Enums"]["status_type"];
          updated_at: string;
          views: number;
        };
        Insert: {
          category: string;
          community?: boolean;
          created_at?: string;
          featured?: boolean;
          shares?: number;
          slug: string;
          status?: Database["public"]["Enums"]["status_type"];
          updated_at?: string;
          views?: number;
        };
        Update: {
          category?: string;
          community?: boolean;
          created_at?: string;
          featured?: boolean;
          shares?: number;
          slug?: string;
          status?: Database["public"]["Enums"]["status_type"];
          updated_at?: string;
          views?: number;
        };
        Relationships: [];
      };
      quiz: {
        Row: {
          category: string;
          completions: number;
          created_at: string | null;
          description: string;
          id: number;
          slug: string;
          status: Database["public"]["Enums"]["status_type"] | null;
          title: string;
          type: Database["public"]["Enums"]["quiz_type"];
        };
        Insert: {
          category: string;
          completions?: number;
          created_at?: string | null;
          description: string;
          id?: number;
          slug: string;
          status?: Database["public"]["Enums"]["status_type"] | null;
          title: string;
          type: Database["public"]["Enums"]["quiz_type"];
        };
        Update: {
          category?: string;
          completions?: number;
          created_at?: string | null;
          description?: string;
          id?: number;
          slug?: string;
          status?: Database["public"]["Enums"]["status_type"] | null;
          title?: string;
          type?: Database["public"]["Enums"]["quiz_type"];
        };
        Relationships: [];
      };
      quiz_multiple_choice: {
        Row: {
          answer: string;
          description: string;
          id: number;
          options: string[];
          question: string;
          quiz_id: number;
        };
        Insert: {
          answer: string;
          description: string;
          id?: number;
          options: string[];
          question: string;
          quiz_id: number;
        };
        Update: {
          answer?: string;
          description?: string;
          id?: number;
          options?: string[];
          question?: string;
          quiz_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_multiple_choice_quiz_id_fkey";
            columns: ["quiz_id"];
            referencedRelation: "quiz";
            referencedColumns: ["id"];
          }
        ];
      };
      quiz_name_all: {
        Row: {
          created_at: string | null;
          id: number;
          options: string[];
          quiz_id: number;
          task: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          options: string[];
          quiz_id: number;
          task: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          options?: string[];
          quiz_id?: number;
          task?: string;
        };
        Relationships: [];
      };
      related_quiz_articles: {
        Row: {
          article_slug: string;
          quiz_id: number;
        };
        Insert: {
          article_slug: string;
          quiz_id: number;
        };
        Update: {
          article_slug?: string;
          quiz_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "related_quiz_articles_article_slug_fkey";
            columns: ["article_slug"];
            referencedRelation: "articles";
            referencedColumns: ["slug"];
          },
          {
            foreignKeyName: "related_quiz_articles_quiz_id_fkey";
            columns: ["quiz_id"];
            referencedRelation: "quiz";
            referencedColumns: ["id"];
          }
        ];
      };
      scores: {
        Row: {
          created_at: string;
          id: number;
          quiz_id: number;
          score: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          quiz_id: number;
          score: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          quiz_id?: number;
          score?: number;
        };
        Relationships: [
          {
            foreignKeyName: "scores_quiz_id_fkey";
            columns: ["quiz_id"];
            referencedRelation: "quiz";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      quiz_type: "multiple_choice" | "list";
      status_type: "beta" | "published" | "pending";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type MultipleChoice = Database["public"]["Tables"]["quiz_multiple_choice"]["Row"];
export type Quiz = Database["public"]["Tables"]["quiz"]["Row"];
export type NameAll = Database["public"]["Tables"]["quiz_name_all"]["Row"];