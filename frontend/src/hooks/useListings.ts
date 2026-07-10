import { useState, useMemo, useCallback } from 'react';
import { mockListings, type ItemCategory, type ListingItem } from '../data/mockData';

type SortField = 'newest' | 'most_wanted' | 'ending_soon';

export function useListings() {
  // Use state to trigger re-renders, initialized with mockListings
  const [itemsData, setItemsData] = useState<ListingItem[]>(mockListings);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ItemCategory | 'All'>('All');
  const [sortField, setSortField] = useState<SortField>('newest');

  const filteredListings = useMemo(() => {
    let items = [...itemsData];

    // Category filter
    if (activeCategory !== 'All') {
      items = items.filter((item) => item.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.owner.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortField) {
      case 'newest':
        items.sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime());
        break;
      case 'most_wanted':
        items.sort((a, b) => b.wantedCount - a.wantedCount);
        break;
      case 'ending_soon':
        items.sort((a, b) => new Date(a.listedDate).getTime() - new Date(b.listedDate).getTime());
        break;
    }

    return items;
  }, [searchQuery, activeCategory, sortField, itemsData]);

  const search = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filterByCategory = useCallback((category: ItemCategory | 'All') => {
    setActiveCategory(category);
  }, []);

  const sort = useCallback((field: SortField) => {
    setSortField(field);
  }, []);

  const addListing = useCallback((newItem: ListingItem) => {
    // Mutate the mockData so it persists across navigations
    mockListings.unshift(newItem);
    // Update local state to trigger render
    setItemsData([...mockListings]);
  }, []);

  return {
    listings: filteredListings,
    allListings: itemsData,
    searchQuery,
    activeCategory,
    sortField,
    search,
    filterByCategory,
    sort,
    addListing,
    isLoading: false,
  };
}
