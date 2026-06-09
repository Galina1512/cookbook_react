import React, { useState } from 'react';
import styled from 'styled-components';
import { getGenreName } from '../data/recipes';
import EditRecipeForm from './EditRecipeForm';

const Card = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  }
`;

const CardImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  position: relative;
  
  ${props => !props.imageUrl && `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  `}
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
  z-index: 10;
`;

const IconButton = styled.button`
  background: ${props => props.edit ? 'rgba(52, 152, 219, 0.9)' : 'rgba(255, 68, 68, 0.9)'};
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.edit ? '#3498db' : '#ff4444'};
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  color: #333;
  margin: 0 0 10px 0;
`;

const Badges = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  background: ${props => props.color || '#ff6b35'};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

const RecipeText = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 15px 0;
  white-space: pre-wrap;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #ff6b35;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  width: 100%;
  justify-content: center;
  
  &:hover {
    color: #e05520;
  }
`;

const ExpandedContent = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const Section = styled.div`
  margin-bottom: 20px;
  
  h4 {
    color: #333;
    margin-bottom: 10px;
    font-size: 1rem;
  }
  
  p {
    color: #666;
    line-height: 1.6;
    font-size: 0.9rem;
    margin: 0;
    white-space: pre-wrap;
  }
`;

function RecipeCard({ recipe, onDelete, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  
  const getGenreColor = (genre) => {
    const colors = {
      'breakfast': '#4caf50',
      'supper': '#ff9800',
      'dinner': '#f44336',
      'snack': '#9c27b0'
    };
    return colors[genre] || '#ff6b35';
  };
  
  const handleUpdate = (updatedRecipe) => {
    onUpdate(updatedRecipe);
    setShowEditForm(false);
  };
  
  if (showEditForm) {
    return (
      <EditRecipeForm
        recipe={recipe}
        onSave={handleUpdate}
        onCancel={() => setShowEditForm(false)}
      />
    );
  }
  
  return (
    <Card>
      <CardImage imageUrl={recipe.image}>
        {!recipe.image && '🍲'}
        <ButtonGroup>
          <IconButton edit onClick={() => setShowEditForm(true)} title="Редактировать">
            ✏️
          </IconButton>
          <IconButton onClick={() => onDelete(recipe.id)} title="Удалить">
            ×
          </IconButton>
        </ButtonGroup>
      </CardImage>
      
      <CardContent>
        <Title>{recipe.name}</Title>
        
        <Badges>
          <Badge color={getGenreColor(recipe.ganre)}>
            🍽️ {getGenreName(recipe.ganre)}
          </Badge>
        </Badges>
        
        <RecipeText>
          {expanded ? recipe.recipe : `${recipe.recipe.substring(0, 120)}...`}
        </RecipeText>
        
        <ExpandButton onClick={() => setExpanded(!expanded)}>
          {expanded ? '📖 Свернуть' : '📖 Читать полностью'}
        </ExpandButton>
        
        {expanded && (
          <ExpandedContent>
            <Section>
              <h4>👩‍🍳 Полный рецепт</h4>
              <p>{recipe.recipe}</p>
            </Section>
          </ExpandedContent>
        )}
      </CardContent>
    </Card>
  );
}

export default RecipeCard;