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
  @media screen and (max-width: 560px) {
    heigth: 120px;
  }
`;

const Contacto = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 1800px;
  justify-content: space-around;
  @media screen and (max-width: 960px) {
    top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media screen and (max-width: 560px) {
    display: flex;
    justify-content: space-around;
`;

const CategoriaRedes = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  @media screen and (max-width: 960px) {
    width: 100%;
    margin: 0;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const Categoria = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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

const SubTitle = styled.a`
  text-decoration: none;
  color: white;
  font-size: 17px;
  font-weight: bold;
  margin: 2px 0px;
  @media screen and (max-width: 960px) {
    width: 100%;
    margin: 0;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 700px) {
    font-size: 14px;
    font-weight: 300;
  }
  @media screen and (max-width: 400px) {
    font-size: 10px;
    font-weight: 300;
  }
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
          <SubTitle
            href="https://www.linkedin.com/in/alegalus/"
            target="_blank"
          >
            Alejandro G.
          </SubTitle>
          <SubTitle
            href="https://www.linkedin.com/in/deborah-sanchez-developer/"
            target="_blank"
          >
            Deborah S.
          </SubTitle>
        </Categoria>

        <Categoria>
          <SubTitle
            href="https://www.linkedin.com/in/fatima-lezcano/"
            target="_blank"
          >
            Fatima L.
          </SubTitle>
          <SubTitle
            href="https://www.linkedin.com/in/ignacio-sm/"
            target="_blank"
          >
            Ignacio S.
          </SubTitle>
        </Categoria>

        <Categoria>
          <SubTitle
            href="https://www.linkedin.com/in/juanimoyano/"
            target="_blank"
          >
            Juan M.
          </SubTitle>
          <SubTitle
            href="https://www.linkedin.com/in/rodrigocremella/"
            target="_blank"
          >
            Rodrigo C.
          </SubTitle>
        </Categoria>

        <Categoria>
          <SubTitle
            href="https://www.linkedin.com/in/roque-iv%C3%A1n-moyano-tucuman/"
            target="_blank"
          >
            Roque M.
          </SubTitle>
        </Categoria>

        <CategoriaRedes>
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
        </CategoriaRedes>
      </Contacto>
    </Container>
  );
}
