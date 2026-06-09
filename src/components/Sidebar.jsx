import React from 'react';
import styled from 'styled-components';
import { getGenreName } from '../data/recipes';

const SidebarContainer = styled.aside`
  width: 280px;
  background: white;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 2px 0 12px rgba(0,0,0,0.1);
  padding: 25px;
  z-index: 100;
  
  @media (max-width: 768px) {
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }
`;

const Logo = styled.div`
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 20px;
  
  span {
    font-size: 48px;
  }
  
  h2 {
    margin: 10px 0 0;
    color: #333;
  }
  
  p {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
  }
`;

const SearchBox = styled.div`
  margin-bottom: 25px;
  
  input {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    font-size: 14px;
    transition: border-color 0.3s;
    
    &:focus {
      outline: none;
      border-color: #ff6b35;
    }
  }
`;

const CategoryList = styled.div`
  margin-bottom: 25px;
  
  h3 {
    font-size: 1rem;
    color: #666;
    margin-bottom: 15px;
  }
`;

const CategoryItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 8px;
  background: ${props => props.active ? '#ff6b35' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#666'};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? '#ff6b35' : '#e0e0e0'};
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Stats = styled.div`
  text-align: center;
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #f0f0f0;
  color: #999;
  font-size: 0.85rem;
  
  strong {
    color: #ff6b35;
  }
`;

const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 101;
  background: #ff6b35;
  border: none;
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 12px;
  font-size: 24px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

function Sidebar({ categories, selectedCategory, onCategoryChange, searchTerm, onSearchChange, onAddRecipe, recipeCount, totalRecipes }) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>☰</MenuButton>
      <SidebarContainer isOpen={isOpen}>
        <Logo>
          <span>📖</span>
          <h2>Кулинарная<br/>книга</h2>
          <p>ПП рецепты</p>
        </Logo>
        
        <SearchBox>
          <input
            type="text"
            placeholder="🔍 Поиск рецептов..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </SearchBox>
        
        <CategoryList>
          <h3>📂 Категории</h3>
          {categories.map(cat => (
            <CategoryItem
              key={cat}
              active={selectedCategory === cat}
              onClick={() => onCategoryChange(cat)}
            >
              {cat === 'all' ? '🍽️ Все рецепты' : `📌 ${getGenreName(cat)}`}
            </CategoryItem>
          ))}
        </CategoryList>
        
        <AddButton onClick={onAddRecipe}>
          ➕ Добавить рецепт
        </AddButton>
        
        <Stats>
          Показано: <strong>{recipeCount}</strong> из {totalRecipes} рецептов
        </Stats>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;