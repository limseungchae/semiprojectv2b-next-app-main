import Board from "../../../models/Board";

export default async (req, res) => {
    const {title, userid, contents} = req.body;
    console.log(title, userid, contents);

    try {
        //new Board(null,title,userid,null,contents,null).insert()
        const cnt = Board.newOne(title,userid,contents).insert()
            .then(result => result);

        console.log(await cnt);
        res.status(200).json({cnt: await cnt});
    } catch (err) {
        res.status(500).json(err);
    }
}