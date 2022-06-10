export type Theme = {
    background: string;
    secondBackground: string;
    text: string;
    textSecondary: string;
    primary: string;
    secondary: string;
    tertiary: string;
    cardBackground: string;
    inputBackground: string;
    navbarBackground: string;
    modalBackground: string;
    errorColor: string;
    logoColor: string;
}


export const LightTheme: Theme = {
    background: "rgb(251,251,253)",
    secondBackground: "rgb(255,255,255)",
    text: "rgb(10,18,30)",
    textSecondary: "rgb(255,255,255)",
    primary: "rgb(22,115,255)",
    secondary: "rgb(10,18,30)",
    tertiary: "rgb(231,241,251)",
    cardBackground: "rgb(255,255,255)",
    inputBackground: "rgb(255,255,255)",
    navbarBackground: "rgb(255,255,255)",
    modalBackground: "rgb(251,251,253)",
    errorColor: "rgb(207,34,46)",
    logoColor: "#000",
}


export const DarkTheme: Theme = {
    background: "rgb(26,32,44)",
    secondBackground: "rgb(45,55,72)",
    text: "rgb(237,237,238)",
    textSecondary: "rgb(255,255,255)",
    primary: "22,115,255",
    secondary: "rgb(10,18,30)",
    tertiary: "rgb(231,241,251)",
    cardBackground: "rgb(45,55,72)",
    inputBackground: "rgb(45,55,72)",
    navbarBackground: "rgb(45,55,72)",
    modalBackground: "rgb(26,32,44)",
    errorColor: "rgb(207,34,46)",
    logoColor: "rgb(#fff)",
}
