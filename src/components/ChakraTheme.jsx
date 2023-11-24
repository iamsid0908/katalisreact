import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        navBG: "#1A1A1A",
        navColor: "#9E9E9E",
        active_navColor: "#CD2BEC",
        hover_navBG: "#404040",

        dashboardBG: "#121212",
        inputTypeColor: "#f5f5f5",

        brand: {
            primary: "#fff",
        },
        dashboard: {
            primary: "#330582",
        },
        border: "#404040",
        button: {
            // [[ Light Button ]] :
            light_color: "#9E9E9E",
            light_backgroundColor: "#404040",
            active_light_backgroundColor: "#333",
            hover_light_backgroundColor: "#9A9A9A",
            hover_light_color: "#fff",

            // [[ Dark Button ]] :
            dark_color: "#fff",
            dark_backgroundColor: "#9B30F3",
            active_dark_backgroundColor: "#9B30F3",
            hover_dark_backgroundColor: "#9B30F36e",

            // [[ Danger Button ]] :
            danger_color: "#fff",
            danger_backgroundColor: "#FF0000",
            active_danger_backgroundColor: "#CC0000",
            hover_danger_backgroundColor: "#FA7A7A",

            borderRadius: "20px",
            hover_transform: "translateY(-0.2rem)",
            disabled_backgroundColor: "#9E9E9E",

            buttonColor: "#330582",
            buttonHover: "#5F38A2",
        },
    },
    fontSize: {
        normal: "14px",
    },
});

export default theme;