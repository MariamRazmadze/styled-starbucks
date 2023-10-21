import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Tab } from "./Tab";
import { TabContent } from "./TabContent";
import {
  RewardsContainer,
  TitleWrapper,
  RewardsTitle,
  RewardButtons,
  Underline,
} from "./StyledRewards";
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

export interface TabProps {
  num: number;
  activeTab: number;
  onClick: (num: number) => void;
  item: ContentItem;
}

export interface TabContentProps {
  item: ContentItem;
}
