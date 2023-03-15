import {signOut} from "next-auth/client";

export default function Logout() {
    return (
        <main>
             <button className='logout' onClick={() => signOut()
                 .then(r => location.href='/')}>로그아웃하기</button>
        </main>
    );
}