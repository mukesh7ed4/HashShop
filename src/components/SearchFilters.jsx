import { useState } from 'react';
import SizeGuide from './SizeGuide';

const SearchFilters = () => {
  const [filters, setFilters] = useState({
    category: '',
    price: '',
    size: '',
    color: ''
  });

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4">
        <select 
          className="border p-2 rounded"
          onChange={(e) => setFilters({...filters, category: e.target.value})}
          value={filters.category}
        >
          <option value="">Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="accessories">Accessories</option>
        </select>

        <select 
          className="border p-2 rounded"
          onChange={(e) => setFilters({...filters, price: e.target.value})}
          value={filters.price}
        >
          <option value="">Price Range</option>
          <option value="0-50">$0 - $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="101+">$101+</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({...filters, size: e.target.value})}
          value={filters.size}
        >
          <option value="">Size</option>
          <option value="xs">XS</option>
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="l">L</option>
          <option value="xl">XL</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({...filters, color: e.target.value})}
          value={filters.color}
        >
          <option value="">Color</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters; 