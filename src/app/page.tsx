import Image from "next/image";
import Navbar from "../components/Navbar/index";
import { Button, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import playIconUrl from "@Image/playIcon.svg";
import AutomateCallScriptIconUrl from "@Image/AutomatedCallScriptImage.svg";
import HighConversionIonUrl from "@Image/highConversionIcon.svg";
import AIManagementIconUrl from "@Image/AIManagementIcon.svg";
import FeatureCard from "../components/FeatureCard";
import GrowGraphIconUrl from "@Image/GrowGraphIcon.svg";
import MoneyIconUrl from "@Image/MoneyIcon.svg";
import CoinIconUrl from "@Image/CoinIcon.svg";
import HowItWork from "@/components/LandingPageSection/HowItWork";
import Plans from "@/components/LandingPageSection/Plans";
import Testimonials from "@/components/LandingPageSection/Testimonials";
import Trails from "@/components/LandingPageSection/TrailSection";
import Footer from "@/components/Footer/index";
import EaseOfUse from "@/components/LandingPageSection/EaseOfUse/index";
import ArticleSection from "@/components/LandingPageSection/ArticleSection/indes";
import QuickStartImgUrl from "@Image/QuickStartImg.svg";

export default function Home() {
  return (
    <Layout>
      <Content className="bg-[#fff]">
        <div className="h-[100vh] relative bg-cover items-center justify-center text-white bg-[url('/Image/backGroundImg_mobile_screen.svg')] md:bg-[url('/Image/backGroundImg_medium_screen.svg')] lg:bg-[url('/Image/TopBackGroundImg.svg')]">
          <Navbar />
          <div className="pt-[70%] md:pt-[15%] pl-[10%] w-[60%] md:w-[40%] text-black">
            <div className="text-[2rem] md:text-[3.5rem] font-extrabold text-left md:text-center text-[#030C1B] w-[80%]">
              Automate Your PreSales
            </div>
            <div className="text-[0.6rem] md:text-[1rem] leading-normal font-normal mt-[5%] text-[#364050]">
              TBI provides AI software that automates the manual task of making
              sales calls to business customers. World’s 1st PreSales Automation
              Platform for B2B Enterprises
            </div>
            <div className="flex gap-[3%] mt-[8%]">
              <Button
                size="large"
                icon={<Image src={playIconUrl} alt="playIcon" />}
                className="bg-[#F1F6FF] border border-[#e3ecfc]"
              >
                Watch Video
              </Button>
              <Button size="large" type="primary">
                Try the demo
              </Button>
            </div>
          </div>
        </div>
        <div
          className="px-4 lg:px-20 py-10 flex flex-col"
          style={{ alignItems: "center" }}
        >
          <h1 className="text-center text-3xl text-[#4B5264] font-bold mb-8">
            Using Magic of Generative AI to Upend Pre-Sales
          </h1>
          <Row gutter={[32, 32]} justify="center">
            <FeatureCard
              ImgUrl={AutomateCallScriptIconUrl}
              Title={"Automated Call-scripts"}
              Description={
                "AI-generated Call Scripts, hyper-customized for each target, including your top sales propositions. Call-scripts are built using real-time Sales Signal alerts and buying propensity insights."
              }
            />
            {/* Second Card */}
            <FeatureCard
              ImgUrl={HighConversionIonUrl}
              Title="Higher Conversion At Blazing Speed"
              Description="Improve sales cycle by 90% lower campaign time. Improve
                    presales conversions by 50% or more. Higher success creates
                    empowered & happy callers."
            />
            <FeatureCard
              ImgUrl={AIManagementIconUrl}
              Title="AI Management Insights"
              Description="Managers get detailed insights of messaging effectiveness,
                    employee performance and real-time campaign performance. No
                    more waiting weeks or months to see campaign outcomes."
            />
          </Row>
        </div>
        <div className="p-[5%] flex items-center justify-center">
          <div className="flex items-center justify-center">
            <Image
              src={QuickStartImgUrl}
              alt="img"
              className="w-[70%] sm:w-[70%] md:w-[80%]"
            />
          </div>
        </div>
        <ArticleSection />
        <HowItWork />
        <Plans />
        <Testimonials />
        <EaseOfUse />
        <Trails />
        <Footer />
      </Content>
    </Layout>
  );
}
