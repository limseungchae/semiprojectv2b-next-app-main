import Link from "next/link";
import {getSession} from "next-auth/client";

// component에는 getServerSideProps 사용불가!!
// export async function getServerSideProps(ctx) {
//     // 세션 객체 가져오기
//     const sess = await getSession(ctx);
//     console.log('header1 - ', sess);
//
//     return {props: {sess}}
// }

const Header = ({menu}) => {
    console.log('header2 - ', menu);

    return (
        <>
            <header><h1>React 프로젝트 v1</h1></header>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><a href="/member/join">회원가입</a></li>

                    {/* 문자열을 html 태그로 출력 - dangerouslySetInnerHTML */}
                    {/*<li dangerouslySetInnerHTML={{ __html: menu }}></li>*/}
                    <li><a href="/member/login">로그인</a></li>

                    <li><Link href="/board/list">게시판</Link></li>
                    <li><Link href="/member/myinfo">회원정보</Link></li>
                </ul>
                <hr />
            </nav>
        </>
    );
}


export default Header;