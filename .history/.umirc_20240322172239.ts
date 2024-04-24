import { defineConfig } from "umi";
import routes from "./src/router";
import apiUrl from "./apiUrl";

const path = require("path");
const prodGzipList = ["js", "css", "jsx", "less"];
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { UMI_ENV = "" } = process.env;

function OutputPathName(env: string) {
    if (env) {
        return `${env}-dist`;
    }
    return "dist";
}

export default defineConfig({
    routes,
    npmClient: "pnpm",
    plugins: ["@umijs/plugins/dist/dva", "@umijs/plugins/dist/locale"],
    dva: {},
    locale: {
        default: "zh-CN",
    },
    outputPath: OutputPathName(UMI_ENV),
    define: {
        "process.env": {
            ...process.env,
            API_URL_1: apiUrl[`${UMI_ENV}1`] || apiUrl[`test1`],
            API_URL_2: apiUrl[`${UMI_ENV}2`] || apiUrl[`test2`],
            API_URL_3: apiUrl[`${UMI_ENV}3`] || apiUrl[`test3`],
        },
    },
    proxy: {
        "/api": {
            target: "http://118.89.73.210:9000", // 接口域名
            changeOrigin: true,
            secure: false, // 如果是https接口，需配置这个参数
        },
    },
    alias: {
        "@/permissions": path.resolve(__dirname, "src/permissions"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
        "@/utils": path.resolve(__dirname, "src/utils"),
        "@/components": path.resolve(__dirname, "src/components"),
    },

    chainWebpack: config => {
        config
            .plugin("replace")
            .use(require("webpack").ContextReplacementPlugin)
            .tap(() => {
                return [/moment[/\\]locales$/, /zh-cn/];
            });
        config.merge({
            optimization: {
                minimize: true,
                splitChunks: {
                    chunks: "async",
                    minSize: 30000,
                    minChunks: 2,
                    automaticNameDelimiter: ".",
                    cacheGroups: {
                        react: {
                            name: "react",
                            priority: 20,
                            test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)[\\/]/,
                        },
                        echarts: {
                            name: "echarts",
                            chunks: "async",
                            test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
                            priority: 10,
                            enforce: true,
                        },
                        antdesigns: {
                            name: "antdesigns",
                            chunks: "all",
                            test: /[\\/]node_modules[\\/](antd|@ant-design|antd-mobile)/,
                            priority: 10,
                            enforce: true,
                        },
                        ahooks: {
                            name: "ahooks",
                            chunks: "all",
                            test: /[\\/]node_modules[\\/](ahooks)/,
                            priority: 10,
                            enforce: true,
                        },
                        antv: {
                            name: "antv",
                            chunks: "all",
                            test: /[\\/]node_modules[\\/](@antv)[\\/]/,
                            priority: 10,
                            enforce: true,
                        },
                        lodash: {
                            name: "lodash",
                            test: /[\\/]node_modules[\\/]lodash[\\/]/,
                            priority: -2,
                            enforce: true,
                        },
                        vendors: {
                            name: "vendors",
                            test({ resource }: any) {
                                return /[\\/]node_modules[\\/]/.test(resource);
                            },
                            priority: -11,
                            enforce: true,
                        },
                    },
                },
            },
        });

        if (process.env.NODE_ENV === "production") {
            config.plugin("compression-webpack-plugin").use(
                new CompressionWebpackPlugin({
                    algorithm: "gzip",
                    test: new RegExp("\\.(" + prodGzipList.join("|") + ")$"),
                    threshold: 10240,
                    minRatio: 0.6,
                    deleteOriginalAssets: false,
                })
            );
        }
    },
});
