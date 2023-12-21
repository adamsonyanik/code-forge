import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ["./index.html", "./src/client/**/*.{vue,js,ts}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["'Bookman Old Style'", ...defaultTheme.fontFamily.serif],
                mono: ["'Ubuntu mono'", ...defaultTheme.fontFamily.mono]
            }
        }
    }
} satisfies Config;
