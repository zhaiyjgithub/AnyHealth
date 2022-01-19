module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false,
    theme: {
        fontFamily: {

        },
        extend: {
            backgroundColor: theme => ({
                ...theme("colors"),
                "primary": "#1EB955",
                "primary-focus": "#343D4E",
                "secondary": "#377CFC",
                "secondary-focus": "#343D4E",
                "info": "#009585",
                "success": "#570df8",
                "warning": "#FF9A01",
                "error": "#FF5724",
                "base-100": "#ffffff",
                "base-200": "#F9FAFB",
                "base-300": "#d1d5db",
                "base-content": "#343D4E",
            }),
            textColor: theme => ({
                ...theme("colors"),
                "primary": "#343D4E",
                'focus': '#ffffff',
            }),
            // borderColor: theme => ({
            //   'primary': '#4E70F7',
            //   'primary-focus': '#1F4BF6',
            //   'base-black': '#181A2A',
            //   'base-green': '#007645',
            // })
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        require("daisyui"),
    ],
}
