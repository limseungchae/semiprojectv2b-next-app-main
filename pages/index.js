import Layout from "../components/layout/Layout";
import React from "react";

export default function Home() {
    return (
        <main>
            <img src="/img/smile.png" alt="메인이미지" className="logo" />
        </main>
    )
}

Home.getLayout = (page) => (
    <Layout meta={{title: 'NextJs 프로젝트'}}>
        {page}
    </Layout>
);
