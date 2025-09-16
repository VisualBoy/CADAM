// IMPORTANT: This file was manually updated because the Supabase CLI
// could not be run in the current environment (Docker not available).
// If you make changes to the database schema, you will need to update
// this file manually, or regenerate it using `supabase gen types typescript`.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      conversations: {
        Row: {
          created_at: string | null;
          current_message_leaf_id: string | null;
          id: string;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          current_message_leaf_id?: string | null;
          id?: string;
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          current_message_leaf_id?: string | null;
          id?: string;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          content: Json;
          conversation_id: string;
          created_at: string;
          id: string;
          parent_message_id: string | null;
          role: string;
        };
        Insert: {
          content: Json;
          conversation_id: string;
          created_at?: string;
          id?: string;
          parent_message_id?: string | null;
          role: string;
        };
        Update: {
          content?: Json;
          conversation_id?: string;
          created_at?: string;
          id?: string;
          parent_message_id?: string | null;
          role?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_conversation_id_fkey';
            columns: ['conversation_id'];
            isOneToOne: false;
            referencedRelation: 'conversations';
            referencedColumns: ['id'];
          },
        ];
      };
      patients: {
        Row: {
          id: string;
          user_id: string;
          first_name: string;
          last_name: string;
          date_of_birth: string | null;
          medical_record_number: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          first_name: string;
          last_name: string;
          date_of_birth?: string | null;
          medical_record_number?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          first_name?: string;
          last_name?: string;
          date_of_birth?: string | null;
          medical_record_number?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'patients_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      scans: {
        Row: {
          id: string;
          patient_id: string;
          scan_type: string;
          status: string;
          image_count: number;
          processing_started_at: string | null;
          processing_completed_at: string | null;
          scan_data: Json | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          patient_id: string;
          scan_type: string;
          status: string;
          image_count?: number;
          processing_started_at?: string | null;
          processing_completed_at?: string | null;
          scan_data?: Json | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          patient_id?: string;
          scan_type?: string;
          status?: string;
          image_count?: number;
          processing_started_at?: string | null;
          processing_completed_at?: string | null;
          scan_data?: Json | null;
          created_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'scans_patient_id_fkey';
            columns: ['patient_id'];
            isOneToOne: false;
            referencedRelation: 'patients';
            referencedColumns: ['id'];
          },
        ];
      };
      orthoses: {
        Row: {
          id: string;
          scan_id: string;
          clinical_parameters: Json;
          openscad_code: string;
          generated_at: string | null;
          status: string | null;
        };
        Insert: {
          id?: string;
          scan_id: string;
          clinical_parameters: Json;
          openscad_code: string;
          generated_at?: string | null;
          status?: string | null;
        };
        Update: {
          id?: string;
          scan_id?: string;
          clinical_parameters?: Json;
          openscad_code?: string;
          generated_at?: string | null;
          status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orthoses_scan_id_fkey';
            columns: ['scan_id'];
            isOneToOne: false;
            referencedRelation: 'scans';
            referencedColumns: ['id'];
          },
        ];
      };
      processing_jobs: {
        Row: {
          id: string;
          scan_id: string;
          status: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          scan_id: string;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          scan_id?: string;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'processing_jobs_scan_id_fkey';
            columns: ['scan_id'];
            isOneToOne: false;
            referencedRelation: 'scans';
            referencedColumns: ['id'];
          },
        ];
      };
      clinical_parameters: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          parameters: Json;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          parameters: Json;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          parameters?: Json;
          created_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'clinical_parameters_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
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
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
