import { AccordionItem } from "./AccordionItem";
import { AccordionOuterWrapper, AccorionContainer } from "./StyledFooter";

interface Link {
  id: string;
  text: string;
  link: string;
}

interface AccordionData {
  id: string;
  title: string;
  content: Link[];
}

interface AccordionProps {
  data: AccordionData[];
}

export function Accordion({ data }: AccordionProps) {
  return (
    <AccordionOuterWrapper>
      <AccorionContainer>
        {data.map((el) => (
          <AccordionItem key={el.id} title={el.title} content={el.content} />
        ))}
      </AccorionContainer>
    </AccordionOuterWrapper>
  );
}

export interface AccordionItemProps {
  title: string;
  content: Link[];
}
