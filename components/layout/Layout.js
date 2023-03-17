import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

// localhost:3000/member/join

const Layout = ({children, meta}) => {
    console.log('layout -', children.props.menu);

    const {title, description, icon} = meta;
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/normalize.css" />
                <link rel="stylesheet" href="/css/main.css" />
                <link rel="stylesheet" href="/css/project2.css" />
                <title>{title}</title>
                <link rel="icon" href={icon || '/favicon.ico'} />
            </Head>
            <div id="wrapper">
                <Header menu={children.props.menu}/>
                {children}
                <Footer />
            </div>
        </>
    );
}

export default Layout;
