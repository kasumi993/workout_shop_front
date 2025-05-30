import { useMemo } from 'react';
import { useCategories } from '@/context/CategoriesContext';

export function useCategoriesFormatted(format = 'default', includeProductCounts = false) {
  const { categories, loading, error } = useCategories();

  const formattedCategories = useMemo(() => {
    if (!categories.length) return [];

    switch (format) {
      case 'flat':
        // Flatten hierarchical categories for simple lists
        return flattenCategories(categories, includeProductCounts);
        
      case 'hierarchical':
        // Keep parent-child structure for nested displays
        return buildHierarchy(categories, includeProductCounts);
        
      case 'selectable':
        // Only return categories that can be selected (no parents)
        return getSelectableCategories(categories, includeProductCounts);
        
      case 'dropdown':
        // Format for dropdown menus with indentation
        return formatForDropdown(categories, includeProductCounts);
        
      default:
        return categories;
    }
  }, [categories, format, includeProductCounts]);

  return {
    categories: formattedCategories,
    loading,
    error
  };
}

// Helper functions for different formatting options
function flattenCategories(categories, includeProductCounts) {
  const flattened = [];
  
  categories.forEach(category => {
    if (category.children && category.children.length > 0) {
      // Add children only, skip parent
      category.children.forEach(child => {
        flattened.push({
          ...child,
          parentName: category.name,
          ...(includeProductCounts && { count: child.count || 0 })
        });
      });
    } else if (!category.isParent) {
      // Add regular categories
      flattened.push({
        ...category,
        ...(includeProductCounts && { count: category.count || 0 })
      });
    }
  });
  
  return flattened;
}

function buildHierarchy(categories, includeProductCounts) {
  return categories.map(category => ({
    ...category,
    ...(includeProductCounts && { count: category.count || 0 }),
    isParent: category.children && category.children.length > 0,
    children: category.children ? category.children.map(child => ({
      ...child,
      parentId: category.id,
      parentName: category.name,
      ...(includeProductCounts && { count: child.count || 0 })
    })) : []
  }));
}

function getSelectableCategories(categories, includeProductCounts) {
  const selectable = [];
  
  categories.forEach(category => {
    if (category.children && category.children.length > 0) {
      // Add only children
      category.children.forEach(child => {
        selectable.push({
          ...child,
          parentName: category.name,
          ...(includeProductCounts && { count: child.count || 0 })
        });
      });
    } else if (!category.isParent) {
      // Add regular categories
      selectable.push({
        ...category,
        ...(includeProductCounts && { count: category.count || 0 })
      });
    }
  });
  
  return selectable;
}

function formatForDropdown(categories, includeProductCounts) {
  const dropdown = [];
  
  categories.forEach(category => {
    if (category.children && category.children.length > 0) {
      // Add parent as disabled option
      dropdown.push({
        ...category,
        label: category.name,
        value: null,
        disabled: true,
        isParent: true,
        ...(includeProductCounts && { count: category.count || 0 })
      });
      
      // Add children with indentation
      category.children.forEach(child => {
        dropdown.push({
          ...child,
          label: `  ${child.name}`, // Indented
          value: child.slug,
          disabled: false,
          parentName: category.name,
          ...(includeProductCounts && { count: child.count || 0 })
        });
      });
    } else if (!category.isParent) {
      dropdown.push({
        ...category,
        label: category.name,
        value: category.slug,
        disabled: false,
        ...(includeProductCounts && { count: category.count || 0 })
      });
    }
  });
  
  return dropdown;
}