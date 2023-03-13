import {useState} from "react";
import axios from "axios";
import { check_captcha, process_submit, handleInput } from "../../models/Utils";

export async function getServerSideProps(ctx) {
    let bno = ctx.query.bno;

    const url = `http://localhost:3000/api/board/view?bno=${bno}`;
    const res = await axios.get(url);
    const board = await res.data[0];

    return { props: {board} }
}

export default function Update({board}) {

    const [title, setTitle] = useState(board.title);
    const [userid, setUserid] = useState('zzyzzy');
    const [contents, setContents] = useState(board.contents);

    const handleupdate = async () => {
        if (grecaptcha.getResponse()
            && await check_captcha(grecaptcha.getResponse())) {
            let data = {bno: board.bno, title: title, contents: contents};
            if ((await process_submit('/api/board/update', data)).cnt > 0)
                location.href = '/board/view?bno=' + board.bno;
        } else {
            alert('!!!');
        }
    };

    return (
        <main>
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <div id="main">
                <h2>게시판 수정하기</h2>
                <form name="write" id="writefrm">
                    <div><label htmlFor="title">제목</label>
                        <input type="text" name="title" id="title"
                               value={title}
                               onChange={e => handleInput(setTitle, e)} /></div>

                    <div><label htmlFor="uid">작성자</label>
                        <input type="text" name="uid" id="uid"
                               value={userid} readOnly /></div>

                    <div><label htmlFor="contents" className="drgup">본문</label>
                        <textarea name="contents" id="contents"
                                  onChange={e => handleInput(setContents, e)}
                                  rows="7" cols="55" value={contents} /></div>

                    <div><label></label>
                        <div className="g-recaptcha cap" data-sitekey="6LdG4OskAAAAAMgMFOSHk_hTcglHx9m1Z9qBuR6y"></div>
                    </div>

                    <div><label></label>
                        <button type="button" id="writebtn" onClick={handleupdate}>수정완료</button>
                        <button type="reset">다시입력</button>
                    </div>
                </form>
            </div>
        </main>
    );

}