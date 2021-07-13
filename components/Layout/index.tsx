import { Nav } from '../Nav';
import { Container } from './style';

export const Layout = ({ children }: any) => {
  return (
    <>
      <Nav />
      <Container>{children}</Container>
    </>
  );
};
