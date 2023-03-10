
export async function getServerSideProps(ctx) {
    let [ cpg, ftype, fkey ] = [ ctx.query.cpg, ctx.query.ftype, ctx.query.fkey ];

    cpg = cpg ? parseInt(cpg) : 1;
    let params =  `cpg=${cpg}`;     // 질의문자열 생성
    let url =`http://localhost:3000/api/board/list?${params}`;

    const getStpgns = (cpg, alpg) => {
        let stpgns = [];
        let stpgn = parseInt((cpg - 1) / 10) * 10 + 1; // 페이지네이션 시작값 계산
        for (let i = stpgn; i < stpgn + 10; ++i) {
            if (i <= alpg) {  // i가 총페이지수보다 같거나 작을때 i 출력
                let iscpg = (i == cpg) ? true : false;  // 현재페이지 표시
                let pgn = {'num': i, 'iscpg': iscpg};
                stpgns.push(pgn);
            }
        }
        return stpgns;
    }

    const res = await fetch(url);
    const boards = await res.json();

    let alpg = Math.ceil(parseInt(boards.allcnt) / 25);  // 총 페이지수 계산

    // 페이지네이션 처리 1
    let stpgns = getStpgns(cpg, alpg);

    // 처리 결과를 boards 객체에 추가
    boards.stpgns = stpgns;

    return { props : {boards} }
}

export default function List( {boards} ) {
  return (
      <main>
          <h2>게시판</h2>
          <table className="board">
              <colgroup>{/*각 컬럼에 디자인 적용*/}
                  <col style={{width: '10%'}} />
                  <col />
                  <col style={{width: '15%'}} />
                  <col style={{width: '15%'}} />
                  <col style={{width: '10%'}} />
              </colgroup>
              <tbody>
              <tr>
                  <td colSpan="5" className="alignrgt">
                      <button type="button">새글쓰기</button>
                  </td>
              </tr>
              <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th>조회</th>
              </tr>

              {boards.boards.map(bd => (
                  <tr key={bd.bno}>
                      <td>{bd.bno}</td>
                      <td>{bd.title}</td>
                      <td>{bd.userid}</td>
                      <td>{bd.regdate}</td>
                      <td>{bd.views}</td>
                  </tr>
              ))}
              </tbody>
          </table>

          <ul className="pagenation">
              <li className="prev">이전</li>


              {boards.stpgns.map(pgn => (
                  pgn.iscpg ?
                  <li key={pgn.num} className='cpage'>{pgn.num}</li> :
                  <li key={pgn.num}><a href={`?cpg=${pgn.num}`}>{pgn.num}</a></li>
              ))}

              <li>다음</li>
          </ul>
      </main>
  )
}
