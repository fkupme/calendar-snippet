import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VCalendar, VDateInput } from "vuetify/labs/components";
import DateFnsAdapter from "@date-io/date-fns";
import { ru } from 'date-fns/locale'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: "#F5F5F5",
    surface: "#FFFFFF",
    "surface-bright": "#FFFFFF",
    "surface-light": "#EEEEEE",
    "surface-variant": "#424242",
    "on-surface-variant": "#EEEEEE",
    primary: "#000",
    "primary-darken-1": "rgb(37, 37, 41)",
    secondary: "rgb(147, 146, 146)",
    "secondary-lighten-1": "rgb(207, 207, 207)",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
  variables: {
    "border-color": "#000000",
    "border-opacity": 0.12,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.04,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#212529",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
    "font-family": '"Inter", sans-serif !important',
  },
};


export default createVuetify({
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
    components:{
      VCalendar,
      VDateInput
    }
  },
  defaults:{
    global:{
      fontFamily: '"Inter", sans-serif',
    }
  },
  date:{
    adapter: DateFnsAdapter,
    locale: {
      ru: ru
    }
  }
});
