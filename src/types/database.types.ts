export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admins_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          category: string
          community: boolean
          created_at: string
          featured: boolean
          intro: string | null
          pr_number: number | null
          shares: number
          slug: string
          status: Database["public"]["Enums"]["status_type"]
          thumbnail: string | null
          thumbnail_path: string | null
          title: string | null
          updated_at: string
          user_id: string | null
          views: number
        }
        Insert: {
          category: string
          community?: boolean
          created_at?: string
          featured?: boolean
          intro?: string | null
          pr_number?: number | null
          shares?: number
          slug: string
          status?: Database["public"]["Enums"]["status_type"]
          thumbnail?: string | null
          thumbnail_path?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
          views?: number
        }
        Update: {
          category?: string
          community?: boolean
          created_at?: string
          featured?: boolean
          intro?: string | null
          pr_number?: number | null
          shares?: number
          slug?: string
          status?: Database["public"]["Enums"]["status_type"]
          thumbnail?: string | null
          thumbnail_path?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "articles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string
          id: string
          title: string
        }
        Insert: {
          color: string
          id?: string
          title: string
        }
        Update: {
          color?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      multiple_choice: {
        Row: {
          answer: string
          description: string
          id: string
          options: string[]
          question: string
          quiz_id: number
        }
        Insert: {
          answer: string
          description?: string
          id?: string
          options: string[]
          question: string
          quiz_id: number
        }
        Update: {
          answer?: string
          description?: string
          id?: string
          options?: string[]
          question?: string
          quiz_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "multiple_choice_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          profile_image: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          profile_image?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          profile_image?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz: {
        Row: {
          category: string | null
          completions: number
          created_at: string | null
          description: string
          id: number
          slug: string
          status: Database["public"]["Enums"]["status_type"] | null
          title: string
          type: Database["public"]["Enums"]["quiz_type"]
        }
        Insert: {
          category?: string | null
          completions?: number
          created_at?: string | null
          description: string
          id?: number
          slug: string
          status?: Database["public"]["Enums"]["status_type"] | null
          title: string
          type: Database["public"]["Enums"]["quiz_type"]
        }
        Update: {
          category?: string | null
          completions?: number
          created_at?: string | null
          description?: string
          id?: number
          slug?: string
          status?: Database["public"]["Enums"]["status_type"] | null
          title?: string
          type?: Database["public"]["Enums"]["quiz_type"]
        }
        Relationships: [
          {
            foreignKeyName: "public_quiz_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_name_all: {
        Row: {
          id: number
          options: string[]
          quiz_id: number
          task: string
        }
        Insert: {
          id?: number
          options: string[]
          quiz_id: number
          task: string
        }
        Update: {
          id?: number
          options?: string[]
          quiz_id?: number
          task?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_name_all_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: true
            referencedRelation: "quiz"
            referencedColumns: ["id"]
          },
        ]
      }
      related_quiz_articles: {
        Row: {
          article_slug: string
          quiz_id: number
        }
        Insert: {
          article_slug: string
          quiz_id: number
        }
        Update: {
          article_slug?: string
          quiz_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "related_quiz_articles_article_slug_fkey"
            columns: ["article_slug"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "related_quiz_articles_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["id"]
          },
        ]
      }
      scores: {
        Row: {
          created_at: string
          id: number
          quiz_id: number
          score: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          quiz_id: number
          score: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          quiz_id?: number
          score?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scores_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      quiz_type: "multiple_choice" | "list"
      status_type: "beta" | "published" | "pending" | "in_review" | "draft"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
