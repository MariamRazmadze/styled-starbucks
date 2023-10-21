import { TabProps } from "./RewardSteps";
import { StarButton, GoldStart } from "./StyledRewards";

export function Tab({ num, onClick, item }: TabProps) {
  return (
    <StarButton onClick={() => onClick(num)}>
      <span>
        {item.number}
        <GoldStart>★</GoldStart>
      </span>
    </StarButton>
  );
}
