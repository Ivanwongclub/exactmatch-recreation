export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      cms_content_blocks: {
        Row: {
          block_key: string
          content_json: Json
          id: string
          is_published: boolean
          page_slug: string
          updated_at: string
        }
        Insert: {
          block_key: string
          content_json?: Json
          id?: string
          is_published?: boolean
          page_slug: string
          updated_at?: string
        }
        Update: {
          block_key?: string
          content_json?: Json
          id?: string
          is_published?: boolean
          page_slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_content_revisions: {
        Row: {
          block_id: string | null
          block_key: string
          changed_by: string | null
          content_json: Json
          id: string
          is_published: boolean
          page_slug: string
          updated_at: string
        }
        Insert: {
          block_id?: string | null
          block_key: string
          changed_by?: string | null
          content_json?: Json
          id?: string
          is_published?: boolean
          page_slug: string
          updated_at?: string
        }
        Update: {
          block_id?: string | null
          block_key?: string
          changed_by?: string | null
          content_json?: Json
          id?: string
          is_published?: boolean
          page_slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_content_revisions_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "cms_content_blocks"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_media_assets: {
        Row: {
          alt_text: string | null
          id: string
          kind: string
          slug: string
          tags: string[] | null
          updated_at: string
          url: string
        }
        Insert: {
          alt_text?: string | null
          id?: string
          kind?: string
          slug: string
          tags?: string[] | null
          updated_at?: string
          url: string
        }
        Update: {
          alt_text?: string | null
          id?: string
          kind?: string
          slug?: string
          tags?: string[] | null
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      cms_page_settings: {
        Row: {
          cta_body: string
          cta_button_href: string
          cta_button_label: string
          cta_title: string
          hero_subtitle: string
          hero_title: string
          id: string
          intro_paragraph_1: string
          intro_paragraph_2: string
          page_slug: string
          seo_description: string
          seo_title: string
          updated_at: string
        }
        Insert: {
          cta_body?: string
          cta_button_href?: string
          cta_button_label?: string
          cta_title?: string
          hero_subtitle?: string
          hero_title?: string
          id?: string
          intro_paragraph_1?: string
          intro_paragraph_2?: string
          page_slug: string
          seo_description?: string
          seo_title?: string
          updated_at?: string
        }
        Update: {
          cta_body?: string
          cta_button_href?: string
          cta_button_label?: string
          cta_title?: string
          hero_subtitle?: string
          hero_title?: string
          id?: string
          intro_paragraph_1?: string
          intro_paragraph_2?: string
          page_slug?: string
          seo_description?: string
          seo_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_service_items: {
        Row: {
          category: string
          description: string
          display_order: number
          id: string
          is_published: boolean
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          description?: string
          display_order?: number
          id?: string
          is_published?: boolean
          title?: string
          updated_at?: string
        }
        Update: {
          category?: string
          description?: string
          display_order?: number
          id?: string
          is_published?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_user_has_cms_role: {
        Args: { _roles: string[] }
        Returns: boolean
      }
      has_cms_role: {
        Args: { _roles: string[]; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
