export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string
          created_at: string | null
          user_id: string | null
          created_by: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          user_id?: string | null
          created_by?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          user_id?: string | null
          created_by?: string | null
        }
      }
      bundle_products: {
        Row: {
          product_id: Database['public']['Tables']['products']['Row']
          created_at: string | null
          bundle_id: Database['public']['Tables']['bundles']['Row']
          quantity: number
        }
        Insert: {
          product_id: string
          created_at?: string | null
          bundle_id: string
          quantity?: number
        }
        Update: {
          product_id?: string
          created_at?: string | null
          bundle_id?: string
          quantity?: number
        }
      }
      bundles: {
        Row: {
          id: string
          created_at: string | null
          title: string
          main_image: ImageObject
          slug: string
          description: string
          price: number
          cost: number
          category: Database['public']['Tables']['categories']['Row'] | null
          featured: boolean | null
          gender: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          title?: string
          main_image?: ImageObject
          slug: string
          description: string
          price?: number
          cost?: number
          category?: string | null
          featured?: boolean | null
          gender?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          title?: string
          main_image?: ImageObject
          slug?: string
          description?: string
          price?: number
          cost?: number
          category?: string | null
          featured?: boolean | null
          gender?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          created_at: string | null
          name: string | null
          image: {
            src: string
            height: number
            width: number
          }
          slug: string
        }
        Insert: {
          id?: string
          created_at?: string | null
          name?: string | null
          image?:  {
            src: string
            height: number
            width: number
          }
          slug?: string
        }
        Update: {
          id?: string
          created_at?: string | null
          name?: string | null
          image?:  {
            src: string
            height: number
            width: number
          }
          slug?: string
        }
      }
      category_bundles: {
        Row: {
          bundle_id: Database['public']['Tables']['bundles']['Row']
          created_at: string | null
          category_id: Database['public']['Tables']['categories']['Row']
        }
        Insert: {
          bundle_id?: string
          created_at?: string | null
          category_id: string
        }
        Update: {
          bundle_id?: string
          created_at?: string | null
          category_id?: string
        }
      }
      occasion: {
        Row: {
          id: string
          created_at: string | null
          title: string | null
          image: ImageObject
          slug: string
        }
        Insert: {
          id?: string
          created_at?: string | null
          title?: string | null
          image?: ImageObject
          slug: string
        }
        Update: {
          id?: string
          created_at?: string | null
          title?: string | null
          image?: ImageObject
          slug?: string
        }
      }
      occasion_bundles: {
        Row: {
          occasion_id: Database['public']['Tables']['occasion']['Row']
          created_at: string | null
          bundle_id: Database['public']['Tables']['bundles']['Row']
        }
        Insert: {
          occasion_id: string
          created_at?: string | null
          bundle_id: string
        }
        Update: {
          occasion_id?: string
          created_at?: string | null
          bundle_id?: string
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string | null
          profile_id: Database['public']['Tables']['profiles']['Row'] | null
          order_subtotal: number | null
          shipping: number | null
          total: number | null
          city: string | null
          postal_code: string | null
          first_name: string | null
          last_name: string | null
          delivery_method: string | null
          email_address: string | null
          phone_number: string | null
          street_address: string | null
          order_items: Json
          paid: boolean | null
          shipped: boolean | null
          payment_details: Json | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          profile_id?: string | null
          order_subtotal?: number | null
          shipping?: number | null
          total?: number | null
          city?: string | null
          postal_code?: string | null
          first_name?: string | null
          last_name?: string | null
          delivery_method?: string | null
          email_address?: string | null
          phone_number?: string | null
          street_address?: string | null
          order_items: Json
          paid?: boolean | null
          shipped?: boolean | null
          payment_details?: Json | null
        }
        Update: {
          id?: string
          created_at?: string | null
          profile_id?: string | null
          order_subtotal?: number | null
          shipping?: number | null
          total?: number | null
          city?: string | null
          postal_code?: string | null
          first_name?: string | null
          last_name?: string | null
          delivery_method?: string | null
          email_address?: string | null
          phone_number?: string | null
          street_address?: string | null
          order_items?: Json
          paid?: boolean | null
          shipped?: boolean | null
          payment_details?: Json | null
        }
      }
      products: {
        Row: {
          id: string
          created_at: string | null
          name: string | null
          details: string | null
          size: string | null
          price: number | null
          cost: number | null
          category: Database['public']['Tables']['categories']['Row'] | null
          main_image: string
          slug: string
          featured: boolean | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          name?: string | null
          details?: string | null
          size?: string | null
          price?: number | null
          cost?: number | null
          category?: string | null
          main_image?: string
          slug?: string
          featured?: boolean | null
        }
        Update: {
          id?: string
          created_at?: string | null
          name?: string | null
          details?: string | null
          size?: string | null
          price?: number | null
          cost?: number | null
          category?: string | null
          main_image?: string
          slug?: string
          featured?: boolean | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string | null
          first_name: string | null
          last_name: string | null
          email: string | null
          role: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          role?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          role?: string | null
        }
      }
      roles: {
        Row: {
          id: string
          created_at: string | null
          name: string | null
        }
        Insert: {
          id: string
          created_at?: string | null
          name?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_if_admin: {
        Args: { id: string }
        Returns: boolean
      }
      check_user_id_exists: {
        Args: { user_id: string }
        Returns: boolean
      }
      get_total_price: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      return_bundle_with_prices: {
        Args: { id: string }
        Returns: Record<string, unknown>[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

