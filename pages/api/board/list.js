import Board from '/models/Board';


export default async (req, res) => {
    let [ cpg, ftype, fkey ] = [ req.query.cpg, req.query.ftype, req.query.fkey ];
    console.log(ftype, fkey);

    let stnum = (cpg - 1) * 25 + 1;



    try {
        const rowData =  new Board().select(stnum, ftype, fkey)
                          .then((result) => result);
        res.status(200).json(await rowData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}








