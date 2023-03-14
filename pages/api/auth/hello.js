import bcrypt from 'bcrypt';

const saltRounds = 10; // salt키 생성 횟수 지정

// 암호 입력시 해지함수에 의해 해시코드로 변환된 암호 생성
const hashPassword = async (passwd) => {
    let saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(passwd, salt);
        console.log('hashpwd -', hash, passwd, salt);

        return hash;
    } catch (err) {
        console.log(err);
    }
};

// 암호 비교 함수 - 암호와 해시화된 암호를 비교
const comparePasswd = async (passwd, hashpwd) => {
    try {
        const result = await bcrypt.compare(passwd, hashpwd);
        return result;
    } catch (err) {
        console.log(err);
    }
};

export default async (req, res) => {
    let [passwd1, passwd2] = ['abc123', '987xyz'];
    let hashedl = '', hashed2 = '';

    try {
        hashedl = await hashPassword(passwd1);
        hashed2 = await hashPassword(passwd2);

        let isMatch1 = comparePasswd('abc123', hashedl);
        let isMatch2 = comparePasswd('987xyz', hashed2);

        console.log('auth -bcrypt ', hashedl, hashed2);
        console.log('auth -bcrypt ', isMatch1, isMatch2);

        res.status(200).json({ hashed1: await hashedl, hashed2: await hashed2 });
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
    }

};

