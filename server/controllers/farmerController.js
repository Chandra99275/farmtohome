import db from "../config/db.js";


export const saveFarmLocation = (req, res) => {


  const {
    farmerId,
    latitude,
    longitude
  } = req.body;



  if (!farmerId || !latitude || !longitude) {

    return res.status(400).json({

      success:false,

      message:"All fields are required"

    });

  }



  const sql = `

    UPDATE farmers

    SET latitude = ?,
        longitude = ?

    WHERE id = ?

  `;



  db.query(

    sql,

    [
      latitude,
      longitude,
      farmerId
    ],


    (err, result)=>{


      if(err){

        console.log(err);


        return res.status(500).json({

          success:false,

          message:"Database error"

        });


      }



      if(result.affectedRows === 0){


        return res.status(404).json({

          success:false,

          message:"Farmer not found"

        });


      }



      res.status(200).json({

        success:true,

        message:"Farm location saved successfully"

      });


    }


  );


};