import {useState} from "react";
import axios from "axios";
import { check_captcha, handleInput, process_submit } from '../../models/Utils'

export default function Write() {

    const [title, setTitle] = useState('');
    const [userid, setUserid] = useState('zzyzzy');
    const [contents, setContents] = useState('');

    const handlewrite = async () => {
        if (grecaptcha.getResponse()
            && await check_captcha(grecaptcha.getResponse())) {
            // 글쓰기 작업 진행
            const data = {title: title, userid: userid, contents: contents};
            if (await process_submit('/api/board/write', data) > 0) {
                location.href = '/board/list';
            }
        }
    };

    return (
        <main>
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <div id="main">
                <h2>게시판 새글쓰기</h2>
                <form name="write" id="writefrm">
                    <div><label htmlFor="title">제목</label>
                        <input type="text" name="title" id="title"
                               onChange={e => handleInput(setTitle, e)} /></div>

                    <div><label htmlFor="uid">작성자</label>
                        <input type="text" name="uid" id="uid"
                               value={userid} readOnly /></div>

                    <div><label htmlFor="contents" className="drgup">본문</label>
                        <textarea name="contents" id="contents"
                                  onChange={e => handleInput(setContents, e)}
                                  rows="7" cols="55"></textarea></div>

                    <div><label></label>
                        <div className="g-recaptcha cap" data-sitekey="6LdS4OskAAAAANKM33dcjgpTPELf6QKmHoPhBWGR"></div>
                    </div>

                    <div><label></label>
                        <button type="button" id="writebtn" onClick={handlewrite}>입력완료</button>
                        <button type="reset">다시입력</button>
                    </div>
                </form>
            </div>
        </main>
    );

}