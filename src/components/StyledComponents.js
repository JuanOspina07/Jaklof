import styled, { keyframes } from 'styled-components';

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const neonFlicker = keyframes`
  0% { text-shadow: 0 0 5px rgba(255,255,255,0.4), 0 0 10px rgba(255,255,255,0.4), 0 0 15px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.4), 0 0 25px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.4); }
  50% { text-shadow: 0 0 5px rgba(255,255,255,0.4), 0 0 10px rgba(255,255,255,0.4), 0 0 15px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.4), 0 0 25px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.4); }
  100% { text-shadow: 0 0 5px rgba(255,255,255,0.4), 0 0 10px rgba(255,255,255,0.4), 0 0 15px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.4), 0 0 25px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.4); }
`;

// Estilos principales
export const Body = styled.body`
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #000;
  color: white;
`;

// Contenedor principal
export const HomeContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background-image: url(imagenes/fondo2.jpg);
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Superposición oscura
export const Overlay = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.87);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Contenido central
export const Content = styled.div`
  text-align: center;
  z-index: 2;
  max-width: 80%;
`;

// Título principal
export const Title = styled.h1`
  color: #eaff82;
  font-family: 'seasons';
  text-align: center;
  font-size: 13rem;
  margin-bottom: 0;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: ${fadeIn} 1.5s ease;
`;

// Estilo para el efecto neon
export const Neon = styled(Title)`
  animation: ${neonFlicker} 1.5s infinite alternate;
`;

// Subtítulo
export const Subtitle = styled.p`
  font-family: 'agrandir';
  font-size: 2rem;
  margin-bottom: 70px;
  margin-top: -30px;
  color: #fff;
  animation: ${fadeIn} 2s ease;
`;

// Botón del catálogo
export const CatalogButton = styled.button`
  font-family: 'agrandir';
  padding: 15px 40px;
  font-size: 1.2rem;
  color: #000;
  background-color: #eaff82;
  border: none;
  border-radius: 30px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #ff3b3b;
    transform: translateY(-5px);
  }
`;

// Botón para redes sociales
export const Btn = styled.button`
  width: 45px;
  height: 45px;
  display: flex;
  border: none;
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 7px;
  transform: translate(-50%, 650%);
  transition: all 0.3s;
  outline: none;
  margin-top: 10px;
  margin-left: -20px;

  &:focus {
    outline: none;
  }
`;

// Contenedor del SVG
export const SvgContainer = styled.span`
  border: none;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
`;

// Estilo del ícono SVG
export const SvgIcon = styled.svg`
  border: none;
  margin: 0;
  width: 45px;
  height: 45px;
`;

// Fondo del botón
export const BG = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  z-index: -1;
  border-radius: 9px;
  pointer-events: none;
  transition: all 0.3s;

  ${Btn}:hover & {
    transform: rotate(35deg);
    transform-origin: bottom;
  }
`;
