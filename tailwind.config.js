/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      // FONTES PADRÃO DA APLICAÇÃO
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        base: ["12px", "1.5"], // Tamanho de fonte base (16px) e altura da linha (1.5)
      },
    },
    colors: {
      // tons de preto
      // black: {
      //   10: "#b5b5b5", // Cinza claro
      //   20: "#a5a5a5", // Um pouco mais escuro que o 10
      //   30: "#959595", // Um pouco mais escuro que o 20
      //   40: "#858585", // Um pouco mais escuro que o 30
      //   50: "#3B3B3B", // Cinza escuro
      //   60: "#515151", // Um pouco mais claro que o 50
      //   70: "#393939", // Um pouco mais escuro que o 60
      //   80: "#2A2A2A", // Um pouco mais escuro que o 70
      //   90: "#1A1A1A", // Quase preto
      //   100: "#0A0A0A", // Quase preto
      //   200: "#080808", // Mais escuro que o 100
      //   300: "#060606", // Mais escuro que o 200
      //   400: "#040404", // Preto mais profundo
      //   500: "#020202", // Quase o preto absoluto
      //   600: "#000000", // Preto absoluto
      //   // 10: "#b5b5b5",
      //   // 50: "#3B3B3B",
      //   // 60: "#515151",
      //   // 400: "#040404",
      // },
      // tons de branco
      // whait: {
      //   50: "#ffffff",
      //   100: "f9fafb",
      // },
      // tons de roxo
      // purple: {
      //   50: "#f3e9fc",
      //   100: "#e2c7f8",
      //   200: "#d0a5f4",
      //   300: "#be83f0",
      //   400: "#ac61ec",
      //   500: "#9a3fe8",
      //   600: "#7c32d4",
      //   700: "#5e25c0",
      //   800: "#4018ac",
      //   900: "#7F79EB",
      //   1000: "#220b98",
      // },
      // tons de laranja
      // orange: {
      //   50: "#fff4e6",
      //   100: "#ffe0b2",
      //   200: "#ffcc80",
      //   300: "#ffb74d",
      //   400: "#ffa726",
      //   500: "#ff9800",
      //   600: "#fb8c00",
      //   700: "#f57c00",
      //   800: "#ef6c00",
      //   900: "#FD5503",
      // },
      // tons de verde
      // green: {
      //   50: "#e6fbef",
      //   100: "#b1f1ce",
      //   200: "#8cebb6",
      //   300: "#57e295",
      //   400: "#36dc81",
      //   500: "#04d361",
      //   600: "#04c058",
      //   700: "#039645",
      //   800: "#027435",
      //   900: "#025929",
      // },
      //tons de vermelho
      // red: {
      //   50: "#ffe6e6",
      //   100: "#ffcccc",
      //   200: "#ff9999",
      //   300: "#ff6666",
      //   400: "#ff3333",
      //   500: "#ff0000",
      //   600: "#e60000",
      //   700: "#cc0000",
      //   800: "#b30000",
      //   900: "#990000",
      // },
    },
  },
  plugins: [],
};
