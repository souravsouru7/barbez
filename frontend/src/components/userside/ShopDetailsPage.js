import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopById } from '../../redux/slices/shopSlice';
import { addToFavorites } from '../../redux/slices/authSlice';
import { Star, Clock, MapPin, Scissors, Heart, BookOpen, ChevronDown, X } from 'lucide-react';
import Layout from './Layout';


const ShopDetailsPage = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, favoriteShops } = useSelector((state) => state.auth);
  const { currentShop, loading, error } = useSelector((state) => state.shop);
  const [activeSection, setActiveSection] = useState('about');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  useEffect(() => {
    dispatch(fetchShopById(shopId));
  }, [dispatch, shopId]);

  const handleBookNow = () => {
    navigate(`/booking/${shopId}`);
  };
  const handleAddToFavorites = () => {
    if (user && currentShop) {
      dispatch(addToFavorites({ userId: user._id, shopId: currentShop._id }));
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide message after 3 seconds
    } else {
      // Handle case when user is not logged in
      navigate('/login');
    }
  };
  const isFavorite = favoriteShops && currentShop
  ? favoriteShops.some(shop => shop._id === currentShop._id)
  : false;
  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500">Error: {error}</div>;
  }

  if (!currentShop) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-300">No shop details available.</div>;
  }

  return (
    <Layout>
      <main className="bg-gray-900 min-h-screen text-gray-300">
        {/* Hero Section */}
        <section className="relative h-screen">
          <img
            src={currentShop.shopimage || '/api/placeholder/1200/800?text=Luxurious+Spa'}
            alt={currentShop.shopName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
            <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in-up">{currentShop.shopName}</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl animate-fade-in-up animation-delay-200">{currentShop.description}</p>
            <button
              onClick={() => setActiveSection('services')}
              className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg animate-fade-in-up animation-delay-400 flex items-center"
            >
              Explore Our Services <ChevronDown className="ml-2" />
            </button>
          </div>
        </section>

        {/* Navigation */}
        <nav className="bg-gray-800 shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center space-x-8 py-4">
              {['about', 'services', 'reviews'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => setActiveSection(section)}
                    className={`text-lg font-medium capitalize ${
                      activeSection === section ? 'text-teal-400 border-b-2 border-pink-500' : 'text-gray-400 hover:text-pink-500'
                    } transition-colors duration-300`}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-16">
          {/* About Section */}
          {activeSection === 'about' && (
            <section className="mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 text-pink-500">About Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-lg leading-relaxed mb-6">{currentShop.description}</p>
                  <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4 text-pink-500 flex items-center">
                      <Clock className="mr-2" /> Opening Hours
                    </h3>
                    <p className="text-gray-300">{currentShop.openingHours}</p>
                  </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4 text-pink-500 flex items-center">
                    <MapPin className="mr-2" /> Our Location
                  </h3>
                  <p className="text-gray-300 mb-4">{currentShop.address}</p>
                  <div className="aspect-w-16 aspect-h-9">
                    <img src="/api/placeholder/600/400?text=Map" alt="Location Map" className="object-cover rounded-lg" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Services Section */}
          {activeSection === 'services' && (
            <section className="mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 text-pink-500">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentShop.services && currentShop.services.map((service, index) => (
                  <div
                    key={service._id}
                    className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => openModal(service)}
                  >
                    <Scissors className="text-pink-500 mb-4 h-8 w-8" />
                    <h3 className="text-2xl font-semibold mb-2">{service.serviceName}</h3>
                    <p className="text-gray-400 mb-4">
                      {service.description ? (
                        service.description.length > 100 ? 
                          `${service.description.substring(0, 100)}...` : 
                          service.description
                      ) : 'No description available'}
                    </p>
                    <p className="text-3xl font-bold text-pink-500">${service.price}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews Section */}
          {activeSection === 'reviews' && (
            <section className="mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold mb-8 text-pink-500">Customer Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {[
                  { name: "Sophia Anderson", rating: 5, review: "Absolutely love this place! The staff is incredibly professional and the atmosphere is so relaxing. I always leave feeling refreshed and pampered." },
                  { name: "Michael Chen", rating: 4, review: "Great services and friendly staff. The only reason I'm not giving 5 stars is because it can be a bit pricey, but the quality is definitely there." }
                ].map((review, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      <img src="/api/placeholder/40/40" alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <h4 className="font-semibold text-lg">{review.name}</h4>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`fill-current ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} size={16} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 italic">"{review.review}"</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-800 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-6 text-pink-500">Leave a Review</h3>
                <form>
                  <div className="mb-6">
                    <label htmlFor="rating" className="block mb-2 text-lg">Rating:</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="cursor-pointer hover:text-yellow-400 transition-colors duration-200" size={32} />
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="review-text" className="block mb-2 text-lg">Review:</label>
                    <textarea id="review-text" name="review" rows="4" className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-300"></textarea>
                  </div>
                  <button type="submit" className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-lg">Submit Review</button>
                </form>
              </div>
            </section>
          )}
        </div>

        {/* Floating CTA */}
        <div className="fixed bottom-8 right-8 flex space-x-4">
          <button
            onClick={handleBookNow}
            className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center"
          >
            <BookOpen className="mr-2" /> Book Now
          </button>
          <button 
            onClick={handleAddToFavorites}
            className={`${
              isFavorite ? 'bg-pink-600' : 'bg-pink-500'
            } text-white p-3 rounded-full hover:bg-pink-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
          >
            <Heart fill={isFavorite ? 'white' : 'none'} />
          </button>
        </div>
       
        {/* Service Modal */}
        {isModalOpen && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-pink-500">{selectedService.serviceName}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-200">
                  <X size={24} />
                </button>
              </div>
              <p className="text-gray-300 mb-6">{selectedService.description || 'No description available'}</p>
              <p className="text-3xl font-bold text-pink-500 mb-6">${selectedService.price}</p>
              <button
                onClick={handleBookNow}
                className="w-full bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
              >
                <BookOpen className="mr-2" /> Book This Service
              </button>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default ShopDetailsPage;