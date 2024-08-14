import { useNavigate } from "react-router-dom";
import LogoImg from "../assets/logo/readly_logo_long.png";
import CardImg1 from "../assets/onboard/card1_front.png";
import CardImg1_back from "../assets/onboard/card1_back.png";
import CardImg2 from "../assets/onboard/card2.png";
import CardImg3 from "../assets/onboard/card3.png";
import ReviewImg1 from "../assets/onboard/review1.png";
import ReviewImg2 from "../assets/onboard/review2.png";
import ReviewImg3 from "../assets/onboard/review3.png";
import ReviewImg4 from "../assets/onboard/review4.png";
import TimeCat from "../assets/onboard/time_cat.png";
import TimeBg from "../assets/onboard/time_bg.png";
import MeetingBg from "../assets/onboard/meeting_bg.png";
import Bg from "../assets/background/background_img.png";

import GoButton from "../components/GoButton/GoButton.jsx";

export default function OnBoard() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="w-full min-h-screen bg-white p-4 md:p-10 flex flex-col items-center">
        <div className="w-full space-y-40 md:space-y-80">
          {/* 로고 및 소개 섹션 */}
          <div
            className="w-full h-64 md:h-96 rounded-lg grid justify-start"
            data-aos="fade-down"
          >
            <img className="w-48 md:w-[28rem]" src={LogoImg} alt="Logo img.." />
            <h2 className="font-bold text-xl md:text-3xl -mt-8 md:-mt-28 ml-16 md:ml-40">
              <span className="text-[#549CB9]">Read</span> + Friend
              <span className="text-custom-highlight">ly</span>
            </h2>
            <h1 className="font-bold text-lg md:text-[2.5rem] -mt-6 md:-mt-24 ml-20 md:ml-[9.5rem]">
              리들리를 <span className="text-custom-highlight">소개</span>
            </h1>
          </div>

          <div className="w-full bg-white flex flex-col items-center">
            <div className="w-full max-w-6xl mx-auto">
              {/* 카드 및 텍스트 섹션 */}
              <div className="relative flex flex-col lg:flex-row items-center justify-between">
                {/* 왼쪽 카드 섹션 */}
                <div
                  className="w-full lg:w-1/2 mb-8 lg:mb-0"
                  data-aos="fade-right"
                >
                  <div className="relative w-48 md:w-[28rem] h-64 md:h-[32rem] -ml-8 md:-ml-32">
                    <img
                      src={CardImg1}
                      alt="Card 1"
                      className="w-32 h-48 md:w-64 md:h-96 absolute left-0 bottom-0 transform rotate-[10deg] z-10"
                    />
                    <img
                      src={CardImg2}
                      alt="Card 2"
                      className="w-32 h-48 md:w-64 md:h-96 absolute left-0 bottom-0 -mb-6 md:-mb-12 transform rotate-[35deg] z-20"
                    />
                    <img
                      src={CardImg3}
                      alt="Card 3"
                      className="w-32 h-48 md:w-64 md:h-96 absolute left-0 bottom-0 -mb-16 md:-mb-32 transform rotate-[65deg] z-30"
                    />
                  </div>
                </div>
                {/* 오른쪽 카드 섹션 */}
                <div
                  className="w-full lg:w-1/2 flex justify-end"
                  data-aos="fade-left"
                >
                  <div className="relative w-64 md:w-[36rem] h-48 md:h-[28rem]">
                    <img
                      src={CardImg1_back}
                      alt="Right Card Back"
                      className="w-32 h-48 md:w-64 md:h-96 absolute top-0 right-8 md:right-12 z-10 transform rotate-[30deg] object-cover"
                    />
                    <img
                      src={CardImg1}
                      alt="Right Card Front"
                      className="w-32 h-48 md:w-64 md:h-96 absolute top-2 md:top-4 left-8 md:left-16 z-20 transform rotate-[-5deg] object-cover"
                    />
                  </div>
                </div>

                {/* 텍스트 오버레이 */}
                <div className="absolute top-0 left-0 right-0 text-center lg:text-right -mt-12 md:-mt-24">
                  <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4">
                    <span className="text-custom-highlight">
                      마음에 드는 문구
                    </span>
                    를
                    <br />
                    <span className="text-custom-highlight">이미지</span>로
                    만들고 싶으신가요?
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div
            className="w-full rounded-lg grid justify-start"
            data-aos="fade-down"
          >
            <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-8">
              <p className="mb-4">
                사람들과 <span className="text-custom-highlight">느낀점을</span>
              </p>
              <p>
                <span className="text-custom-highlight">공유</span>하고
                싶으신가요?
              </p>
            </h2>
            <div className="mt-8 overflow-hidden">
              <div className="flex animate-slide-right">
                {[ReviewImg1, ReviewImg2, ReviewImg3, ReviewImg4].map(
                  (img, index) => (
                    <div
                      key={index}
                      className="flex-none w-40 h-48 md:w-80 md:h-96 mx-2"
                    >
                      <img
                        src={img}
                        alt={`Book ${index + 1}`}
                        className="w-full h-full object-contain rounded-lg shadow-md"
                      />
                    </div>
                  )
                )}
                {/* 무한 루프를 위해 이미지 반복 */}
                {[ReviewImg1, ReviewImg2, ReviewImg3, ReviewImg4].map(
                  (img, index) => (
                    <div
                      key={`repeat-${index}`}
                      className="flex-none w-40 h-48 md:w-80 md:h-96 mx-2"
                    >
                      <img
                        src={img}
                        alt={`Book ${index + 1}`}
                        className="w-full h-full object-contain rounded-lg shadow-md"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-40 md:space-y-[20rem]">
            <div className="w-full md:w-2/3 justify-start relative">
              <img
                src={TimeBg}
                alt=""
                className="w-80 md:w-[40rem] h-48 md:h-96 absolute left-0 bottom-0 z-10"
              />
              <img
                src={TimeCat}
                alt=""
                className="w-40 h-48 md:w-64 md:h-74 absolute left-0 bottom-0 opacity-90 z-20"
                data-aos="fade-right"
              />
            </div>
            <div
              className="w-full md:w-1/3 rounded-lg justify-end"
              data-aos="fade-left"
            >
              <div className="max-w-2xl">
                <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-8 text-right">
                  <span className="text-custom-highlight">추억</span>
                  을<br />
                  다시보고 싶은가요?
                </h2>
              </div>
            </div>
          </div>

          <div className="w-full min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={MeetingBg}
                alt=""
                className="inset-0 opacity-30 z-10"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-xl md:text-[3rem] font-bold text-center z-20">
                  다양한 <span className="text-custom-highlight">사람들</span>과
                  <br />
                  <span className="text-custom-highlight">독서활동</span>도 할
                  수 있어요
                </h1>
              </div>
            </div>
          </div>
          <div className="w-full h-full relative" data-aos="fade-down">
            <img
              className="opacity-30 w-full h-full object-cover"
              src={Bg}
              alt=""
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#878787] font-bold text-2xl md:text-4xl">
                Readly에서 시작하세요
              </span>
            </div>
          </div>

          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <GoButton onClick={handleLoginClick} text="Readly 시작하기" />
          </div>
        </div>
      </div>
    </>
  );
}
