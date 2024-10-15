class SearchShopsByAddress {
    constructor(shopRepository) {
      this.shopRepository = shopRepository;
    }
  
    async execute(query) {
      if (!query) {
        throw new Error('Search query is required');
      }
      console.log('Executing search with query:', query); // Add this log
      return await this.shopRepository.searchByAddress(query);
    }
  }
  
  module.exports = SearchShopsByAddress;