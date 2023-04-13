import HomeList from "@/components/List/HomeList";
import Btn from "@/components/utils/Btn";
import Footer from "@/components/utils/Footer";
import Seo from "@/components/utils/Seo";
import { useMainCategory } from "@/hooks/main";
import router from "next/router";
import styled from "styled-components";

export default function Home() {
  const hansotbab = useMainCategory("hansotbab").data;

  // const content: MAIN[] = hansotbab.content as MAIN[];

  const eoullim = useMainCategory("eoullim").data;
  const study = useMainCategory("study").data;
  const club = useMainCategory("club").data;
  const contest = useMainCategory("contest").data;
  const department_event = useMainCategory("department_event").data;
  const etc = useMainCategory("etc").data;

  return (
    <HomeContainer>
      <Seo />
      {/* <MainBanner /> */}
      <BannerImg src="/Banner.svg" alt="배너" />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        <Btn
          onClick={() => {
            router.push("/register");
          }}
        >
          작성하기
        </Btn>
      </div>
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
        {department_event && (
          <HomeList
            category={"department_event"}
            items={department_event.content ?? []}
            key={"department_event"}
          />
        )}
        {etc && (
          <HomeList category={"etc"} items={etc.content ?? []} key={"etc"} />
        )}
      </ListGridWrapper>
      <Footer />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const BannerImg = styled.img`
  -webkit-user-drag: none;
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
