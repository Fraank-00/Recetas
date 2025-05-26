import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Para accesibilidad

export default function RecipeCard({ title, image, description, recipe, isFavorite, toggleFavorite }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 relative hover:scale-105 transition-transform">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-3" />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-300 mb-2">{description}</p>

      <div className="flex justify-between items-center">
        <button
          onClick={openModal}
          className="text-sm text-yellow-400 underline hover:text-yellow-300"
        >
          Ver más
        </button>
        <button
          onClick={() => toggleFavorite(recipe)}
          className={`text-xl ${isFavorite ? 'text-yellow-400' : 'text-white'}`}
          title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      {/* Modal de detalles */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Detalle de Receta"
        className="bg-gray-900 text-white rounded-lg p-6 shadow-xl outline-none w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      >
        <h2 className="text-2xl font-bold mb-4">{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-60 object-cover rounded mb-4" />
        <p className="text-sm text-gray-300 whitespace-pre-line">{recipe.strInstructions}</p>
        <button
          onClick={closeModal}
          className="mt-6 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
        >
          Cerrar
        </button>
      </Modal>
    </div>
  );
}
