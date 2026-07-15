import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 50px;
  color: white;
`;

function App() {
    console.log('🎨 App компонент рендерится');
    
    return (
        <Container>
            <h1>📚 Кулинарная книга</h1>
            <p>Приложение работает!</p>
            <button onClick={() => alert('Тест работает!')}>
                Проверить
            </button>
        </Container>
    );
}

export default App;