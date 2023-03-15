import {useState} from "react";
import {handleInput} from "../../models/Utils";
import {signIn, useSession} from "next-auth/client";


export default function Login() {

    const [session, loading] = useSession();
    console.log('login - ', session?.user?.userid);

    const [userid, setUserid] = useState('');
    const [passwd, setPasswd] = useState('');

    const handlelogin = async () => {
        const data = {userid: userid, passwd: passwd};

        // signIn(인증시 활용할 Credentials id, 인증시 사용할 정보)
        const res = await signIn('userid-passwd-credentials',{
            userid, passwd,
            redirect: true
        });

        console.log('pg login -', await res.status);
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
