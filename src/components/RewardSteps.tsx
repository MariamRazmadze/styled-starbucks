import { useState } from "react";
import styled from "styled-components";

import { v4 as uuidv4 } from "uuid";
interface ContentItem {
  id: string;
  number: number;
  photoName: string;
  title: string;
  promo: string;
}

interface RewardStepsProps {
  content: ContentItem[];
}

export default function RewardSteps({ content }: RewardStepsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <RewardsContainer>
      <TitleWrapper>
        <RewardsTitle>Get your favorites for free</RewardsTitle>
      </TitleWrapper>
      <RewardButtons>
        {content.map((item, index) => (
          <Tab
            key={uuidv4()}
            num={index}
            activeTab={activeTab}
            onClick={setActiveTab}
            item={item}
          />
        ))}
        <Underline $left={activeTab * 20} />
      </RewardButtons>

      <TabContent item={content[activeTab]} />
    </RewardsContainer>
  );
}

interface TabProps {
  num: number;
  activeTab: number;
  onClick: (num: number) => void;
  item: ContentItem;
}

function Tab({ num, onClick, item }: TabProps) {
  return (
    <StarButton onClick={() => onClick(num)}>
      <span>
        {item.number}
        <GoldStart>★</GoldStart>
      </span>
    </StarButton>
  );
}
interface TabContentProps {
  item: ContentItem;
}

function TabContent({ item }: TabContentProps) {
  return (
    <ContentWrapper>
      <Content>
        <ContentImage src={item.photoName} alt={item.title} />
        <ContentText>
          <h3 style={{ lineHeight: "1.5" }}>{item.title}</h3>
          <Promo>{item.promo}</Promo>
        </ContentText>
      </Content>
    </ContentWrapper>
  );
}

const RewardsContainer = styled.div`
  width: 100%;
  background-color: #f2f8f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 470px;
  @media (max-width: 768px) {
    height: 100%;
  }
`;

const TitleWrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 4rem;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RewardsTitle = styled.h1`
  text-align: center;
  font-size: 28px;
`;

const RewardButtons = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 40%;
  @media (max-width: 768px) {
    margin-top: 1.5rem;
    width: 100%;
  }
`;

interface UnderlineProps {
  $left: number;
}

const Underline = styled.div<UnderlineProps>`
  position: absolute;
  bottom: 0;
  height: 4px;
  width: 20%;
  background-color: ${({ theme }) => theme.primaryColor};
  transition: left 0.3s ease-out;
  left: ${({ $left }) => `${$left}%`};
`;

const StarButton = styled.button`
  font-size: 25px;
  font-weight: 600;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  padding: 2rem 0;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoldStart = styled.span`
  color: #cba258;
  font-size: 14px;
  margin-left: 4px;
`;

const ContentWrapper = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d4e9e2;
  box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, 0.14);
`;

const Content = styled.div`
  padding: 2rem 0;
  height: 100%;
  width: 60%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    height: 70vh;
    width: 100%;
  }
`;

const ContentImage = styled.img`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContentText = styled.div`
  @media (max-width: 768px) {
    text-align: center;
    padding: 0 1rem;
  }
`;

const Promo = styled.p`
  margin-top: 1.5rem;
  font-size: 16px;
  max-width: 70%;
  line-height: 1.5;
  @media (max-width: 768px) {
    max-width: none;
  }
`;
