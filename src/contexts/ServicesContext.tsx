import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { Service, Category, Item } from '../lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface ServicesContextType {
  services: Service[];
  categories: Category[];
  items: Item[];
  loading: boolean;
  error: string | null;
  getServiceCategories: (serviceId: string) => Category[];
  getCategoryItems: (categoryId: string) => Item[];
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    mounted.current = true;
    fetchInitialData();
    setupRealtimeSubscription();
    
    return () => {
      mounted.current = false;
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
    };
  }, []);

  const fetchInitialData = async () => {
    try {
      console.log('🔄 Fetching initial data...');
      setLoading(true);
      setError(null);

      const [
        { data: servicesData, error: servicesError },
        { data: categoriesData, error: categoriesError },
        { data: itemsData, error: itemsError }
      ] = await Promise.all([
        supabase.from('services').select('*').order('sequence'),
        supabase.from('categories').select('*').order('sequence'),
        supabase.from('items').select('*').order('sequence')
      ]);

      if (servicesError || categoriesError || itemsError) {
        throw new Error('Failed to fetch data');
      }

      console.log('Fetched items:', itemsData);

      if (mounted.current) {
        setServices(servicesData || []);
        setCategories(categoriesData || []);
        setItems(itemsData || []);
      }
    } catch (err) {
      console.error('❌ Error fetching data:', err);
      if (mounted.current) {
        setError('Failed to fetch data');
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  };

  const setupRealtimeSubscription = () => {
    if (channelRef.current) {
      channelRef.current.unsubscribe();
    }

    channelRef.current = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'services'
        },
        async () => {
          const { data } = await supabase.from('services').select('*').order('sequence');
          if (mounted.current && data) setServices(data);
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'categories'
        },
        async () => {
          const { data } = await supabase.from('categories').select('*').order('sequence');
          if (mounted.current && data) setCategories(data);
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'items'
        },
        async () => {
          const { data } = await supabase.from('items').select('*').order('sequence');
          if (mounted.current && data) {
            console.log('Updated items:', data);
            setItems(data);
          }
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });
  };

  const getServiceCategories = (serviceIdentifier: string): Category[] => {
    console.log('Getting categories for service:', serviceIdentifier);
    const service = services.find(s => s.service_identifier === serviceIdentifier);
    if (!service) return [];

    // Get all categories that have items assigned to this service
    const serviceItems = items.filter(item => {
      const itemCategories = categories.filter(cat => cat.id === item.category_id);
      return itemCategories.some(cat => {
        // Check if the category belongs to this service based on service_identifier
        const categoryService = services.find(s => 
          s.service_identifier === serviceIdentifier && 
          cat.service_id === s.id
        );
        return !!categoryService;
      });
    });

    const categoryIds = [...new Set(serviceItems.map(item => item.category_id))];
    const availableCategories = categories.filter(category => categoryIds.includes(category.id));
    
    console.log('Available categories:', availableCategories);
    return availableCategories;
  };

  const getCategoryItems = (categoryId: string): Item[] => {
    console.log('Getting items for category:', categoryId);
    const categoryItems = items.filter(item => 
      item.category_id === categoryId && 
      item.status === true
    ).sort((a, b) => a.sequence - b.sequence);
    
    console.log('Category items:', categoryItems);
    return categoryItems;
  };

  const value = {
    services,
    categories,
    items,
    loading,
    error,
    getServiceCategories,
    getCategoryItems
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};