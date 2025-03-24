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
      business_inquiries: {
        Row: {
          id: string
          company_name: string
          business_type: string
          contact_name: string
          email: string
          phone: string
          additional_info: string | null
          requirements: Json | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name: string
          business_type: string
          contact_name: string
          email: string
          phone: string
          additional_info?: string | null
          requirements?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          business_type?: string
          contact_name?: string
          email?: string
          phone?: string
          additional_info?: string | null
          requirements?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      [key: string]: {
        Row: any
        Insert: any
        Update: any
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
  }
}

export type BusinessInquiry = Database['public']['Tables']['business_inquiries']['Row'];