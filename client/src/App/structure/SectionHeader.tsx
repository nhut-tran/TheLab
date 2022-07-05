import styled from "styled-components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useStore } from "../../store/appStore";

interface Props {
    size: "small" | "medium" | "large",
    content: string,
    className: string
}

const SectionHeader = ({ size, content, className }: Props) => {
    const { userStore } = useStore();
    const dept = userStore.user.department;
    switch (size) {
        case "large":
            return <h1 className={className}>{dept}<ArrowForwardIosIcon fontSize="inherit" />{content}</h1>;
        case "medium":
            return <h2 className={className}><ArrowForwardIosIcon fontSize="inherit" /> {content}</h2>;
        case "small":
            return <h3 className={className}><ArrowForwardIosIcon fontSize="inherit" /> {content}</h3>;
        default:
            return <h1 className={className}><ArrowForwardIosIcon fontSize="inherit" /> {content}</h1>;
    }
}

export const StyleSectionHeader = styled(SectionHeader)`
    display: flex;
    align-items: center;
    align-self: start;
    width: 100%;
    margin-top: 0;
    margin-bottom: 4rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #222A45;
    margin-left: 1rem;
    color: #963cff;
  
`

export default SectionHeader;