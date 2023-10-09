import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

// const MR_HOPE_AVATAR =

export default hopeTheme({
    hostname: "yinheng.me",

    author: {
        name: "Maple Yin",
        url: "https://yinheng.me",
    },

    iconAssets: "fontawesome-with-brands",

    logo: "/avatar.jpg",

    docsDir: "src",

    // navbar
    navbar,

    // sidebar
    sidebar,

    footer: "我有最美好的初衷",

    displayFooter: true,

    blog: {
        description: "",
        intro: "/intro.html",
        medias: {
        },
    },

    encrypt: {
        config: {
        },
    },

    // page meta
    metaLocales: {
        editLink: "在 GitHub 上编辑此页",
    },

    plugins: {
        blog: true,

        comment: {
            // You should generate and use your own comment service
            provider: "Waline",
            serverURL: "https://vercel-1s92vnr79-mapleyin.vercel.app/",
        },

        // all features are enabled for demo, only preserve features you need here
        mdEnhance: {
            align: true,
            attrs: true,
            chart: true,
            codetabs: true,
            demo: true,
            echarts: true,
            figure: true,
            flowchart: true,
            gfm: true,
            imgLazyload: true,
            imgSize: true,
            include: true,
            katex: true,
            mark: true,
            mermaid: true,
            playground: {
                presets: ["ts", "vue"],
            },
            presentation: ["highlight", "math", "search", "notes", "zoom"],
            stylize: [
                {
                    matcher: "Recommended",
                    replacer: ({ tag }) => {
                        if (tag === "em")
                            return {
                                tag: "Badge",
                                attrs: { type: "tip" },
                                content: "Recommended",
                            };
                    },
                },
            ],
            sub: true,
            sup: true,
            tabs: true,
            vPre: true,
            vuePlayground: true,
            tasklist: true,
            card: true,
        }
    },
});
