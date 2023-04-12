import HomeList from "@/components/List/HomeList";
import customAlert from "@/components/modal/CustomModalAlert";
import Seo from "@/components/utils/Seo";
import { useMainCategory } from "@/hooks/main";
import styled from "styled-components";

export default function Home() {
  const hansotbab = useMainCategory("hansotbab").data;

  // const content: MAIN[] = hansotbab.content as MAIN[];

  const eoullim = useMainCategory("eoullim").data;
  const study = useMainCategory("study").data;
  const club = useMainCategory("club").data;
  const contest = useMainCategory("contest").data;
  // const departmentEvent = useMainCategory("departmentEvent", 1);
  // const etc = useMainCategory("etc", 1);

  return (
    <HomeContainer>
      <Seo />
      <Banner onClick={() => customAlert("확인")} />
      <ListGridWrapper>
        {hansotbab && (
          <HomeList
            category={"hansotbab"}
            items={hansotbab.content ?? []}
            key={"hansotbab"}
          />
        )}
        {eoullim && (
          <HomeList
            category={"eoullim"}
            items={eoullim.content ?? []}
            key={"eoullim"}
          />
        )}
        {study && (
          <HomeList
            category={"study"}
            items={study.content ?? []}
            key={"study"}
          />
        )}
        {club && (
          <HomeList category={"club"} items={club.content ?? []} key={"club"} />
        )}
        {contest && (
          <HomeList
            category={"contest"}
            items={contest.content ?? []}
            key={"contest"}
          />
        )}
      </ListGridWrapper>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const Banner = styled.div<{ color?: string }>`
  width: 100%;
  height: 30vh;

  background-color: ${({ theme, color }) => color ?? theme.color.main};
`;

const ListGridWrapper = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.small}) {
    grid-template-columns: 1fr;
  }
`;
