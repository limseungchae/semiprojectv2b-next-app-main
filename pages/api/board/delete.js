import Board from "../../../models/Board";

export default async (req, res) => {
    const {bno} = req.query;

    try {
        const cnt = new Board().delete(bno).then(result => result);

        //res.status(200).json({'cnt': await cnt});
        res.redirect(301, '/board/list');  // 페이지 이동
    } catch (err) {
        res.status(500).json(err);
    }

}