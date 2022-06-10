import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ColorSwitcher(): JSX.Element {
    const sunIcon = (
        <FontAwesomeIcon icon={faSun} size="3x" />
    );

    const moonIcon = (
        <FontAwesomeIcon icon={faMoon} size="3x" />
    );

    return <a onClick={() => { }}>{moonIcon}</a>;
}