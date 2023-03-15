// npm install next-auth@3.29.10 --save-dev
// 경로: /pages/api/auth/[...nextauth].js


import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        Credentials({
            id: 'userid-passwd-credentials',
            name: 'userid-passwd-credentials',
            credentials: {
                userid: { label: "아이디", type: "text" },
                passwd: {  label: "비밀번호", type: "password" }
            }, // 로그인 폼 정의
            async authorize(credentials, req) {
                // 입력한 인증 정보 가져옴
                const userid = credentials.userid;
                const passwd = credentials.passwd;

                // 인증에 성공해야만 로그인 허용
                if (userid === 'abc123' && passwd === '987xyz') {
                    return credentials;
                }
            }
        })
    ],
    pages: { // 인증에 사용자 정의 로그인 페이지 사용
        signIn: '/member/login'
    },
    callbacks: {
        // token, user, account, profile, isNewUser
        async jwt(token, user, account, profile, isNewUser) {
           console.log('jwt - ', user);
           if (user?.userid) token.userid = user.userid;

           return token;
        },

        // session, userOrToken
        async session(session, userOrToken) {
            console.log('session -', userOrToken);
            session.user.userid = userOrToken.userid;

            return session;
        }
    }
});