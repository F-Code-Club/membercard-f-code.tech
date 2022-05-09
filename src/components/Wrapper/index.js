import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
	position: relative;
	width: 100%;
  max-width: ${props => props.currentWidth < 500 ? props.currentWidth - 50 : 500}px;
  margin: 0 auto;
  padding: 0;
`;

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);
	
	return windowDimensions;
}

const Wrapper = (props) => {
	const {height, width} = useWindowDimensions();
  const { children, ...rest } = props;
	console.log(height, width);
  return <StyledWrapper {...rest} currentWidth={width}>{children}</StyledWrapper>;
};

export default Wrapper;
