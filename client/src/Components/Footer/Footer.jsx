import { SocialIcon } from "react-social-icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: black;
  color: white;
  width: 100%;
  height: 220px;
`;

const Contacto = styled.div`
  display: flex;
  width: 100%;
  max-width: 1800px;
  justify-content: space-evenly;
  @media screen and (max-width: 960px) {
    top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Categoria = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media screen and (max-width: 960px) {
    width: 100%;
    margin: 0;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const SubTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 2px 0px;
`;

const Item = styled.p`
  font-size: 14px;
  margin: 1px 0px;
  font-weight: 500;
`;

const Bar = styled.div`
  background-color: white;
  width: 35%;
  height: 3px;
  margin: 10px 25px;
  border-radius: 2px 2px 2px 2px;
`;

const Icon = styled(SocialIcon)`
  width: 20px;
`;

export default function Footer({ contacto }) {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Bar />
        <Title>Contactanos</Title>
        <Bar />
      </div>

      <Contacto>
        <Categoria>
          <SubTitle>Mercancia</SubTitle>
          <Item>Proximamente</Item>
        </Categoria>

        <Categoria>
          <SubTitle>Sobre Nosotros</SubTitle>
          <Item>Proximamente</Item>
        </Categoria>

        <Categoria>
          <SubTitle ref={contacto}>Seguinos</SubTitle>
          <div>
            <Icon
              url="https://instagram.com/infusion.store.pf"
              fgColor="black"
              bgColor="white"
              target="_blank"
              style={{ height: 25, width: 25, margin: 5 }}
            />

            <Icon
              url="https://www.facebook.com/Infusion-Store-103226679074141"
              fgColor="black"
              bgColor="white"
              target="_blank"
              style={{ height: 25, width: 25, margin: 5 }}
            />

            <Icon
              url="https://twitter.com/jaketrent"
              fgColor="black"
              bgColor="white"
              target="_blank"
              style={{ height: 25, width: 25, margin: 5 }}
            />
          </div>
        </Categoria>
      </Contacto>
    </Container>
  );
}
