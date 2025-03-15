export const formatPrice = (price) => {
  // Remove any existing currency symbol or 'Rs ' prefix
  const numericPrice = price.toString().replace(/[^\d.]/g, '');
  return `₹${numericPrice}`;
}; 