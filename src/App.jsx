import React, { useState } from 'react';
import styled from 'styled-components';
import RecipeCard from './components/RecipeCard';
import Sidebar from './components/Sidebar';
import AddRecipeForm from './components/AddRecipeForm';
import { recipes, filterRecipes, getCategories, deleteRecipe, addRecipe, updateRecipe } from './data/recipes';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  margin-left: 300px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
    padding-top: 80px;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.5rem;
    color: white;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  }
  
  p {
    color: rgba(255,255,255,0.9);
    font-size: 1.1rem;
    margin-top: 10px;
  }
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 20px;
  color: #666;
  
  h3 {
    margin-top: 20px;
    color: #333;
  }
`;

function App() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const categories = getCategories();
  
  const handleSearchAndFilter = (term, category) => {
    const filtered = filterRecipes(term, category);
    setFilteredRecipes(filtered);
  };
  
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    handleSearchAndFilter(term, selectedCategory);
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    handleSearchAndFilter(searchTerm, category);
  };
  
  const handleAddRecipe = (newRecipe) => {
    addRecipe(newRecipe);
    setRefreshKey(prev => prev + 1);
    handleSearchAndFilter(searchTerm, selectedCategory);
    setShowAddForm(false);
  };
  
  const handleUpdateRecipe = (updatedRecipe) => {
    updateRecipe(updatedRecipe);
    setRefreshKey(prev => prev + 1);
    handleSearchAndFilter(searchTerm, selectedCategory);
  };
  
  const handleDeleteRecipe = (id) => {
    if (window.confirm('Удалить рецепт?')) {
      deleteRecipe(id);
      setRefreshKey(prev => prev + 1);
      handleSearchAndFilter(searchTerm, selectedCategory);
    }
  };
  
  return (
    <AppContainer key={refreshKey}>
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAddRecipe={() => setShowAddForm(true)}
        recipeCount={filteredRecipes.length}
        totalRecipes={recipes.length}
      />
      
      <MainContent>
        <Header>
          <h1>📚 Моя кулинарная книга</h1>
          <p>ПП рецепты для здорового питания</p>
        </Header>
        
        {showAddForm && (
          <AddRecipeForm
            onSave={handleAddRecipe}
            onCancel={() => setShowAddForm(false)}
          />
        )}
        
        {filteredRecipes.length === 0 ? (
          <EmptyState>
            <span style={{ fontSize: '48px' }}>🍽️</span>
            <h3>Рецептов не найдено</h3>
            <p>Попробуйте изменить фильтры или добавьте новый рецепт</p>
          </EmptyState>
        ) : (
          <RecipesGrid>
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onDelete={handleDeleteRecipe}
                onUpdate={handleUpdateRecipe}
              />
            ))}
          </RecipesGrid>
        )}
      </MainContent>
    </AppContainer>
  );
}

export default App;