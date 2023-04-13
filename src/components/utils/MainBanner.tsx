import styled from "styled-components";
import Slider from "react-slick";

export default function MainBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>
        <BannerItem>
          <BannerImage
            src="/BannerTest.png"
            alt="banner1"
            style={{ maxWidth: "200px", height: "auto", objectFit: "cover" }}
          />
        </BannerItem>
        <BannerItem>
          <BannerImage
            src="/BannerT.png"
            alt="banner2"
            style={{ maxWidth: "200px", height: "auto", objectFit: "cover" }}
          />
        </BannerItem>
        <BannerItem>
          <BannerImage src="/images/banner3.jpg" alt="banner3" />
        </BannerItem>
      </Slider>
    </SliderWrapper>
  );
}

const SliderWrapper = styled.div`
  margin: 1rem 0;

  .slick-dots li button:before {
    color: white;
  }
`;

const BannerItem = styled.div`
  position: relative;
`;

const BannerImage = styled.img`
  width: 100%;
`;
