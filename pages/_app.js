import '../styles/globals.css'
import Layout from "../.idea/components/layout/Layout";
import App from "next/app";
import {getSession} from "next-auth/client";

function MyApp({ Component, pageProps, menu }) {
    console.log('myapp -', menu);

    return (
        <Layout menu={menu}>
            <Component {...pageProps} />
        </Layout>
    );
}

MyApp.getInitialProps = async (ctx) => {
    // nextjs app의 기본 props 객체 초기화 - 애플리케이션 단위 전역변수
    const appProps = await App.getInitialProps(ctx);

    const sess = await getSession(ctx);
    let menu = '<a href="/member/login">로그인<a>';
    if (sess) menu = '<a href="/member/logout">로그아웃<a>';

    appProps.menu = menu;
    console.log('app -', appProps.menu);

    return { ...appProps }
}

export default MyApp
