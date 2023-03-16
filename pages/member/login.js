import {useState} from "react";
import {handleInput} from "../../components/Utils";
import {getSession, signIn, useSession} from "next-auth/client";
import Layout from "../../components/layout/Layout";
import Join from "./join";

export async function getServerSideProps(ctx) {

    // 세션 객체 가져오기
    const sess = await getSession(ctx);
    if (sess) { // 로그인한 경우 회원정보로 이동
        return {
            redirect: {permanent: false, destination: '/member/muinfo'},
            props: {}
        }
    }
    return { props: {} }
}

export default function Login() {

    const [session, loading] = useSession();
    console.log('login - ', session?.user?.userid);

    const [userid, setUserid] = useState('');
    const [passwd, setPasswd] = useState('');

    const handlelogin = async () => {
        const data = {userid: userid, passwd: passwd};

        // signIn(인증시 활용할 Credentials id, 인증시 사용할 정보)
        // const res = await signIn('userid-passwd-credentials',{
        const {error} = await signIn('userid-passwd-credentials',{
            userid, passwd,
            redirect: false
        });

        // res 인증성공여부를 http 상태 코드로 알려줌 : 200, 실패 : 401
        // 인증성공 : 200, 실패 : 401
        // console.log('pg login -', await res.status);

        // error : 인증성공여부를 error로 알려줌
        // 인증성공 : null, 실패 : CredentialsSignin
        console.log('pg login -', await error);

        if(error) { // 에러 발생시 - 인증 실패시
            location.href = '/member/failogin';
        } else {
            location.href = '/member/myinfo';
        }
    };

  return (
      <main>
          <h2>로그인</h2>
          <form name="login">
              <div><label htmlFor="uid">아이디</label>
                  <input type="text" name="uid" id="uid"
                    onChange={e => handleInput(setUserid, e)} /></div>
              <div><label htmlFor="pwd">비밀번호</label>
                  <input type="password" name="pwd" id="pwd"
                    onChange={e => handleInput(setPasswd, e)} /></div>
              <div><label></label>
                  <button type="button" onClick={handlelogin}>로그인</button>
              </div>
          </form>
      </main>
  )
}

Login.getLayout = (page) => (
    <Layout meta={{title: '로그인'}}>
        {page}
    </Layout>
);